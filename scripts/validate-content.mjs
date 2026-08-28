import fs from 'node:fs';

const files = ['src/data/posts.json', 'src/data/blog.json'];
const errors = [];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    return [];
  }
}

function requireString(record, field, file, index) {
  if (typeof record[field] !== 'string' || !record[field].trim()) {
    errors.push(`${file}[${index}]: ${field} must be a non-empty string`);
  }
}

function requireArray(record, field, file, index) {
  if (!Array.isArray(record[field])) errors.push(`${file}[${index}]: ${field} must be an array`);
}

const posts = readJson(files[0]);
const blogs = readJson(files[1]);

for (const [records, file, requiredFields] of [
  [posts, files[0], ['id', 'slug', 'title', 'category', 'date', 'image', 'metaDescription', 'introContent']],
  [blogs, files[1], ['id', 'slug', 'title', 'category', 'author', 'date', 'image', 'metaDescription', 'excerpt', 'content']],
]) {
  if (!Array.isArray(records)) {
    errors.push(`${file}: root value must be an array`);
    continue;
  }
  const slugs = new Set();
  for (const [index, record] of records.entries()) {
    if (!record || typeof record !== 'object') {
      errors.push(`${file}[${index}]: item must be an object`);
      continue;
    }
    for (const field of requiredFields) requireString(record, field, file, index);
    if (slugs.has(record.slug)) errors.push(`${file}[${index}]: duplicate slug '${record.slug}'`);
    slugs.add(record.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date || '')) errors.push(`${file}[${index}]: date must use YYYY-MM-DD`);
    requireArray(record, 'faqs', file, index);
    for (const [faqIndex, faq] of (record.faqs || []).entries()) {
      if (!faq || typeof faq !== 'object') errors.push(`${file}[${index}].faqs[${faqIndex}]: item must be an object`);
      else {
        requireString(faq, 'question', `${file}[${index}].faqs`, faqIndex);
        requireString(faq, 'answer', `${file}[${index}].faqs`, faqIndex);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Content validation passed: ${posts.length} jobs, ${blogs.length} blog posts.`);

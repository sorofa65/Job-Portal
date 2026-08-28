import fs from 'node:fs';

const folders = ['src/data/posts', 'src/data/blog'];
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

function readRecords(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder)
    .filter((file) => file.endsWith('.json'))
    .map((file) => ({ file: `${folder}/${file}`, records: readJson(`${folder}/${file}`) }))
    .flatMap(({ file, records }) => (Array.isArray(records) ? records : [records]).map((record) => ({ record, file })));
}

const posts = readRecords(folders[0]);
const blogs = readRecords(folders[1]);

for (const [records, file, requiredFields] of [
  [posts, folders[0], ['id', 'slug', 'title', 'category', 'image']],
  [blogs, folders[1], ['id', 'slug', 'title', 'category', 'author', 'date', 'image', 'metaDescription', 'excerpt', 'content']],
]) {
  const slugs = new Set();
  for (const [index, entry] of records.entries()) {
    const { record, file } = entry;
    if (!record || typeof record !== 'object') {
      errors.push(`${file}[${index}]: item must be an object`);
      continue;
    }
    for (const field of requiredFields) {
      if (field === 'title' && (record.title || record.seo?.metaTitle || record.seo?.metaTitleEn)) continue;
      requireString(record, field, file, index);
    }
    if (slugs.has(record.slug)) errors.push(`${file}[${index}]: duplicate slug '${record.slug}'`);
    slugs.add(record.slug);
    const publishedDate = record.date || record.publishedAt;
    if (!publishedDate || Number.isNaN(new Date(publishedDate).getTime())) errors.push(`${file}[${index}]: date or publishedAt must be valid`);
    if (record.seo && typeof record.seo !== 'object') errors.push(`${file}[${index}]: seo must be an object`);
    if (record.positions && !Array.isArray(record.positions)) errors.push(`${file}[${index}]: positions must be an array`);
    if (!record.positions && !record.positionDetailsTable) errors.push(`${file}[${index}]: positions or positionDetailsTable is required`);
    if (record.applicationSteps && !Array.isArray(record.applicationSteps)) errors.push(`${file}[${index}]: applicationSteps must be an array`);
    if (record.noticeImages && !Array.isArray(record.noticeImages)) errors.push(`${file}[${index}]: noticeImages must be an array`);
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

import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function readContent(folder) {
  const directory = path.resolve(projectRoot, folder);
  const files = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((file) => file.endsWith('.json')).map((file) => JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')))
    : [];
  return files.flatMap((record) => Array.isArray(record) ? record : [record]);
}

const posts = readContent('./src/data/posts');
const blog = readContent('./src/data/blog');
const publishedDates = new Map([
  ...posts.map((post) => [`/posts/${post.slug}/`, post.lastUpdatedAt || post.publishedAt || post.date]),
  ...blog.map((post) => [`/blog/${post.slug}/`, post.lastUpdatedAt || post.publishedAt || post.date]),
]);

// Update `site` to your production domain before deploying —
// it powers canonical URLs, sitemap.xml, and OpenGraph tags.
export default defineConfig({
  site: 'https://yakub.blog',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const date = publishedDates.get(pathname);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  image: {
    // Allow remote job-notice images from any https host at build time.
    // Tighten this to your actual CDN/domain in production.
    domains: [],
    remotePatterns: [{ protocol: 'https' }],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});

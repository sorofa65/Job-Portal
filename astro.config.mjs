import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import posts from './src/data/posts.json';
import blog from './src/data/blog.json';

const publishedDates = new Map([
  ...posts.map((post) => [`/posts/${post.slug}/`, post.date]),
  ...blog.map((post) => [`/blog/${post.slug}/`, post.date]),
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

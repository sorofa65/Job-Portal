import type { APIRoute } from 'astro';
import { getBlogs, getPosts } from '../utils/content.js';

const siteUrl = 'https://yakub.blog';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') || siteUrl;
  const jobLinks = getPosts()
    .filter((post, index, all) => all.findIndex((candidate) => candidate.slug === post.slug) === index)
    .map((post) => `- [${post.title}](${baseUrl}/posts/${post.slug}/): ${post.metaDescription}`)
    .join('\n');
  const blogLinks = getBlogs()
    .map((post) => `- [${post.title}](${baseUrl}/blog/${post.slug}/): ${post.metaDescription}`)
    .join('\n');

  return new Response(`# Yakub Blog

Yakub Blog publishes Bangladesh government, bank, private, university job circulars, results, notices, and practical career guidance.

## Primary routes
- [Latest jobs](${baseUrl}/)
- [Job categories](${baseUrl}/category/govt-job/)
- [Career blog](${baseUrl}/blog/)
- [About](${baseUrl}/about/)
- [Contact](${baseUrl}/contact/)
- [Privacy policy](${baseUrl}/privacy-policy/)
- [Terms](${baseUrl}/terms/)
- [Disclaimer](${baseUrl}/disclaimer/)

## Job circulars
${jobLinks}

## Articles
${blogLinks}

## Editorial guidance
Job details are summarized from published notices. Verify deadlines, eligibility, fees, and application links on the recruiting organization's official website before applying.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
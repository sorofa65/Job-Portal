// Shared helpers for working with the posts.json data source.
// Keeping this logic in one place means the home page, category pages,
// and the single-post page all agree on what "urgent" or "expired" means.

import posts from '../data/posts.json';

/** Pull the application deadline (as a Date) out of a post's summaryTable. */
export function getDeadline(post) {
  const row = post.summaryTable?.find((r) =>
    /deadline/i.test(r.label)
  );
  if (!row) return null;
  const parsed = new Date(row.value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Returns one of: 'expired' | 'urgent' (<=3 days) | 'soon' (<=7 days) | 'active' | 'none'
 */
export function getDeadlineStatus(post, now = new Date()) {
  const deadline = getDeadline(post);
  if (!deadline) return 'none';
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / msPerDay);
  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 3) return 'urgent';
  if (daysLeft <= 7) return 'soon';
  return 'active';
}

export function getDaysLeft(post, now = new Date()) {
  const deadline = getDeadline(post);
  if (!deadline) return null;
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((deadline.getTime() - now.getTime()) / msPerDay);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getAllPosts() {
  const uniquePosts = [...new Map(posts.map((post) => [post.slug, post])).values()];
  return uniquePosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getFeaturedPosts() {
  return getAllPosts().filter((p) => p.isFeatured);
}

export function getUrgentPosts() {
  return getAllPosts().filter((p) => {
    const status = getDeadlineStatus(p);
    return status === 'urgent' || status === 'soon';
  });
}

export function getCategories() {
  const set = new Set(posts.map((p) => p.category));
  return [...set];
}

export function slugifyCategory(category) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getSalaryRange(post) {
  const rows = post.positionDetailsTable?.rows || [];
  const numbers = [];
  for (const row of rows) {
    const salaryCell = row[row.length - 1] || '';
    const matches = salaryCell.match(/[\d,]+/g);
    if (matches) {
      matches.forEach((m) => numbers.push(parseInt(m.replace(/,/g, ''), 10)));
    }
  }
  if (!numbers.length) return null;
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}

export function getTotalVacancy(post) {
  const row = post.summaryTable?.find((r) => /vacanc/i.test(r.label));
  if (!row) return null;
  const match = row.value.match(/[\d,]+/);
  return match ? match[0] : row.value;
}

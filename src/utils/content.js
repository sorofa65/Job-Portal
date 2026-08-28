// Loads one JSON object per file from the job and blog content folders.
const postFiles = import.meta.glob('../data/posts/*.json', { eager: true, import: 'default' });
const blogFiles = import.meta.glob('../data/blog/*.json', { eager: true, import: 'default' });

function flatten(values) {
  return Object.values(values).flatMap((value) => Array.isArray(value) ? value : [value]);
}

export const postRecords = flatten(postFiles);
export const blogRecords = flatten(blogFiles);

export function getPosts() {
  return postRecords;
}

export function getBlogs() {
  return blogRecords;
}

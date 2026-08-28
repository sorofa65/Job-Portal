# BD Job Portal

 A fast, SEO-first job circular portal built with **Astro**, **Tailwind CSS**, and JSON data
JSON data source — inspired by (and designed to outperform) bdgovtjob.net on speed,
aesthetics, SEO, dark mode, and ad placement.

## 1. Project structure

```
job-portal/
├── src/
│   ├── components/
│   │   ├── Navbar.astro          # sticky glass nav + live search overlay
│   │   ├── Footer.astro
│   │   ├── FlipBoard.astro       # hero "departure board" urgent-jobs ticker
│   │   ├── FilterBar.astro       # category / active-expired pills
│   │   ├── JobCard.astro         # grid card (data-id / data-category attrs)
│   │   ├── DeadlineBadge.astro   # urgent / soon / active / expired badge
│   │   ├── AdSlot.astro          # header / in-content / floating ad units
│   │   └── SEO.astro             # OpenGraph + Schema.org JobPosting
│   ├── data/
│   │   ├── posts.json            # Live job circular data: edit this file on GitHub
│   │   ├── posts.template.json   # Copy this structure for a new job
│   │   ├── blog.json             # Live blog data: edit this file on GitHub
│   │   └── blog.template.json    # Copy this structure for a new article
│   ├── layouts/
│   │   └── Layout.astro          # <head>, theme init, search index, ads
│   ├── pages/
│   │   ├── index.astro           # home page
│   │   ├── category/[category].astro
│   │   └── posts/[slug].astro    # single post details page
│   ├── utils/jobs.js             # deadline status, formatting, filters
│   └── styles/global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 2. Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build      # outputs static site to ./dist
npm run preview    # preview the production build locally
```

## 3. Adding / updating content from GitHub

Only edit `src/data/posts.json` for jobs or `src/data/blog.json` for articles. Keep the
root value as a JSON array. Copy the matching `.template.json`, replace every example
value, then paste the object into the live JSON file. Do not paste the outer array twice.

Every GitHub push runs content validation before the Astro build. A build fails when a
required field is missing, a date is not `YYYY-MM-DD`, a slug is duplicated, or a FAQ
does not contain both `question` and `answer`.

### Full blog post structure

```json
{
  "id": "BLOG-2026-001",
  "slug": "url-friendly-blog-slug",
  "title": "Complete article title",
  "category": "Exam Tips",
  "author": "Yakub Ali",
  "date": "2026-08-29",
  "readTimeMinutes": 6,
  "image": "https://cdn.example.com/blog-cover.jpg",
  "metaDescription": "A unique description of the article in about 150 to 160 characters.",
  "excerpt": "Short summary shown on the blog listing page.",
  "content": "<p>Full article content.</p><h2>Section heading</h2><p>More content.</p>",
  "tags": ["Govt Job", "Exam Preparation"],
  "faqs": [
    {
      "question": "A real question readers ask?",
      "answer": "A direct and accurate answer."
    }
  ]
}
```

`content` accepts HTML such as `<p>`, `<h2>`, `<ul>`, `<li>`, `<strong>`, and `<a>`.
Write the direct answer in the first paragraph. Use original, useful information and
add at least one FAQ when the article answers a specific search question.

### Full job post structure

Use `src/data/posts.template.json` as the complete job schema. It includes identity,
organization, vacancy, deadline, qualifications, salary table, official notice images,
PDF link, application link, application steps, and FAQ data. The `summaryTable` must
contain a label including `Deadline`, because the site uses it for deadline badges.

After editing on GitHub, the deployment automatically creates the page, canonical SEO,
structured data, FAQ section, sitemap entry, and `llms.txt` entry.

### Publish checklist

1. Use a unique `id` and URL-safe unique `slug`.
2. Use the official source URL and real notice/PDF URL.
3. Confirm dates, vacancy, eligibility, fees, and deadline from the official notice.
4. Keep JSON commas and quotation marks valid.
5. Commit to GitHub and wait for the deployment build to pass.

## 4. Adding / updating a job post (no code changes needed)

Every post on the site is generated from **`src/data/posts.json`**. To publish a new
circular, append a new object to that array following this schema:

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique, e.g. `JOB-2026-XXX-007` |
| `slug` | string | Unique, URL-safe — becomes `/posts/<slug>/` |
| `title` | string | Full circular title |
| `category` | string | `Govt Job`, `Bank Job`, `Private Job`, `Notice`, or `Result` (drives category pages & nav) |
| `isFeatured` | boolean | Shows on the home hero ticker when true |
| `targetVideoAd` | boolean | Serves a video ad unit in the in-content slot when true |
| `date` | string | `YYYY-MM-DD`, used for sorting and "new" badges |
| `image` | string | Card thumbnail (16:9 works best) |
| `noticeImages` | string[] | Official notice pages, rendered in the gallery/lightbox |
| `metaDescription` | string | SEO description (~155 chars) |
| `summaryTable` | array of `{label, value, isLink?, url?}` | Must include a row whose label contains "Deadline" — this drives the countdown badges |
| `positionDetailsTable` | `{headers: string[], rows: string[][]}` | Salary/position table; last column should contain the salary figures |
| `introContent` | string (HTML) | Rendered as the post body |
| `applicationSteps` | string[] | Rendered as a numbered "How to Apply" list |
| `pdfNoticeLink` | string | Sticky action bar "Download PDF" |
| `applyOnlineLink` | string | Sticky action bar "Apply Online" |

Deadline status (Active / Closing Soon / Urgent / Expired) is computed automatically at
**build time** from `summaryTable`'s deadline row — no manual flag needed.

## 4. Ad integration (Adsterra / AdSense)

Ad placements live in `src/components/AdSlot.astro` (header banner, in-content,
floating sticky bottom bar). Replace the commented placeholder in that file with your
real AdSense `<ins>` snippet or Adsterra `atOptions` script. The `post.targetVideoAd`
flag lets you serve a different (e.g. video) unit on specific posts without touching
any component code — just flip the flag in `posts.json`.

## 5. Deployment

### Option A — Vercel (recommended, zero-config for Astro SSG)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Astro** (auto-detected). Build command `npm run build`,
   output directory `dist` (auto-filled).
4. Update `site` in `astro.config.mjs` to your real Vercel domain, commit, push.
5. Every push to `main` auto-deploys. Editing `src/data/posts.json` and pushing is
   enough to publish a new circular — no other steps required.

### Option B — GitHub Pages

1. In `astro.config.mjs`, set:
   ```js
   site: 'https://<your-username>.github.io',
   base: '/<repo-name>',
   ```
2. Add `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: withastro/action@v3
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
3. In your repo settings → Pages → Source, select **GitHub Actions**.
4. Push to `main` — the site builds and deploys automatically. New posts publish the
   same way: edit `posts.json`, commit, push.

## 6. Performance & SEO checklist already covered

- Static output (no client framework shipped) — fast TTFB and LCP.
- Per-post `JobPosting` Schema.org JSON-LD for Google job rich results.
- OpenGraph + Twitter card metadata per page, canonical URLs, `sitemap.xml` via
  `@astrojs/sitemap`.
- Images are `loading="lazy"` outside the hero/above-the-fold.
- Dark mode via a `class` strategy with a pre-paint inline script (no flash).
- Reduced-motion and visible focus rings handled globally in `global.css`.

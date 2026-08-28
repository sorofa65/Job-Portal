Add one JSON object per job post in this folder. The filename should match the slug, for example `dhaka-division-job-circular.json`.
[
  {
    "_README": "Optimized reusable job-circular schema. Copy this object for every new circular. Fields marked [NEW] were added on top of your original template — each one either feeds a Google feature (schema, sitelinks, Jobs box) or answers a question users actually search for. Delete nothing: if data is unknown, use \"\" or null so the frontend can hide the block.",

    "id": "JOB-2026-ORG-001",
    "slug": "organization-job-circular",
    "_slugRule": "Do NOT put the year in the slug. Reuse the same URL every year and update the content — the page keeps its accumulated backlinks and ranking history.",
    "status": "active",
    "_statusRule": "[NEW] active | expiring_soon | expired. Drives the countdown, the red expiry banner and whether JobPosting schema is printed.",
    "category": "Govt Job",
    "subCategories": [""],
    "isFeatured": false,
    "targetVideoAd": false,

    "seo": {
      "_note": "[NEW] Title max ~60 chars. Front-load the Bangla keyword, then a NUMBER (vacancies or deadline) — numbers lift CTR more than anything else in this niche.",
      "metaTitle": "",
      "metaTitleEn": "",
      "metaDescription": "",
      "_metaDescRule": "150–160 chars. Must contain the deadline date — that is what makes people click over an older, higher-ranked page.",
      "focusKeyword": "",
      "focusKeywordEn": "",
      "secondaryKeywords": [""],
      "canonical": "",
      "ogTitle": "",
      "ogDescription": "",
      "ogImage": "",
      "twitterCard": "summary_large_image",
      "robots": "index, follow, max-image-preview:large",
      "language": "bn-BD",
      "readingTimeMinutes": 0
    },

    "author": {
      "_note": "[NEW] E-E-A-T. 'by Admin' is a trust signal you are throwing away. Use a real name linked to a real author page.",
      "name": "",
      "role": "",
      "profileUrl": "",
      "credentialNote": ""
    },

    "publishedAt": "",
    "lastUpdatedAt": "",
    "lastUpdatedLabel": "",
    "updateLog": [{"date": "", "note": ""}],
    "_updateLogNote": "[NEW] Visible changelog. Cheapest freshness + trust signal there is. Add a row every time the circular gets an amendment, exam date or result.",

    "verification": {
      "_note": "[NEW] Show WHERE the data came from and WHEN it was checked.",
      "verified": true,
      "source": "",
      "sourceUrl": "",
      "verifiedOn": "",
      "badgeText": "✔ মূল বিজ্ঞপ্তি ও অফিশিয়াল ওয়েবসাইট থেকে তথ্য যাচাইকৃত"
    },

    "image": "",
    "imageAlt": "",
    "_imageAltRule": "[NEW] Every notice image needs Bangla alt text. Circular images pull real traffic from Google Images in this niche and alt text is how you get it.",
    "noticeImages": [{"url": "", "alt": ""}],
    "pdfNoticeLink": "",
    "applyOnlineLink": "",

    "keyDates": {
      "_note": "[NEW] ISO 8601 with +06:00 offset. Needed for the countdown AND for schema validThrough.",
      "memoIssuedOn": "",
      "publishedOn": "",
      "applicationStart": "",
      "applicationEnd": "",
      "ageCalculatedAsOn": "",
      "feePaymentWindowNote": ""
    },
    "countdown": {
      "enabled": true,
      "targetIso": "",
      "labelTemplate": "আবেদনের সময় বাকি: {days} দিন {hours} ঘণ্টা",
      "expiredLabel": "এই বিজ্ঞপ্তির আবেদনের সময় শেষ হয়ে গেছে"
    },
    "expiryPolicy": {
      "_note": "[NEW] THIS IS THE BIG ONE. Google requires expired job postings to drop their JobPosting markup. Keep the page indexed (it holds rankings), but show the expiry banner and stop claiming the job is open.",
      "onExpiryShowBanner": true,
      "bannerText": "",
      "removeJobPostingSchemaOnExpiry": true,
      "keepPageIndexed": true,
      "redirectOnNextYearCircular": false
    },

    "organization": {
      "_note": "[NEW] Feeds hiringOrganization + Place in schema. Also lets you build an org hub page later.",
      "nameBn": "", "nameEn": "", "shortName": "", "ministry": "",
      "website": "", "email": "", "phone": "",
      "address": "", "addressLocality": "", "addressRegion": "", "postalCode": "", "addressCountry": "BD",
      "aboutHtml": ""
    },

    "summaryTable": [{"label": "", "value": "", "isLink": false, "url": ""}],

    "positions": [
      {
        "_note": "[NEW] Structured objects instead of flat table rows. One JobPosting schema block is generated per position — that is how you get into the Google Jobs box for 7 different queries from 1 page.",
        "serial": 1,
        "nameBn": "", "nameEn": "",
        "vacancies": 0,
        "grade": "", "gradeNumber": 0, "payScale": "", "basicPay": 0,
        "educationBn": "", "educationEn": "",
        "skillsBn": "",
        "feeTier": "",
        "competitionNote": ""
      }
    ],
    "_positionsWarning": "Always attach the POST NAME to its qualification. The competitor lists grade + qualification blocks with no post names — readers cannot tell which block belongs to which post. Fixing that alone is a real usability win.",

    "eligibilityMatcher": {
      "_note": "[NEW] Highest-value block on the page. Users do not think 'what does post 3 require', they think 'I passed SSC — what can I apply for'. Nobody in this niche answers it that way.",
      "headingBn": "আপনার যোগ্যতা অনুযায়ী কোন পদে আবেদন করতে পারবেন?",
      "headingEn": "Which post can you apply for?",
      "introHtml": "",
      "rows": [{"yourQualification": "", "eligiblePosts": [""], "totalVacancies": 0, "fee": ""}],
      "noteHtml": ""
    },

    "salaryBreakdown": {
      "_note": "[NEW] Circulars publish BASIC pay only. The actual search intent is 'হাতে কত পাবো'. Compute an estimated gross and label it clearly as an estimate.",
      "headingBn": "হাতে কত টাকা পাবেন? — আনুমানিক মাসিক বেতন হিসাব",
      "headingEn": "Estimated monthly gross salary",
      "introHtml": "",
      "headers": ["পদ ও গ্রেড", "শুরুর মূল বেতন", "বাড়িভাড়া ভাতা (আনুমানিক)", "চিকিৎসা ভাতা", "আনুমানিক মোট (গ্রস)"],
      "rows": [["", "", "", "", ""]],
      "disclaimerHtml": "<p><strong>⚠ এটি আনুমানিক হিসাব।</strong> বাড়িভাড়া ভাতার হার এলাকা ও মূল বেতনের স্তর অনুযায়ী ভিন্ন হয়। চূড়ান্ত বেতন নিয়োগপত্র অনুযায়ী নির্ধারিত হবে।</p>",
      "extraBenefitsBn": [""]
    },

    "ageEligibility": {
      "headingBn": "বয়সসীমা — এবং আপনার জন্ম তারিখ কোন সীমার মধ্যে থাকতে হবে",
      "asOnDateBn": "", "minAge": 18, "maxAge": 32, "quotaSameAsGeneral": true,
      "bornBetweenBn": "",
      "_bornBetweenNote": "[NEW] Convert the age limit into an actual birth-date window. '১৮–৩২ বছর' makes the reader do maths; a date range does not. Easy differentiator.",
      "bodyHtml": "",
      "calculatorLink": {"text": "", "url": "/age-calculator/"}
    },

    "districtEligibility": {
      "headingBn": "কোন কোন জেলার প্রার্থীরা আবেদন করতে পারবেন?",
      "eligibleOnly": true,
      "districts": [""],
      "bodyHtml": "",
      "_note": "[NEW] Naming every district as text captures long-tail queries like 'টাঙ্গাইল জেলার চাকরি ২০২৬'. Also explain that 'স্থায়ী বাসিন্দা' ≠ currently living there — a genuine and common misunderstanding."
    },

    "introContent": "<p>First paragraph must answer, in order: who is hiring, how many posts, who can apply, deadline, how to apply. Front-load it — this is what Google quotes and what a scanning reader reads.</p>",

    "englishSummary": {
      "_note": "[NEW] One dedicated English block. Competitors write Bangla-only with English keywords sprinkled in parentheses, so English-query traffic ('dhaka division job circular 2026 apply online') is unclaimed.",
      "headingEn": "",
      "bodyHtml": ""
    },

    "bestFitFor": {
      "headingBn": "কাদের জন্য এই নিয়োগটি সেরা সুযোগ?",
      "items": [{"who": "", "why": ""}]
    },

    "applicationSteps": [{"step": 1, "titleBn": "", "detailBn": ""}],
    "_stepsNote": "Objects, not plain strings — a title makes each step scannable and lets you add a schema HowTo later if you want.",

    "photoSpec": {"dimensions": "", "maxSize": "", "format": "JPG", "noteBn": ""},
    "signatureSpec": {"dimensions": "", "maxSize": "", "format": "JPG", "noteBn": ""},

    "applicationFee": {
      "headingBn": "আবেদন ফি — পদ অনুযায়ী ব্রেকডাউন",
      "headers": ["পদ", "মূল ফি", "সার্ভিস চার্জ", "মোট"],
      "rows": [["", "", "", ""]],
      "smsPayment": {
        "shortCode": "16222",
        "prefix": "",
        "step1Format": "prefix &lt;space&gt; User ID",
        "step1Example": "",
        "step2Format": "prefix &lt;space&gt; YES &lt;space&gt; PIN",
        "step2Example": "",
        "noteBn": ""
      }
    },

    "rejectionRisks": {
      "_note": "[NEW] 'Why applications get rejected' is a question people search separately. Answering it here keeps them on your page and builds real trust.",
      "headingBn": "যে ভুলগুলোতে আবেদন বাতিল হয়",
      "introHtml": "",
      "items": [""]
    },

    "timeline": {
      "_note": "[NEW] The block that makes people come back. Publish it with 'এখনো ঘোষণা হয়নি' rows, then fill each one as it happens and bump lastUpdatedAt. Repeat visits + freshness in one field.",
      "headingBn": "নিয়োগ প্রক্রিয়ার ধাপ ও সময়সূচি",
      "steps": [{"event": "", "date": "", "state": "done|upcoming|tba"}],
      "admitCardHtml": ""
    },

    "preparation": {
      "headingBn": "প্রস্তুতি ও এক্সপার্ট টিপস",
      "items": [{"titleBn": "", "detailBn": ""}]
    },

    "vivaDocuments": {"headingBn": "মৌখিক পরীক্ষায় যে কাগজপত্র লাগবে", "items": [""]},

    "faqs": [{"question": "", "answer": ""}],
    "_faqRule": "8–12 questions minimum, taken from Google's 'People Also Ask' and the autocomplete for your focus keyword. Keep 1–2 in English. Answers 40–70 words — long enough to be a featured snippet, short enough to render in the accordion.",

    "internalLinks": [{"anchor": "", "url": ""}],
    "relatedCirculars": [{"title": "", "url": ""}],
    "_linkingRule": "[NEW] Every circular page links UP to its division/category hub and SIDEWAYS to 3 similar circulars (same grade or same qualification). This is what turns 50 orphan pages into a crawlable topical cluster.",

    "closingContent": "",
    "tableOfContents": [""],

    "schema": {
      "_note": "[NEW] The single biggest technical gap versus competitors. Print all four blocks.",
      "generateJobPostingPerPosition": true,
      "jobPostingDefaults": {
        "datePosted": "",
        "validThrough": "",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {"@type": "GovernmentOrganization", "name": "", "sameAs": ""},
        "jobLocation": {"@type": "Place", "address": {"@type": "PostalAddress", "streetAddress": "", "addressLocality": "", "addressRegion": "", "postalCode": "", "addressCountry": "BD"}},
        "applicantLocationRequirements": {"@type": "Country", "name": "Bangladesh"},
        "baseSalaryCurrency": "BDT",
        "baseSalaryUnitText": "MONTH",
        "directApply": false
      },
      "generateFaqPage": true,
      "generateBreadcrumb": [{"name": "", "url": ""}],
      "generateArticle": true,
      "articleType": "NewsArticle"
    }
  }
]

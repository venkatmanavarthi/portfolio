# Portfolio

Personal portfolio and blog built with [Hugo](https://gohugo.io/). No themes — fully custom layouts and inline CSS.

Live at [venkatmanav.com](https://venkatmanav.com)

## Stack

- **Hugo** 0.152.2 (extended)
- **Dart Sass** 1.93.2
- **Go** 1.25.3
- **Node.js** 22.20.0
- Deployed to **GitHub Pages** via GitHub Actions

## Features

- Dark mode (system preference + manual toggle, persisted to `localStorage`)
- Responsive two-column layout (single column on mobile, `3fr / 2fr` split at 880px+)
- No external dependencies — no CSS frameworks, no JS libraries, no webfont requests
- SEO: Open Graph, Twitter Card, canonical URL, dynamic meta description
- Sections: Experience, Education, Certifications, Skills, Projects, Blog, Books

## Project Structure

```
content/
├── _index.md          # Homepage about text
├── blog/              # Blog posts
├── certifications/    # Certifications
├── education/         # Degrees
├── experience/        # Work experience
├── projects/          # Projects
├── skills/            # Skill groups with pill badges
├── books/             # Book reviews
└── tools/             # Finance tools

layouts/
├── _default/          # baseof.html, list.html, single.html
├── projects/          # list.html, single.html
├── books/             # list.html, single.html
├── 2026/              # Animated timeline layout
├── tools/             # SWP calculator
└── index.html         # Homepage
```

## Content Front Matter

### Experience
```yaml
title: "Software Engineer"
date: 2023-01-01
endDate: "2024-06-01"   # omit for "Present"
role: "Software Engineer"
company: "Acme Corp"
location: "Remote"
tech: ["Go", "Kubernetes"]
```

### Education
```yaml
title: "M.S. Computer Science"
date: 2022-08-01
endDate: "2024-05-01"
degree: "Master of Science"
field: "Computer Science"
institution: "University of Missouri–Kansas City"
location: "Kansas City, MO"
```

### Certifications
```yaml
title: "AWS Certified Developer"
date: 2023-06-01
endDate: "2026-06-01"
issuer: "Amazon Web Services"
credentialId: "ABC123"
credentialUrl: "https://..."
```

### Projects
```yaml
title: "My Project"
date: 2024-01-01
description: "Short description shown on the list page."
link: "https://github.com/..."   # optional — makes title an external link
tech: ["Go", "React"]
tags: ["open-source"]
```

### Blog
```yaml
title: "Post Title"
date: 2024-11-01
draft: false
tags: ["go", "systems"]
description: "Short summary for the list view."
```

### Books
```yaml
title: "Ikigai"
date: 2024-03-01
author: "Héctor García"
rating: 4
cover: "/images/ikigai.jpg"
tags: ["philosophy"]
description: "Short summary."
```

### Skills
```yaml
title: "Backend"
weight: 1        # controls sort order
skills: ["Go", "Python", "PostgreSQL"]
```

## Local Development

```sh
hugo server -D
```

The `-D` flag includes draft content. The site is served at `http://localhost:1313` by default.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow at `.github/workflows/publish.yml`, which builds the site with `hugo --gc --minify` and deploys it to GitHub Pages.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (requires ruby-dev/ruby-devel for native extensions)
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build static site
bundle exec jekyll build
```

> Note: Local dev requires `ruby-dev` (Debian/Ubuntu) or `ruby-devel` (Fedora/RHEL) for native gem compilation. GitHub Pages builds in its own environment so deploys work without local build setup.

## Architecture

Single-page portfolio site built with Jekyll 4.2 deployed to GitHub Pages.

**Page assembly flow:**
- `index.html` — front matter only (`layout: index`)
- `_layouts/index.html` — stitches all includes, loads CDN scripts at end of `<body>`
- Each section is a separate `_includes/` partial

**Sections (in render order):**
1. `_includes/navbar.html` — sticky Bootstrap 5 navbar, transparent → frosted glass on scroll
2. `_includes/hero.html` — full-viewport hero; loads `assets/js/hero3d.js` as ES module
3. `_includes/about.html` — bio, photo, quick tags, CTA buttons
4. `_includes/skills.html` — skill chip grid grouped by category
5. `_includes/experience.html` — vertical timeline (work + education)
6. `_includes/portfolio.html` — Swiper 11 carousel of featured projects
7. `_includes/repos.html` — live GitHub API grid (fetched client-side)
8. `_includes/contact_FreeForm.html` — mailto-based contact form
9. `_includes/footer.html` — links, socials, copyright

**Key JS files:**
- `assets/js/hero3d.js` — Three.js 0.162 ES module; particle network with mouse parallax; loaded via `<script type="module">` in hero.html; importmap declared in head.html
- `assets/js/main.js` — AOS init, Swiper init, sticky nav, typed text effect, GitHub API repos grid, contact form mailto handler

**CDN dependencies (all free, no vendored copies):**
- Bootstrap 5.3.3 (CSS + JS bundle)
- Font Awesome 6.6.0
- Google Fonts: Inter + Space Grotesk + Fira Code
- AOS 2.3.4 (scroll animations)
- Swiper 11 (project carousel)
- Three.js 0.162.0 (via importmap → jsdelivr ES module)

**CSS:** `assets/css/main.css` — all custom styles using CSS custom properties (`:root` vars). Bootstrap is used only for grid/navbar/collapse; everything visual is custom.

## Key details

- **GitHub API**: repos grid at `#open-source` fetches `api.github.com/users/William0Friend/repos` client-side, no auth, max 12 public non-fork repos.
- **Contact**: mailto form — submitting pre-fills the user's email client. Email: `william0friend@outlook.com`.
- **Three.js importmap** must stay in `<head>` (head.html) before any `<script type="module">` tags. Don't move it to body.
- **Jekyll plugins** (jekyll-feed, jekyll-sitemap, jekyll-seo-tag) are all on the GitHub Pages allowlist.
- `_site/` and `.jekyll-cache/` are gitignored build artifacts.
- The old `_includes/about2.html`, `navbar2.html`, etc. and old layout variants (`index2.html`, `index3.html`) still exist but are not used — safe to delete.

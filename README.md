# Love Raw Cake

Website for **Love Raw Cake** — raw, vegan, gluten-free cakes handmade in
Reykjavík by Katya.

🔗 **Live site:** https://mermina.github.io/love-raw-cake/
📷 **Instagram:** [@love.raw.cake](https://instagram.com/love.raw.cake)

---

## How this was built

It started with a conversation, not a brief. In June 2026 I sat down with Katya
to understand not only what she wanted on a page, but where she wants the
business to be in a few years' time.

Several parts of this site exist because of that conversation rather than
because I proposed them:

- **Courses** — she wants to teach raw baking, and in time to give other people
  work rather than bake alone
- **The blog** — her customers ask the same questions about raw food and
  fermentation, and she would rather answer them properly once
- **The Friday Box** — her own idea for a recurring weekly order
- **No shopping cart** — deliberately. She wants to speak to the person who is
  ordering, so the site sends her an enquiry instead of taking a payment

Everything on the page is hers: her photographs, her ingredient lists, and her
measured nutrition figures where she has them — and no figures where she
hasn't.

## How this site is built to be found

A website that people like is not automatically a website machines can read.
Alongside the design, this site carries **structured data** — a machine-readable
description of the business and every cake, written in
[schema.org](https://schema.org/) vocabulary.

- **`LocalBusiness` / `Bakery`** — who Katya is, where she bakes, since when
- **14 `Product` nodes** — every cake, with its description, photograph and
  category, all pointing back to one business identity
- **`Offer` with `UnitPriceSpecification`** — 1,100 ISK *per 100 g*, not a flat
  price, because that is what she actually charges. Plus the 600 g minimum on
  small cakes and the delivery terms
- **`FAQPage`** — the five questions customers ask most
- **`robots.txt`** explicitly welcoming GPTBot, Google-Extended, ClaudeBot and
  PerplexityBot, and **`sitemap.xml`** so nothing is missed

The rule followed throughout: **only assert what is true.** A placeholder phone
number was removed rather than left in place, and the Friday Box carries no price
because it isn't sold by weight. Structured data is a set of promises made to
machines on the client's behalf — a missing field costs nothing, a wrong one
costs trust.

Full write-up: [`FOUNDABILITY-guide.md`](../FOUNDABILITY-guide.md)

## About the site

A single page of hand-written HTML and CSS — no framework, no build step, no
dependencies. It covers Katya's story, the full cake range with ingredients and
nutrition, small cakes and the Friday Box, catering for events, and the courses
to come.

## Structure

```
index.html                        the site
styles.css                        all styling
site.js                           gallery, tabs, modals
blog.html  ·  blog/               blog index and posts
images/                           photos and logo
images/images_20.08.2026/         current photo set (card / gallery / hero crops)
```

## How to update

1. Edit `index.html`, `styles.css` or `site.js`
2. Commit and push to `main`
3. GitHub Pages redeploys within about a minute — hard-refresh to see it

Image naming: `<cake>_main` is the master; `_card` (4:3), `_gal` (1:1) and
`_hero` are the web-sized crops cut from it.

Note that hero images are loaded from `styles.css` via `background-image`, so a
check that only looks at `src` and `href` in the HTML will miss them.

## Built with

Plain HTML, CSS and JavaScript, hosted on GitHub Pages.

---

*Built with [Claude](https://claude.ai/code).*

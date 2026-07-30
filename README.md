# KreedumSports

A landing page for Kreedum International Private Limited, built with React,
Vite, Tailwind CSS, and React Router.

This is a restructured version of the original single-file prototype —
same design and behavior, organized into a conventional, scalable folder
layout so a backend can be added later without another rewrite.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — upload its contents to any static host
(Netlify, Vercel, GitHub Pages, cPanel, etc.).

Because the app now uses real client-side routing (`/` and `/quote` via
React Router) instead of `#/quote` hash routing, your host needs a rewrite
rule so refreshing `/quote` doesn't 404. This repo already includes:
- `public/_redirects` — for Netlify
- `vercel.json` — for Vercel

Other hosts need an equivalent "serve index.html for any unmatched route"
rule.

## Project structure

```
kreedum-sports/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                    # SPA rewrite rule for Vercel
├── .env.example                   # copy to .env, fill in when the backend exists
├── public/
│   ├── favicon.png
│   └── _redirects                 # SPA rewrite rule for Netlify
└── src/
    ├── main.jsx                   # React entry point
    ├── App.jsx                    # Router setup (BrowserRouter + routes)
    ├── index.css                  # Tailwind directives
    ├── assets/
    │   └── logo.jpg                # Kreedum logo (was an inline base64 string before)
    ├── config/                    # Small, static site-wide values
    │   ├── theme.js                # COLORS — brand color tokens
    │   ├── contact.js               # phone numbers, WhatsApp number
    │   └── navigation.js            # nav bar links
    ├── data/                      # Content arrays shown by sections
    │   ├── photos.js                # placeholder Unsplash photos
    │   ├── products.js              # "What We Stock" categories
    │   ├── locations.js             # store addresses/hours
    │   ├── socialLinks.js           # footer social icons
    │   └── quoteFormOptions.js      # dropdown options for both forms
    ├── hooks/
    │   └── useScrolled.js          # true once the page is scrolled past a threshold
    ├── utils/
    │   ├── scrollToId.js           # smooth-scroll to a section by id
    │   └── whatsapp.js             # build/open a wa.me link, phone validation
    ├── services/
    │   └── api.js                  # fetch wrapper for the future backend (see below)
    ├── components/
    │   ├── common/                 # shared, presentation-only pieces
    │   │   ├── GlobalStyle.jsx      # fonts, clip-path utility classes, focus rules
    │   │   ├── Icons.jsx            # small inline SVG icons used in 2+ places
    │   │   └── SocialLinks.jsx
    │   ├── layout/
    │   │   ├── Nav.jsx              # sticky header (home page only)
    │   │   └── Footer.jsx
    │   └── sections/                # one file per landing-page section
    │       ├── Hero.jsx
    │       ├── StatsBar.jsx
    │       ├── About.jsx
    │       ├── Products.jsx
    │       ├── Infrastructure.jsx
    │       ├── Gallery.jsx
    │       ├── Locations.jsx
    │       └── ContactForm.jsx
    └── pages/
        ├── HomePage.jsx            # assembles Nav + all sections + Footer
        └── QuotePage.jsx           # the /quote gym-equipment quote form
```

### Why this layout

- **`config/` vs `data/`** — `config` holds small values that describe *the
  site itself* (colors, phone numbers, nav links). `data` holds content
  arrays that a section renders (product cards, store list, dropdown
  options). If a backend later serves any of this, only the `data/*.js`
  file it replaces needs to change — no component touches raw arrays.
- **`components/sections/` vs `pages/`** — each section is a self-contained,
  single-responsibility component. `pages/` just composes them. Adding a
  new page (e.g. `/about` or `/careers`) means creating one file in `pages/`
  and wiring a `<Route>` in `App.jsx` — existing sections are untouched.
- **`services/api.js`** — nothing calls this yet. It exists so that wiring
  up a backend later is additive, not another refactor.

## Connecting a backend later

1. Stand up your API and note its base URL.
2. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
3. Call `api.get/post/put/del` from `src/services/api.js` wherever you need
   data — for example, inside `ContactForm.jsx`'s `handleSubmit`, in
   addition to (or instead of) the WhatsApp hand-off:

   ```js
   import { api } from "../../services/api";
   // ...
   await api.post("/contact", form);
   ```

4. If you add more resources (products, orders, auth), it's usually
   cleanest to give each its own file in `src/services/` (e.g.
   `products.js`, `quotes.js`) that wraps `api` with resource-specific
   functions, rather than growing `api.js` itself.

## Notes / things to finish

- **Second store location**: `src/data/locations.js` has placeholder text
  for the second store's address — search for "to confirm" and fill in the
  real details.
- **Contact & Quote forms**: both currently hand off to WhatsApp
  (`src/utils/whatsapp.js`). To also save submissions to a database or send
  email, call `api.post(...)` from `handleSubmit` in `ContactForm.jsx` /
  `QuotePage.jsx` once the backend exists (see above).
- **Photos**: `src/data/photos.js` uses free Unsplash stock photos as
  placeholders. Swap in real photos of the stores/products by replacing the
  URLs there — no component needs to change.

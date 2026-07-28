# Patrick Kinyua Karimi — Portfolio

A fast, fully self-contained personal portfolio for **Patrick Kinyua Karimi**, a Full-Stack
Software Engineer & SDET. Built with plain HTML, CSS and vanilla JavaScript — **no build step, no
frameworks and no external CDNs** — so it runs anywhere and works offline.

## Highlights

- **Self-sufficient** — every asset (fonts, icons, favicon, background textures) is inline or
  system-provided. Nothing is fetched from a third party.
- **Layered background art** — animated gradient orbs, a masked grid, a dot matrix, concentric
  rings, subtle SVG noise and a pointer parallax effect.
- **Polished UX** — scroll-reveal animations, animated stat counters, scroll-spy navigation, a
  reading-progress bar, glassmorphism cards, a light/dark theme toggle (persisted) and a responsive
  mobile menu.
- **Printable résumé** — [`resume.html`](resume.html) is a clean, ATS-friendly CV that prints
  straight to PDF via the browser (Download / Print button included).
- **Accessible & respectful** — semantic markup, keyboard-friendly controls and full
  `prefers-reduced-motion` support.

## Structure

```
portfolio/
├── index.html        # Main single-page portfolio
├── resume.html       # Printable / downloadable CV
├── css/
│   ├── style.css     # Portfolio styles + background patterns
│   └── resume.css    # Résumé styles (screen + print)
├── js/
│   └── main.js       # Interactions & animations
└── README.md
```

## Run it

No tooling required — just open `index.html` in a browser.

For a local server (recommended so relative links behave), from this folder run any one of:

```powershell
# Python
python -m http.server 5500

# Node (if you have it)
npx serve .
```

Then visit `http://localhost:5500`.

## Customize

- **Content** lives directly in `index.html` and `resume.html`.
- **Colors / theme** are CSS custom properties at the top of `css/style.css` (`:root` and
  `[data-theme="light"]`).
- The contact form opens the visitor's email client via `mailto:` — swap in a form backend
  (Formspree, Getform, etc.) in `js/main.js` if you want server-side delivery.

## Deploy

Drop the folder onto any static host — GitHub Pages, Netlify, Vercel, Cloudflare Pages or plain
object storage. No configuration needed.

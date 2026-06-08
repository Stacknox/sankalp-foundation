# Sankalp Foundation — Website Design & Build Plan

> Static, mobile-first marketing site for **Sankalp Foundation** (founded Silchar, Assam, 2026).
> Aesthetic direction: **Apple-Minimal Premium** — maximum whitespace, monochrome + one hopeful green accent, cinematic photography, ultra-light type.
> Hosting: source on **GitHub**, live site on **Hostinger** (custom domain).

---

## 1. Goals & Principles

| Goal | What it means here |
|------|--------------------|
| **Mobile-first** | Design the phone layout first, then scale up to tablet and desktop. ~70%+ of Indian NGO traffic is mobile. |
| **Works everywhere** | Pure static HTML/CSS/JS — opens on any phone, tablet, or desktop browser, on GitHub Pages *or* Hostinger, with zero server. |
| **State-of-the-art & calm** | Apple-grade restraint: lots of negative space, one accent colour, large cinematic imagery, slow confident motion. |
| **Trust + action** | Two jobs: make people *trust* the foundation, then make it *effortless to donate*. |
| **Easy for you to edit later** | No build tools required. Plain files you can open and change. |

---

## 2. Tech Stack — and *why* (answers your "what will work?")

**Recommendation: plain HTML + CSS + vanilla JS. No framework, no build step.**

A static website is just files (`.html`, `.css`, `.js`, images). Any host that serves files will run it — GitHub Pages, Hostinger, Netlify, all of them. Because there's no build step, **whatever you see locally is exactly what ships.** That's the safest, most future-proof choice for a small site you'll maintain yourself.

- **HTML5** — semantic structure (`<header> <main> <section> <footer>`).
- **CSS3** — one `styles.css` using CSS variables (design tokens), Flexbox + Grid, `clamp()` for fluid type. Mobile-first media queries.
- **Vanilla JS** — tiny `main.js` only for: mobile nav toggle, scroll-reveal animations (IntersectionObserver), and the donate-modal/QR. No libraries needed.
- **Fonts** — Apple ships *SF Pro* but it isn't free to embed on the web. We use **Inter** (a free, SF-Pro-like typeface via Google Fonts) for headings/body, with a native fallback stack so Apple devices can still render SF Pro. This keeps the Apple feel on every device.

> We are **not** using Astro/Tailwind/React. They add a build step (Node install → `npm run build` → deploy the output), which is overkill for a 5-page brochure site and makes editing harder for you. If the site later grows a blog or many pages, we can revisit Astro.

---

## 3. Hosting & Deployment (GitHub → Hostinger)

You asked: *"I will link the static website from GitHub? what will work?"* Here are your three valid paths. **Pick A or C.**

### Path A — Hostinger is the live site, GitHub is your backup (Recommended)
You bought Hostinger (likely with the domain), so serve the real site from there.
1. Develop locally in this folder.
2. Push the code to a **private GitHub repo** (version history + backup).
3. Deploy to Hostinger by uploading the files into **`public_html`** — either drag-and-drop in **hPanel → File Manager**, or via **FTP** (FileZilla).
4. Your Hostinger domain (e.g. `sankalpfoundation.org`) serves it. Done.
   - Bonus: Hostinger can also **auto-deploy from GitHub** (hPanel → *Git* → connect repo → it pulls on every push). Optional, nice once you're comfortable.

### Path B — GitHub Pages only (free, no Hostinger needed)
Push to a public repo → Settings → Pages → deploy from `main`. You get `username.github.io/sankalp`. You can point a custom domain at it for free. Good if you'd rather not pay Hostinger — but since you already have Hostinger, Path A is better.

### Path C — GitHub + auto-deploy to Hostinger via FTP
A GitHub Action uploads to Hostinger on every `git push`. Most "professional" (push = live) but the most setup. We can add this later once the site exists.

**My call:** start with **Path A** (simplest, uses what you've paid for). Keep the GitHub repo so nothing is ever lost. Move to Path C later if you want push-to-deploy.

---

## 4. Information Architecture (pages)

Five pages, classic and SEO-friendly. The home page is a long cinematic scroll; the rest are focused.

```
/  (index.html) ........ Home — hero, mission, impact stats, work preview, donate CTA
/about.html ............ About Us — story, founding (Silchar 2026), vision/mission, team
/work.html ............. Our Work — programs/initiatives, photo gallery, impact
/donate.html ........... Donate — UPI QR + Razorpay/Cashfree button, why donate, 80G note
/contact.html .......... Contact & Address — address, map, phone/email, contact form
```

Shared **sticky top nav** and **footer** appear on every page. (With plain HTML these are copy-pasted into each file; if that becomes annoying we add a tiny JS include or move to Astro.)

---

## 5. Design System — "Apple-Minimal Premium"

> ⚠️ You said you have **official brand colours**. Send them and I'll swap the palette below — these are the chosen Apple-minimal defaults until then. Everything is a CSS variable, so changing the whole site's colour is a 4-line edit.

### 5.1 Colour palette (CSS tokens)
```css
:root {
  --bg:        #F5F5F7;  /* near-white page background (Apple grey-white) */
  --surface:   #FFFFFF;  /* cards, raised surfaces */
  --ink:       #1D1D1F;  /* primary text, near-black */
  --grey:      #86868B;  /* secondary text, captions */
  --hairline:  #D2D2D7;  /* 1px borders, dividers */
  --accent:    #2E7D5B;  /* hope green — links, primary CTA */
  --accent-600:#256B4D;  /* accent hover/pressed */
  --accent-tint:#E8F2EC; /* light green wash for highlight sections */
}
```
Rule: **monochrome by default, green only for action & emphasis.** Never two accent colours on one screen.

### 5.2 Typography
- Family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Apple signature = **light weights + tight tracking + big sizes**. Fluid via `clamp()`.

| Role | Size (mobile → desktop) | Weight | Notes |
|------|------------------------|--------|-------|
| Display H1 | `clamp(2.5rem, 8vw, 5rem)` | 600 | tight `letter-spacing: -0.03em`, line-height 1.05 |
| H2 section | `clamp(1.75rem, 5vw, 3rem)` | 600 | `-0.02em` |
| H3 | `clamp(1.25rem, 3vw, 1.75rem)` | 600 | |
| Body | `clamp(1rem, 2.5vw, 1.1875rem)` | 400 | line-height 1.6, `--grey` for sub-copy |
| Caption/eyebrow | `0.8125rem` | 600 | uppercase, `+0.08em`, `--grey` |

### 5.3 Spacing — 8pt grid
`4, 8, 16, 24, 32, 48, 64, 96, 128 px`. Section vertical padding: **64px mobile → 128px desktop**. Generous whitespace *is* the design — when in doubt, add more.

### 5.4 Radius, depth, borders
- Radius: `--r-sm: 10px` (buttons/inputs), `--r-md: 18px` (cards), `--r-lg: 28px` (hero/feature blocks).
- Shadows are **subtle** (Apple uses almost none): `--shadow: 0 4px 24px rgba(0,0,0,.06)`. Prefer hairline borders (`1px solid var(--hairline)`) over heavy shadows.

### 5.5 Motion
- Calm and slow: `transition: 220ms cubic-bezier(.4,0,.2,1)`.
- Scroll-reveal: elements fade-up `opacity 0→1, translateY 24px→0` as they enter view (IntersectionObserver). Stagger by ~80ms.
- Hover (desktop only): cards lift 2–4px, images scale `1.03`. Respect `prefers-reduced-motion`.

---

## 6. Mobile-First Responsive Strategy

Write base CSS for **phone**, then add `min-width` breakpoints up.

| Breakpoint | Target | Layout shift |
|------------|--------|--------------|
| base (0–599) | Phone | single column, hamburger nav, stacked cards, full-bleed images |
| `≥600px` | Large phone / small tablet | 2-col card grids, larger type |
| `≥900px` | Tablet / small laptop | nav links inline (no hamburger), 3-col grids, side-by-side hero |
| `≥1280px` | Desktop | max content width `1200px` centered, max whitespace |

Rules: tap targets **≥44×44px**; body text never below 16px; images `max-width:100%`; test at 360px width (cheap Android) first.

---

## 7. Component & Section Specs

### Nav (sticky, every page)
- Mobile: logo left, hamburger right → opens full-screen overlay menu (links + green "Donate" button). Background blurs (`backdrop-filter`) on scroll, like Apple.
- Desktop: logo left, inline links center/right, green **Donate** pill far right.

### Hero (Home)
- Full-viewport cinematic photo of the foundation's people/work, subtle dark gradient overlay for text legibility.
- Centered: eyebrow ("Silchar, Assam · Est. 2026") → light **H1** ("A resolve to change lives" / your tagline) → one-line subhead → two buttons: **Donate** (solid green) + **Our Work** (ghost/outline).
- Lots of negative space. One idea per screen.

### Impact stats band
- 3–4 big numbers (lives touched, projects, villages, volunteers), light-weight huge numerals + small grey labels. Count-up animation on scroll.

### "Our Work" preview (Home) / full grid (work.html)
- Cards: photo (rounded `--r-md`), title, 1-line description. 1-col mobile → 3-col desktop. Hover lift. Each links to its detail / section.

### Donate (donate.html) — UPI QR + Razorpay/Cashfree
- Hero line: "Your support is the sankalp." + impact framing ("₹500 = ___").
- **Primary:** big green **Donate Now** button → opens your hosted **Razorpay/Cashfree payment page** in a new tab (you paste the link; no backend needed).
- **Secondary:** **UPI QR code** image + UPI ID shown for instant scan-to-pay from any UPI app.
- Trust row: registration number, **80G tax-exemption** note (if applicable), "where your money goes" mini-breakdown.
- *(Optional later: a real Cashfree backend for receipts/order tracking — a Cashfree integration skill is available when you're ready.)*

### Contact & Address (contact.html)
- Address block (Silchar, Assam), phone, email, social links.
- **Embedded Google Map** (iframe) of the office.
- **Contact form** — since static sites have no backend, use **Web3Forms** or **Formspree** (free, just an action URL; submissions email you). No server code.

### Footer (every page)
- Logo + one-line mission, quick links, address, socials, small "Donate" link, copyright + "Sankalp Foundation, Silchar, Assam".

---

## 8. Wireframes (mobile-first)

**Home — phone**
```
┌─────────────────────────┐
│ [logo]            [≡]    │  sticky, blur-on-scroll
├─────────────────────────┤
│                         │
│   ░░ full-bleed photo ░░ │
│   SILCHAR · EST. 2026   │  eyebrow
│   A resolve to          │  light H1
│   change lives.         │
│   one-line subhead      │
│  [ Donate ]  [Our Work] │
│                         │
├─────────────────────────┤
│   1,200+    35    12     │  impact stats
│   lives  villages proj.  │
├─────────────────────────┤
│   Our Work               │  H2
│   ┌───────────────────┐  │
│   │  [photo]          │  │  card (stack)
│   │  Education        │  │
│   └───────────────────┘  │
│   ┌───────────────────┐  │
│   │  [photo] Health   │  │
│   └───────────────────┘  │
├─────────────────────────┤
│   Be the change.         │  green-tint CTA band
│        [ Donate ]        │
├─────────────────────────┤
│   footer · address · ©   │
└─────────────────────────┘
```

**Home — desktop (≥1280)**
```
┌───────────────────────────────────────────────┐
│ [logo]      About  Work  Contact   [ Donate ]  │
├───────────────────────────────────────────────┤
│ ░░░░░░░░░░░░ full-bleed cinematic hero ░░░░░░░░ │
│            SILCHAR · EST. 2026                  │
│            A resolve to change lives.           │
│            [ Donate ]   [ Our Work ]            │
├───────────────────────────────────────────────┤
│     1,200+        35           12               │
│      lives      villages    projects            │
├───────────────────────────────────────────────┤
│  Our Work                                       │
│  ┌────────┐  ┌────────┐  ┌────────┐             │
│  │ photo  │  │ photo  │  │ photo  │   3-col     │
│  │ Educ.  │  │ Health │  │ Relief │             │
│  └────────┘  └────────┘  └────────┘             │
└───────────────────────────────────────────────┘
```

**Donate — phone**
```
┌─────────────────────────┐
│ Your support is sankalp │
│ ₹500 educates a child   │
│                         │
│   [  Donate Now  ]      │  → Razorpay/Cashfree link
│                         │
│   — or scan to pay —    │
│   ┌───────────────┐     │
│   │   [ UPI QR ]  │     │
│   └───────────────┘     │
│   UPI: sankalp@upi      │
│                         │
│  ✓ 80G tax exemption    │
│  ✓ Reg. No. ____        │
│  Where your money goes  │
└─────────────────────────┘
```

---

## 9. Accessibility, Performance, SEO

- **A11y:** semantic landmarks, alt text on every image, visible focus rings, ≥4.5:1 contrast (green `#2E7D5B` on white passes), `prefers-reduced-motion` honored, keyboard-navigable menu/modal.
- **Performance:** compress photos to **WebP**, `loading="lazy"` on below-fold images, `<img width/height>` to prevent layout shift, one CSS + one JS file, system/Google fonts only. Target Lighthouse 95+.
- **SEO/Social:** per-page `<title>` + meta description, Open Graph + Twitter cards (so links preview nicely on WhatsApp/FB), `favicon`, `sitemap.xml`, `robots.txt`, JSON-LD `NGO`/`Organization` schema with Silchar address.

---

## 10. File Structure
```
sankalp/
├── index.html
├── about.html
├── work.html
├── donate.html
├── contact.html
├── css/
│   └── styles.css         # design tokens + all styles
├── js/
│   └── main.js            # nav, scroll-reveal, donate QR/modal
├── assets/
│   ├── logo.svg
│   ├── img/               # hero + program photos (WebP)
│   ├── donate-qr.png      # UPI QR
│   └── favicon.png
├── sitemap.xml
├── robots.txt
└── README.md              # how to edit & deploy
```

---

## 11. Build Roadmap (phased)

1. **Scaffold** — folder structure, `styles.css` design tokens, shared nav + footer, base reset, font setup.
2. **Home** — hero, impact band, work preview, CTA band (the showcase page; sets the visual bar).
3. **About** — story, Silchar 2026 founding, mission/vision, team.
4. **Our Work** — program cards + photo gallery.
5. **Donate** — Razorpay/Cashfree button + UPI QR + trust block.
6. **Contact** — address, Google Map iframe, Web3Forms/Formspree form.
7. **Polish** — scroll animations, responsive QA at 360/768/1280px, accessibility + Lighthouse pass.
8. **Deploy** — push to GitHub, upload to Hostinger `public_html`, connect domain, test live on a real phone.

---

## 12. What I need from you (assets checklist)

You said you have these — please drop them into `assets/` (or send them):

- [ ] **Logo** (SVG preferred, else high-res PNG).
- [ ] **Brand colours** (hex codes) — these override the palette in §5.1.
- [ ] **Photos** — 1 strong hero image + 2–6 program/people photos (highest resolution you have).
- [ ] **Copy** — mission statement, About story, program names + 1-line descriptions, impact numbers.
- [ ] **Donate details** — Razorpay/Cashfree payment-page link, UPI ID + QR image, registration no., 80G status.
- [ ] **Contact** — exact Silchar address, phone, email, social links.

---

## 13. Open Decisions

1. **Hosting path** — confirm **Path A** (Hostinger live + GitHub backup) or another.
2. **Brand colours** — send hex codes, or keep the Apple-minimal green default.
3. **Tagline / H1** — your one-line hero headline (I can draft options).
4. **Page set** — these 5 pages, or do you also want *Events*, *Gallery*, or *Volunteer*?

Once you confirm §13 and drop the assets, I'll build Phase 1–2 (scaffold + Home) so you can see the look on your phone immediately.

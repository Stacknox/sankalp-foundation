# Sankalp Foundation — Website

Static, mobile-first website for **Sankalp Foundation** (Itkhola, Silchar, Assam · est. 2026).
Pure HTML + CSS + vanilla JS — no build step, no framework. Opens anywhere.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — modern hero, mission, what we do, impact, work teaser, donate CTA |
| `about.html` | Our story + "every walk of life" team + mission/vision/values |
| `work.html` | Event photo albums (data-driven) with lightbox |
| `donate.html` | UPI QR + bank details |
| `contact.html` | Address, Itkhola map, contact form |
| `css/styles.css` | Design system (pastel Apple-minimal) — all tokens are CSS variables |
| `js/main.js` | Nav, scroll-reveal, lightbox |
| `asset/` | Logo + event photos |

## Preview locally
```bash
# from this folder
python -m http.server 8753
# then open http://localhost:8753
```

## Add a new event album (no HTML surgery)
1. Drop the event's photos in a new folder, e.g. `asset/charity_flood_relief/`.
2. Open `work.html`, find the `EVENTS` list near the bottom.
3. Copy the commented template block, paste it at the **top** of the list (newest first), and fill in title / description / date / photo paths.
4. Save. The album (and its lightbox) renders automatically.

## Before going live — fill these placeholders
- `asset/donate-qr.png` — your UPI QR image (a tidy fallback shows until added)
- `donate.html` — real **UPI ID** and **bank account details**
- `contact.html` — **email**, **phone**, and a free **Web3Forms** access key to activate the form (web3forms.com)
- `robots.txt` / `sitemap.xml` — replace `YOUR_DOMAIN` with your live domain
- (optional) confirm the Itkhola map pin in `contact.html`

## Deploy
**Option A — Hostinger (live) + GitHub (backup):**
1. Push this folder to a GitHub repo (version history).
2. In Hostinger hPanel → File Manager, upload all files into `public_html`.
3. Point your domain at it. Done.

**Option B — GitHub Pages (free):** repo → Settings → Pages → deploy from `main`.

## Design notes
- Aesthetic: Apple-minimal, soft pastel palette (lavender / sky / mint / peach).
- Change the whole accent in one place: `--blue` / `--accent` in `css/styles.css`.
- Mobile-first; breakpoints at 600 / 760 / 900 / 1000 / 1280px. Hamburger nav under 900px.
- Accessible: semantic landmarks, alt text, focus rings, `prefers-reduced-motion` respected.

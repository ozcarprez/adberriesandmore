# AD Berries & More — Website

Static bilingual (EN/ES) marketing site for **AD Berries & More, LLC** — a PACA-licensed
berry & Hass avocado importer based in McAllen, TX.

No build step. No framework. Plain HTML/CSS/JS — ready to push to GitHub and deploy on Vercel.

## Structure

```
index.html          Main page (all sections)
privacy.html         Privacy Policy
terms.html            Terms of Use
assets/style.css      All styles (design tokens at the top)
assets/script.js       Language toggle, mobile nav, scroll reveal, contact form
assets/img/            Logo, favicons, OG share image
robots.txt
sitemap.xml
site.webmanifest
```

## Before you deploy — replace these placeholders

Search the project for these and update them once you have real values:

| Placeholder | Where | Replace with |
|---|---|---|
| `https://www.adberriesandmore.com` | `index.html`, `privacy.html`, `terms.html`, `robots.txt` | Your real domain (or your `*.vercel.app` URL until you buy one) |
| `info@adberriesandmore.com` | `index.html` (contact section, footer, JSON-LD), `script.js` | Real inbox to receive quote requests |
| `<!-- <meta name="google-site-verification" ... /> -->` | `index.html` `<head>` | Uncomment and paste the code Google Search Console gives you |

Everything else (address, phone `+1 956-212-3503`, PACA license `#PACA20210572`, owner
LinkedIn) is already filled in with real info you provided.

## Deploy: GitHub → Vercel

```bash
git init
git add .
git commit -m "AD Berries & More — site v1"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Then in Vercel: **New Project → Import** your GitHub repo → Framework Preset: **Other**
(no build command, no output directory needed — it's static) → Deploy.

Once deployed, if you want the root of the domain to serve `index.html` (it will by
default on Vercel), you're done. If you later buy a custom domain, add it in
Vercel → Project → Settings → Domains, then update the placeholders above.

## Connecting Google Search Console (once you share the verification info)

1. Add the property in Search Console using your final domain.
2. Google will give you either an HTML tag or an HTML file.
   - **HTML tag**: paste it into the commented `<meta name="google-site-verification">`
     line in `index.html` `<head>` and uncomment it.
   - **HTML file**: drop the file Google gives you into this folder's root (next to
     `index.html`) and it will be served automatically.
3. Redeploy, click verify in Search Console, then submit `sitemap.xml`.

## Notes on the language toggle

The EN/ES toggle shows/hides duplicated `<span data-i18n="en">` / `<span data-i18n="es">`
content client-side — good for a fast MVP, but Google will typically only index whichever
language is set as default (English) since it's one URL. If SEO in Spanish becomes a
priority later, the next step is splitting into `/en/` and `/es/` routes with `hreflang`
tags — happy to help with that when you're ready.

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

# LightSplitters Media — website (MVP v1)

Angular 22 workspace with two apps:

| App | What it is | Output |
|---|---|---|
| `lightsplitters-web` | lightsplitters.com — home, weddings, portraits (people & pets), family albums, prints, contact | Every route **prerendered to static HTML** (`outputMode: "static"`) — no server |
| `couple-site` | Template for `<slug>.lightsplitters.com` — wedding sites **and** family albums (`"kind": "album"` in `site.json`) | One SPA build shared by every client; each one only adds `site.json` + `photos/` |

The brand is **LightSplitters Media** (not "Photography") so video and other services can be added later.
A new line of business is a new entry in `SERVICES` (`src/app/content/site-content.ts`) plus a route in
`src/app/app.routes.ts` that reuses `ServicePage`; the services grid adapts to the count.

## Quick start

```bash
npm install
npm run photos          # re-copies web-sized photos from "LightSplitters Photos/_web" into public/images
                        # and fills projects/couple-site/sample*/photos from the slugs in each site.json
npm start               # main site  → http://localhost:4200
npm run start:couple    # couple site  → http://localhost:4300 (uses projects/couple-site/sample/)
npm run start:album     # family album → http://localhost:4301 (uses projects/couple-site/sample-album/)
npm run build           # both apps → dist/
```

Requires Node **22.22.3+ or 24.15+**.

## Where things live

```
src/styles/_tokens.scss      design tokens (colors, type, breakpoints) — shared by both apps
src/app/content/             all copy, prices, packages, photos — edit here, not in components
src/app/shared/              reusable components (below)
src/app/pages/               home, weddings, service-page (portraits), family-album, prints, contact, not-found
projects/couple-site/        client template: wedding-site + album-site (+ sample/ and sample-album/ for local dev)
infra/cloudfront/            CloudFront Function: subdomain → S3 folder
infra/lambda/contact/        contact form → SES
scripts/                     sync-photos, couple-photos, deploy, new-couple-site
```

### Reusable components (`src/app/shared/`)

| Selector | Purpose |
|---|---|
| `ls-service-card` | Selectable card; on mobile (≤767px) becomes a tap-to-expand panel |
| `ls-service-detail` | Desktop detail panel for the selected service |
| `ls-services-section` | Cards + detail wired together (selection state lives here) |
| `ls-package-card` | Selectable wedding package; shows the couple-website line when the add-on is on |
| `ls-toggle-switch` | Add-on toggle (`[(checked)]`) |
| `ls-gallery-tile` / `ls-gallery-grid` / `ls-lightbox` | Masonry grid with filter chips, native `<dialog>` lightbox, ←/→/Esc, optional full-size download link |
| `ls-responsive-image` | `<picture>` with WebP + JPEG at 1200/2400px, crop focus per photo |
| `ls-contact-form` | Reactive form with honeypot; posts JSON to `environment.contactEndpoint` |
| `ls-site-header` / `ls-site-footer` / `ls-logo` | Chrome, mobile menu, prism mark |
| `ls-page-intro` / `ls-section-heading` / `ls-check-list` | Layout primitives |

## Before launch — fill the placeholders

Search the project for `[` to find any placeholder. Nothing was invented.
Then set `contactEndpoint` in `src/environments/environment.ts` (Formspree URL to start) and paste your
Stripe Payment Link URLs into `PRINT_OPTIONS`.

## AWS setup (one time, low cost)

1. **Budget alert first** — Billing → Budgets → Create budget → Monthly cost, e.g. $5, email alert at 80%.
2. **S3** — one private bucket (e.g. `lightsplitters-site`), Block Public Access **on**.
3. **ACM (region us-east-1)** — request one certificate for `lightsplitters.com` **and** `*.lightsplitters.com`; validate via Route 53 DNS.
4. **CloudFront** — origin = the bucket with **Origin Access Control** (let it update the bucket policy).
   - Alternate domain names: `lightsplitters.com`, `www.lightsplitters.com`, `*.lightsplitters.com`; certificate from step 3.
   - Default root object: `index.html`. Viewer protocol: redirect HTTP→HTTPS. Cache policy: CachingOptimized.
   - Functions → create `subdomain-router` from `infra/cloudfront/subdomain-router.js`, publish, attach to the default behavior as **Viewer request**.
   - Error pages: 403 and 404 → `/404/index.html`, response code 404.
5. **Route 53** — A + AAAA **alias** records to the distribution for `lightsplitters.com`, `www`, and `*`.
6. **Contact form** — Lambda `lightsplitters-contact` (us-east-1) behind a Function URL, role `lightsplitters-contact-lambda`, SES domain identity `lightsplitters.com` (DKIM in Route 53). Redeploy code with `cd infra/lambda/contact && zip -j /tmp/contact.zip index.mjs && aws lambda update-function-code --function-name lightsplitters-contact --zip-file fileb:///tmp/contact.zip`. SES is in sandbox: recipients must be verified identities until production access is granted.

Deploy: `LS_BUCKET=lightsplitters-site LS_DISTRIBUTION=E275QSC5SBLBRY npm run deploy`

### Bucket layout

```
/index.html, /weddings/index.html, … /images/…   main site
/sites/_template/…                               shared client-site JS/CSS
/sites/thesmiths/index.html, site.json, photos/  one folder per couple
/sites/rivera-album/…                            one folder per family album ("kind": "album")
```

New couple: `LS_BUCKET=… bash scripts/new-couple-site.sh thesmiths ./couples/thesmiths` — the wildcard DNS
and certificate mean no AWS changes per couple. The script first runs `scripts/couple-photos.sh`, which copies
every photo slug referenced in `site.json` from the `_web` folder into `photos/` and refuses to publish if one
is missing, so `site.json` and the uploaded photos can't drift apart.

Family albums (the `/family-album` service) use the same script and bucket layout: write a `site.json` with `"kind": "album"`
(see `projects/couple-site/sample-album/`), put the reproduced photos in `photos/` as `{slug}-{1200|2400}.{webp|jpg}`,
and publish with `new-couple-site.sh <slug> <folder>`. The viewer offers full-size downloads when `downloads` is true;
`uploads.enabled` turns on the add-photos panel once the v2 upload backend exists.

Retired main-site URLs are 301'd in `infra/cloudfront/subdomain-router.js` (`REDIRECTS`, e.g. `/pets` → `/portraits`, `/digitizing` → `/family-album`);
republish the CloudFront Function after editing it.

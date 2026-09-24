# LightSplitters Media — website

Source for [lightsplitters.com](https://lightsplitters.com) and the client sites at `<slug>.lightsplitters.com`.
Angular 22 workspace, standalone components, signals, OnPush. Two apps:

| App | What it is | Output |
|---|---|---|
| `lightsplitters-web` | The main site: home/portfolio, weddings, portraits, family album, prints & framing, contact | Every route **prerendered to static HTML** (`outputMode: "static"`); no server |
| `couple-site` | Template for client sites: wedding websites **and** family albums (`"kind": "album"` in `site.json`) | One SPA build shared by every client; each client only adds `site.json` + `photos/` |

The brand is **LightSplitters Media**, not "Photography", so video and other services can be added later.
A new line of business is a new entry in `SERVICES` (`src/app/content/site-content.ts`) plus a route in
`src/app/app.routes.ts`, either reusing `ServicePage` (as portraits does) or with its own page (as family album does).
The services grid adapts to the count.

## Quick start

Requires Node **22.22.3+ or 24.15+** and the photo library at `/Volumes/Storage Hot/LightSplitters Photos`.

```bash
npm install
npm run photos          # copies web-sized photos from "LightSplitters Photos/_web" into public/images
                        # and fills projects/couple-site/sample*/photos from the slugs in each site.json
npm start               # main site    → http://localhost:4200
npm run start:couple    # wedding site → http://localhost:4300 (projects/couple-site/sample/)
npm run start:album     # family album → http://localhost:4301 (projects/couple-site/sample-album/)
npm run build           # both apps → dist/
```

`public/images/` and the sample `photos/` folders are git-ignored; run `npm run photos` after cloning.

## Project layout

```
src/styles/_tokens.scss      design tokens (colors, type, breakpoints), shared by both apps
src/app/content/             all copy, prices, packages, photos: edit here, not in components
src/app/shared/              reusable components (table below)
src/app/pages/               home, weddings, service-page (portraits), family-album, prints, contact, not-found
src/environments/            contactEndpoint (Lambda Function URL), bookingUrl (v2)
projects/couple-site/        client template: wedding-site + album-site, plus sample/ and sample-album/ for local dev
infra/cloudfront/            CloudFront Function: subdomain → S3 folder, plus redirects for retired URLs
infra/lambda/contact/        contact form → SES
scripts/                     sync-photos, couple-photos, deploy, new-couple-site
```

### Reusable components (`src/app/shared/`)

| Selector | Purpose |
|---|---|
| `ls-service-card` | Selectable card; on mobile (≤767px) becomes a tap-to-expand panel |
| `ls-service-detail` | Desktop detail panel for the selected service |
| `ls-services-section` | Cards + detail wired together (selection state lives here) |
| `ls-package-card` | Selectable wedding package; shows the couples-website line when the add-on is on |
| `ls-toggle-switch` | Add-on toggle (`[(checked)]`) |
| `ls-gallery-tile` / `ls-gallery-grid` / `ls-lightbox` | Masonry grid with filter chips, native `<dialog>` lightbox, ←/→/Esc, optional full-size download link |
| `ls-responsive-image` | `<picture>` with WebP + JPEG at 1200/2400px, crop focus per photo |
| `ls-contact-form` | Reactive form with honeypot; posts JSON to `environment.contactEndpoint` |
| `ls-site-header` / `ls-site-footer` / `ls-logo` | Chrome, mobile menu, prism mark |
| `ls-page-intro` / `ls-section-heading` / `ls-check-list` | Layout primitives |

## Editing content

Everything a visitor reads lives in `src/app/content/`:

- **`site-content.ts`**: business details (`BIZ`), the `SERVICES` list that drives the home page cards and each
  service page, wedding `PACKAGES` and the couples-website add-on, the `FAMILY_ALBUM` page (pricing tiers, the
  three "how it works" steps, the example album), and `PRINT_OPTIONS`.
- **`photos.ts`**: every photo the main site uses, keyed by a short name. Each entry has the file `slug`, alt text,
  orientation, a `focus` point for cropping, and an optional `category`. Photos with a category appear in the
  portfolio grid; photos without one (such as the copy stand shot) are used only where referenced.
- **Page headlines and ledes** are the exception: each page's intro sentence and section headings sit in its
  component under `src/app/pages/` (the home hero is in `home.html`). Everything below the intro comes from content.

Prints use Stripe Payment Links, with no custom cart. Each entry in `PRINT_OPTIONS` shows an **Order** button
only when its `paymentLink` is set; otherwise it shows the price text and points people to the contact form.

### Photos

Originals live in `/Volumes/Storage Hot/LightSplitters Photos` and are never modified. Web copies go in its
`_web/` folder as `{slug}-{1200|2400}.{webp|jpg}` (four files per photo). `npm run photos` copies them into the
site. Retired photo slugs can stay in `_web/`; only slugs referenced from `photos.ts` or a `site.json` are used.

## Client sites

Every client site is a folder in the S3 bucket under `sites/<slug>/` served at `<slug>.lightsplitters.com`.
The wildcard DNS record and certificate mean no AWS changes per client.

```
/index.html, /weddings/index.html, … /images/…   main site
/sites/_template/…                               shared client-site JS/CSS
/sites/thesmiths/index.html, site.json, photos/  one folder per wedding
/sites/rivera-album/…                            one folder per family album ("kind": "album")
```

**Publish or update a site:** `LS_BUCKET=lightsplitters-site bash scripts/new-couple-site.sh <slug> <folder>`.
The folder holds a `site.json` (see the two samples in `projects/couple-site/`). The script first runs
`scripts/couple-photos.sh`, which copies every photo slug the `site.json` references from `_web/` into `photos/`
and refuses to publish if one is missing, so the JSON and the uploaded photos can't drift apart.

- **Wedding website** (`kind` omitted or `"wedding"`): names, date, venue, story, events, gallery, guest uploads.
- **Family album** (`"kind": "album"`): title, subtitle, intro, cover photo, gallery. `downloads: true` adds a
  full-size download link in the lightbox. `uploads.enabled` turns on the add-photos panel once the v2 upload
  backend exists.

`npm run deploy` refreshes `index.html` in every existing client folder so they pick up the new template hashes.

## Infrastructure

Everything is in us-east-1 and kept deliberately small: S3 (private, Origin Access Control) + CloudFront +
Route 53 + an ACM wildcard certificate.

| Resource | Name / ID |
|---|---|
| S3 bucket | `lightsplitters-site` |
| CloudFront distribution | `E275QSC5SBLBRY` (aliases: apex, `www`, `*.lightsplitters.com`) |
| CloudFront Function | `lightsplitters-subdomain-router` (viewer request, from `infra/cloudfront/subdomain-router.js`) |
| Contact form | Lambda `lightsplitters-contact` behind a Function URL, sending through SES |

**Router function.** Maps `<slug>.lightsplitters.com` to `sites/<slug>/`, redirects `www` to the apex, rewrites
directory URLs to `index.html`, and 301s retired main-site URLs listed in `REDIRECTS`
(`/pets` → `/portraits`, `/digitizing` → `/family-album`). After editing it:

```bash
ETAG=$(aws cloudfront describe-function --name lightsplitters-subdomain-router --query ETag --output text)
NEW=$(aws cloudfront update-function --name lightsplitters-subdomain-router --if-match "$ETAG" \
  --function-config Comment="subdomain router + redirects",Runtime=cloudfront-js-2.0 \
  --function-code fileb://infra/cloudfront/subdomain-router.js --query ETag --output text)
aws cloudfront publish-function --name lightsplitters-subdomain-router --if-match "$NEW"
```

**Contact Lambda.** The recipient address is set in the function's environment variables. SES is still in the
sandbox, so recipients must be verified identities until production access is granted. Redeploy code with:

```bash
cd infra/lambda/contact && zip -j /tmp/contact.zip index.mjs && \
  aws lambda update-function-code --function-name lightsplitters-contact --zip-file fileb:///tmp/contact.zip
```

**Error pages.** CloudFront maps S3 403/404 to `/404/index.html` with a real 404 status.

## Deploy

```bash
LS_BUCKET=lightsplitters-site LS_DISTRIBUTION=E275QSC5SBLBRY npm run deploy
```

Builds both apps, syncs the main site (hashed assets and images cached for a year, HTML always revalidates),
syncs the client-site template, refreshes every client folder's `index.html`, and invalidates CloudFront.
If `infra/cloudfront/subdomain-router.js` changed, publish the function first (above). If a sample `site.json`
changed, republish that sample with `new-couple-site.sh`.

## Roadmap

- **v1 (live):** home/portfolio, weddings, portraits, family album, prints, contact, wedding and album client sites.
- **v2:** guest and family photo uploads (S3 presigned URLs), upload by email (SES inbound → S3 → Lambda),
  private client galleries, booking embed (`bookingUrl` in `environment.ts`), automatic resize/watermark,
  Stripe Payment Links for prints.

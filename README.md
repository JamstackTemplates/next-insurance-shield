# Lighthouse Cover Insurance (`next-insurance-shield`)

A Jamstacks Next.js static website template for an independent coastal insurance broker — **Lighthouse Cover Insurance** on the Portland, Maine waterfront — designed around nautical charts, red-and-white daymarks and the official *Light List*.

> **Sample template notice:** Lighthouse Cover Insurance, its team, panel insurers and contact details are fictitious gallery sample content. Replace them with your real details before publishing a live business website.

## Local preview and checks

Local development requires **Node 24 or later** and npm:

```sh
npm ci
npm run dev
```

Run tests, TypeScript checks and the static export build:

```sh
npm run check
npm start
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: Portland Head hero scene, broker numerals band, Light List preview, 6-buoy claims teaser, direct-vs-broker teaser, insurer signal-flag halyard, office tide-table hours and `InsuranceAgency` JSON-LD |
| `/cover/` | The Light List: all personal (`LL-1xx`) and business (`LL-2xx`) cover lines with Personal/Business filter, expandable coverage/exclusions/insurers and specialist-market note |
| `/claims/` | Claims help: emergency strip, 6-step buoyed claims course, keeper's checklist, claims advocate profile and native `<details>` FAQs |
| `/why-a-broker/` | Direct vs broker chart and comparison ledger, compensation transparency notice, keepers' log team list and honest note on when going direct is fine |
| `/contact/` | Cover-review enquiry form (hosted Jamstacks component when configured; visible email fallback otherwise), sensitive-details caution, office tide-table hours and Custom House Wharf map |
| `/404.html` | "Off the chart" static error page with links back to Home, Cover and Contact |

## Make it yours (file ownership)

Edit page-specific copy directly in the route file, and edit shared/structured collections in `content/`:

| File | Owns | Common owner edits |
| --- | --- | --- |
| `content/business.ts` | Business name, tagline, email, phone, address, service area, 7-day `hours`, Contact guidance and legal lines | Phone number, office hours, service area, email |
| `content/cover.ts` | The Light List (`coverTypes`): `id`, `listNo`, `name`, `audience`, `summary`, `covers`, `watchFor`, `goodFor`, `placement`, `insurers`, `featured`, `available` | Toggle `available: false` to mark *"Not currently placing — ask us"*, update `insurers`, change the 5 `featured` entries, or add a new line |
| `content/insurers.ts` | Fictitious panel insurers (`id`, `name`, unique signal `flag`). Lines written by each insurer are derived automatically from `content/cover.ts` | Add/rename panel carriers (ensure each is referenced by at least one cover type) |
| `content/claims.ts` | Ordered 6-step claims course, "What to gather" checklist, urgent notice and claims FAQs | Update emergency guidance, checklist items or FAQs |
| `content/broker.ts` | Direct-vs-broker comparison rows, compensation copy and keepers' log `team` list (`specialties` validated against `content/cover.ts`) | Update team members, roles and specialties |
| `app/page.tsx` | Home page headings, introductions and calls to action | Edit Home copy directly as JSX children of section components |
| `app/cover/page.tsx` | Cover page head, specialist-market note and closing copy | Edit Cover page prose |
| `app/claims/page.tsx` | Claims page head, "What we do for you" prose and closing CTA | Edit Claims page prose |
| `app/why-a-broker/page.tsx` | Why-a-broker page head, commission footnote and "When going direct is fine" note | Edit explainer prose |
| `app/contact/page.tsx` | Contact page layout combining `content/business.ts`, `JamstacksSupportForm`, `TideTableHours` and `GoogleMap` | Edit Contact layout or guidance labels |
| `components/site-header.tsx` | Shared navigation, cover review link and light, dark or system theme selector | Edit header navigation or controls |
| `site.config.json` | Public site `name`, `description`, `domain`, `timeZone` (`America/New_York`) and `jamstacks` integration (provisioner-managed shape; keep business data out) | Rename site, set custom domain and `jamstacks.siteId` |
| `app/tailwind.input.css` | Light, automatic-dark (`prefers-color-scheme: dark`) and explicit-dark (`.dark`) palette tokens, chart textures, animations, Jamstacks form/toggle mappings and print styles | Adjust palette tokens or motion |
| `lib/structured-data.ts` | `InsuranceAgency` JSON-LD derived from `content/business.ts` | Keep aligned with `content/business.ts` |
| `app/sitemap.ts` | Public route list for static `sitemap.xml` | Add routes here when adding new pages |

### Example owner edit: pause a cover line and update insurers

In `content/cover.ts`:
1. Set `available: false` on the `boat` entry — `/cover/` keeps the row visible with the badge **"Not currently placing — ask us"** and updates its mono characteristic to `PERSONAL · ASK US`.
2. Add `'kennebec'` to `homeowners.insurers` — Homeowners displays the Kennebec Fire & Marine signal pennant inline and updates its insurer count automatically.
3. Run `npm run check` to validate every ID, prefix, insurer reference and rebuild the static export.

## Typography and licences

All fonts are self-hosted via Fontsource packages (no external font CDN requests):

- **Young Serif** (`@fontsource/young-serif`) — SIL Open Font License 1.1 (display headings, numerals, wordmark)
- **Public Sans Variable** (`@fontsource-variable/public-sans`) — SIL Open Font License 1.1 (body copy)
- **IBM Plex Mono** (`@fontsource/ibm-plex-mono`, weights 400 and 500) — SIL Open Font License 1.1 (Light List numbers, coordinates, tide-table hours and mono labels)

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`).

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID shows the email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` (`America/New_York`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap render **only** on `/contact/` when configured, with `hello@lighthousecover.example` always visible alongside. Navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Project-path build verification

To test a subdirectory deployment (such as GitHub Pages project paths):

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Gallery publishing assets

`jamstacks/` holds optional gallery-only metadata and screenshots (`jamstacks/config.json`, `jamstacks/home-light.jpg`, `jamstacks/home-dark.jpg`, `jamstacks/screenshots.json`). Ordinary customer builds, tests and GitHub Pages workflows never import or read it, and customers can delete `jamstacks/` safely. Run its check separately with:

```sh
node --test jamstacks/config.test.mjs
```

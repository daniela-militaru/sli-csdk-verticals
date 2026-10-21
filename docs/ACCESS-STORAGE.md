# Access Self Storage

Isolated collection for the Access Self Storage demo.

| | |
|---|---|
| Folder | `industry-verticals/access-storage` |
| Rendering host | `access-storage` |
| Sitecore site | `access-storage` |
| Content path | `/sitecore/content/access-storage/access-storage` |
| Module | `access-storage-scs` |
| Industry skill | `industry-storage` |

Reference pages:

- https://www.accessstorage.com/
- https://www.accessstorage.com/self-storage
- https://www.accessstorage.com/our-stores

Images belong in this site's Media Library. Do not hotlink accessstorage.com. Individual store pages are not built; store names stay as content on the homepage and the stores page.

Pages:

| Route | Item |
| --- | --- |
| `/` | Home |
| `/self-storage` | Self storage |
| `/our-stores` | Our stores |
| `/south-london` | South London |
| `/south-london/access-self-storage-battersea` | Battersea store |

Components, in `src/components/`: `header`, `footer`, `promo-bar`, `quote-hero`, `trust-bar`, `offer-band`, `how-it-works`, `content-split`, `use-case-grid`, `link-row`, `expandable-copy`, `faq-list`, `page-hero`, `rich-text`, `benefit-list`, `card-carousel`, `quote-cta`, `store-finder`, `store-hero`, `store-facts`, `unit-sizes`, `nearby-stores`.

The Battersea store page reuses the header, footer, rich text, FAQ, link row, quote call to action, and expandable copy. `store-hero`, `store-facts`, `unit-sizes`, and `nearby-stores` are the store-specific components.

The header, promo bar, and footer are placed on each page. Pages can also drag these renderings from the Access Storage group under Available Renderings. Quote forms are visual only and link to Our stores. There is no live postcode lookup, account sign-in, or cookie banner.

## CDP profile

A floating customer profile is mounted from `src/Layout.tsx`. It follows the Ashurst profile and does not call a CDP tenant. The browser stores the guest, visits, page views, quote searches, and referral in `localStorage` under `access-cdp-*`.

Open it with the button at the bottom right, or add `?cdp=1` to the URL. The homepage, Self storage, and Our stores add topic and industry affinities. Typing in a quote form records a search. Subscribe stores an email on this browser. Reset browsing profile clears that local session.

Publish the items in Sitecore before the routes appear on Experience Edge. The editing host in Deploy must be named `access-storage`. Local preview needs the Edge Context ID and editing secret from Deploy Developer Settings.

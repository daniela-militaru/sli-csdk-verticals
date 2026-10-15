# Ashurst Perkins Coie

Law-firm demo that follows the public Ashurst Perkins Coie site. Pages so far are the homepage, the all-insights listing, three insight articles, and the Financial Services and Technology sector pages.

| | |
| --- | --- |
| Folder | `industry-verticals/ashurst` |
| Brand | Ashurst Perkins Coie |
| Deploy key | `ashurst` |
| Sitecore site | `ashurst` |
| Content path | `/sitecore/content/ashurst/ashurst` |
| Serialization | `ashurst-scs` in `authoring/items/ashurst/` |
| Industry skill | [industry-healthcare](../.cursor/skills/industry-healthcare/SKILL.md) for people pages; insight articles use the retail article listing and detail pattern |
| Images | This site’s Media Library. Content Hub is not connected. |

Reference pages:

- https://www.ashurstperkinscoie.com/
- https://www.ashurstperkinscoie.com/en/insights/all-insights/
- https://www.ashurstperkinscoie.com/en/insights/data-bytes-au-key-australian-privacy-updates-so-far-in-2026/
- https://www.ashurstperkinscoie.com/en/insights/what-public-companies-need-to-know-about-the-sec-innovation-exemption-for-tokenized-stock/
- https://www.ashurstperkinscoie.com/en/insights/asics-first-comprehensive-review-of-sustainability-reports/
- https://www.ashurstperkinscoie.com/en/sectors/financial-services/
- https://www.ashurstperkinscoie.com/en/sectors/technology/

Run locally after `.env.local` is filled from Deploy portal Developer settings:

```powershell
cd industry-verticals/ashurst
npm run dev
```

Do not copy item IDs or components from the other verticals. Local run uses `http://localhost:3010` in this session. Insights search filters the articles on this site.

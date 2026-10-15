export type InsightRecord = {
  title: string;
  tag: string;
  date: string;
  summary: string;
  href: string;
};

export const insights: InsightRecord[] = [
  {
    title: 'Data Bytes AU: Key Australian privacy updates so far in 2026',
    tag: 'Legal development',
    date: '2026-10-13',
    summary:
      'OAIC decisions, Privacy Act reforms, cyber security, facial recognition, automated decisions, and online safety.',
    href: '/insights/data-bytes-au-key-australian-privacy-updates-so-far-in-2026',
  },
  {
    title:
      'What public companies need to know about the SEC’s Innovation Exemption for tokenized stock',
    tag: 'Legal development',
    date: '2026-10-02',
    summary:
      'Notice, objection rights, and practical steps for public companies after the SEC’s tokenized-stock exemption.',
    href: '/insights/what-public-companies-need-to-know-about-the-sec-innovation-exemption-for-tokenized-stock',
  },
  {
    title: "ASIC's first comprehensive review of sustainability reports",
    tag: 'Legal development',
    date: '2026-10-07',
    summary:
      'Report 839 observations for Group 1 entities and the action items boards and in-house counsel should treat as a checklist.',
    href: '/insights/asics-first-comprehensive-review-of-sustainability-reports',
  },
  {
    title: 'FERC Meeting Agenda Summaries',
    tag: 'Legal development',
    date: '2026-10-14',
    summary:
      'Brief summaries of the agenda items for the Federal Energy Regulatory Commission’s open meetings.',
    href: '/insights/all-insights',
  },
  {
    title: '"De facto Directors": Who are they?',
    tag: 'Legal development',
    date: '2026-10-14',
    summary:
      'Key lessons from Eastside Formwork Pty Ltd v Stejc on directors’ duties and liquidator recoveries.',
    href: '/insights/all-insights',
  },
  {
    title: 'Data Bytes 69: Your EMEA Data Privacy Update for October 2026',
    tag: 'Legal development',
    date: '2026-10-15',
    summary: 'Autumn edition of Data Bytes, with the EU Cyber Resilience Act in focus.',
    href: '/insights/all-insights',
  },
];

export function filterInsights(query: string): InsightRecord[] {
  const needle = query.trim().toLowerCase();
  const matched = needle
    ? insights.filter((item) =>
        `${item.title} ${item.summary} ${item.tag}`.toLowerCase().includes(needle)
      )
    : insights;
  return [...matched].sort((a, b) => b.date.localeCompare(a.date));
}

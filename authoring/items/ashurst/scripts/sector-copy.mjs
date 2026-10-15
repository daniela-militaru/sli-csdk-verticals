const p = (text) => `<p>${text}</p>`;
const ul = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

export const discover = 'Discover more';

export const financialIntro = [
  p('The financial services sector is undergoing groundbreaking change driven by new regulations, disruptive technologies, and the convergence of traditional and emerging finance.'),
  p('Institutions and innovators alike are navigating a common challenge: how to launch, operate, and grow financial products and services in an environment where legal frameworks are evolving as quickly as the market itself.'),
  p('That challenge requires a different kind of law firm.'),
  p('We help clients outpace change because we are trailblazers in both financial services law and the transformative technologies they adopt, including AI, digital assets, tokenization, and blockchain infrastructure.'),
  p('Our lawyers advise on the full range of business opportunities and challenges our clients encounter, from regulatory counseling and strategic acquisitions to financing structures, product launches, disputes, and investigations. We work alongside our Risk Advisory practice to provide practical, commercially grounded approaches to managing risk and driving compliance. Through Ashurst Perkins Coie Advance, our technology professionals deliver advanced collaboration tools, automation, and cost-effective legal services that keep pace with our clients’ ambitions.'),
].join('');

export const technologyIntro = [
  p('In an age of accelerating technological change, informed legal advice is essential.'),
  p('Technology moves faster than the rules that govern it. We help you stay ahead in an ever-evolving environment. We advise the world\'s leading technology companies, including major platform and cloud providers, and businesses that depend on their products.'),
  p('Our strategic counsel delivers measurable results across the technology life cycle, from ideation and product build to launch, commercialization, scaling, and course-correction, so clients can stay focused on what they do best: innovate. We support the full range of needs at each stage of growth, including strategic partnerships and acquisitions, product innovation and marketplace development, monetization strategies, infrastructure expansion, IP strategy, protection and enforcement, regulatory and risk management, and dispute resolution.'),
  p('Our approach is strategic, multidisciplinary, and built around the domains where our clients are investing and innovating:'),
  ul([
    '<strong>AI and frontier tech:</strong> Generative AI, machine learning, automated decisioning, robotics, and autonomous systems',
    '<strong>Cloud:</strong> IaaS/PaaS, compute, and storage and data management',
    '<strong>Digital infrastructure:</strong> Data centers and next-generation connectivity',
    '<strong>Digital platforms and marketplaces:</strong> E-commerce, consumer platforms, social and communications services, product and service marketplaces, and digital ecosystems',
    '<strong>Enterprise software and solutions:</strong> SaaS, business applications, and workflow platforms',
    '<strong>Chips and intelligent hardware:</strong> Semiconductors, connected devices, IoT, and identity and biometrics',
    '<strong>Cybersecurity and identity:</strong> Security products and services, IAM, zero trust, and trust and safety tooling',
    '<strong>Data platforms:</strong> Data infrastructure, data governance, analytics/BI, and data sharing ecosystems',
    '<strong>Fintech and digital payments:</strong> Payments rails, wallets, embedded finance, and digital banking infrastructure',
    '<strong>Gaming, media entertainment, and sports:</strong> Games, devices, marketplaces, content development and distribution platforms, music, streaming, digital media and interactive entertainment',
    '<strong>Autonomous, robotic systems, and mobility:</strong> Autonomous vehicles, connected vehicle ecosystems, and infrastructure, including satellite and space',
  ]),
  p('We are proud to advise clients at the forefront of evolving technologies and business models, reshaping business practices and transforming the way people live and work.'),
  p('As regulatory demands intensify across privacy, cybersecurity, AI governance, platform accountability, and competition, antitrust and trade, we help you anticipate what’s coming, navigate uncertainty, and execute with confidence. That same experience positions us to help your organization, no matter the industry, solve its most important regulatory challenges.'),
].join('');

const item = (title, teaser, body) => ({ title, teaser, body: body.map(p).join('') });

export const financialWho = [
  item(
    'Banks',
    '',
    [
      'Our industry-leading practice serves clients across the full range of transactional, regulatory, and strategic issues shaping the sector. We act on complex multijurisdictional financings, capital markets mandates, and M&A transactions while advising on prudential and conduct requirements, supervisory engagement, recovery and resolution planning, enforcement defense, and the increasingly digital regulatory environment.',
      'We work with banks as they structure, capitalize, and operate across varied jurisdictions, transform technology infrastructure, develop digital asset strategies, and respond to operational resilience requirements. Our practice spans the world’s major financial centers, including London, New York, Hong Kong, Singapore, Dubai, Frankfurt, Paris, Tokyo, and Sydney. We act for lenders and borrowers, issuers and investors, regulated institutions, counterparties, nonbank lenders, and specialty finance clients. Our team supports licensing, market entry, product structuring, funding arrangements, and ongoing compliance across the United States, the United Kingdom, Europe, Asia-Pacific, and the Middle East, combining legal advice, risk consulting, and advanced legal technology.',
    ]
  ),
  item(
    'Blockchain and digital assets',
    '',
    [
      'We have been shaping the blockchain and digital asset industry since 2010, when the industry players could all fit in one room.',
      'Our market-leading digital assets and blockchain practice advises across the full spectrum of legal complexity. We are go-to advisers for regulatory classification, licensing strategy, product structuring, and custody frameworks. When stakes are high, we advocate for our clients in regulatory enforcement matters and disputes. We serve established financial institutions entering the digital asset market and native digital asset businesses scaling into regulated environments.',
    ]
  ),
  item(
    'Investment and asset management',
    '',
    [
      'We represent an array of clients, from investment funds to financial institutions and the corporate treasurers of public corporations, in the negotiation of intricate trading documentation with dealer counterparties. We also support clients from origination through execution, including post-trade compliance and dispute resolution. Our team includes lawyers who focus on tax, ERISA, and securities enforcement, offering experienced advice about regulatory and enforcement matters. Our experience covers equity capital markets, debt capital markets, structured finance, derivatives, leveraged finance, and securitization.',
      'We advise on fund formation and structuring, M&A and portfolio transactions, and cross-border investment strategies across private equity, private credit, infrastructure, and real assets.',
    ]
  ),
  item(
    'Fintech, payments, and infrastructure',
    '',
    [
      'Our integrated team combines experience across financial regulation, technology and commercial transactions, IP, cybersecurity, data privacy, and capital markets. This breadth enables us to provide holistic advice that helps clients innovate in a way that is compliant, sustainable, and operationally effective. We do not simply respond to regulatory change; we anticipate it, engaging actively with regulators, policymakers, and industry bodies to provide the forward-looking insight clients need to stay ahead.',
      'We advise fintechs focusing on payments and infrastructure, assisting with licensing and regulatory authorization, product structuring, and bank and scheme partnerships, as well as consumer protection compliance and cross-border expansion. Our cross-disciplinary team advises clients at the intersection of payment systems and market infrastructure, bringing practical insight into the operational design, governance frameworks, contractual structures, and technology systems that support these complex ecosystems.',
    ]
  ),
];

export const financialHow = [
  item(
    'Transacting and raising capital',
    'Global loans, secured transactions, and capital markets',
    [
      'We advise on the full spectrum of capital markets and financing activity, including debt and equity capital markets, structured finance, derivatives, private capital transactions, multijurisdictional leveraged financings, real estate and infrastructure lending, and strategic M&A. Our clients include issuers, underwriters, dealers, and investors across global banking, asset management, and fintech and digital asset markets.',
    ]
  ),
  item(
    'Providing trustee and fiduciary services',
    'Corporate trust and agent capacities',
    [
      'Our corporate trust group represents both domestic and international banks, in their roles as indenture trustee or related agent capacities, in domestic and cross-border financing transactions covering a wide range of asset classes and complex financial instruments.',
    ]
  ),
  item(
    'Advising on M&A',
    'Strategic transactions and corporate advisory',
    [
      'Our team advises on some of the most complex and high-profile transactions in the market. We act for buyers, sellers, targets, and financial advisers. We use our legal, risk consulting, and NewLaw experience, including projects, tax, competition, real estate, finance, disputes, IT, employment, and pensions, to execute end-to-end transaction management.',
    ]
  ),
  item(
    'Running regulated businesses',
    'Regulatory compliance and operations',
    [
      'We support financial institutions and technology-enabled platforms through licensing, market entry, and ongoing operation across regulated environments. Our work includes obtaining regulatory approvals, structuring bank and fintech partnerships, and navigating multijurisdictional expansion.',
      'We advise on financial crime compliance, prudential and conduct regulation, supervisory engagement, and regulatory change. We support governance design, risk management, and operational resilience as businesses scale.',
    ]
  ),
  item(
    'Managing risk and disputes',
    'Disputes, enforcement, and investigations',
    [
      'When regulatory action arises, disputes emerge, or institutions face enforcement scrutiny, we deploy a deep financial services contentious practice. Our work covers commercial litigation and arbitration connected to financial transactions, market conduct, and investment activity, as well as regulatory enforcement defense, government investigations, white-collar matters, and cross-border proceedings.',
      'We act for global banks, asset managers, fintech platforms, and digital asset businesses across securities litigation, derivatives disputes, and regulatory investigations. Our practice spans enforcement defense, civil litigation, arbitration, and crisis response.',
    ]
  ),
  item(
    'Launching and structuring companies',
    'Formation, venture, and growth',
    [
      'We advise founders, sponsors, investors, and financial institutions at the formation and early growth stages of building financial services and fintech businesses. Our work includes venture financings, fund formation, corporate structuring, strategic investments, M&A, and regulatory compliance.',
      'We support the design and launch of regulated financial products and platforms, including payments, lending, digital assets, and embedded finance, from product counseling and licensing strategy through regulatory structuring and commercialization.',
    ]
  ),
  item(
    'Building financial infrastructure',
    'Market infrastructure and digital systems',
    [
      'We advise on the development, operation, and scaling of financial market infrastructure across traditional and blockchain-based systems, including exchanges, clearing systems, payment networks, custody platforms, tokenized financial products, and next-generation settlement systems.',
      'We counsel clients on regulatory classification, licensing strategy, governance, operational design, technology, IP, and commercial frameworks.',
    ]
  ),
  item(
    'Protecting financial privacy and data',
    'Data security, AI, and consumer financial protection',
    [
      'We advise financial institutions and technology-driven financial services companies on financial privacy, data security, and related issues, including laws relating to AI and marketing.',
      'We provide practical, business-focused solutions to help clients mitigate risks and maintain trust when advising on the use of AI in financial products and services, sharing consumer personal data with third parties, structuring financial transactions with privacy risks in mind, and responding to security incidents.',
    ]
  ),
];

export const technologyHow = [
  item(
    'Leading technology counsel',
    '',
    [
      'We are trusted by entrepreneurs, innovators, and established market leaders to guide the legal and risk strategy behind new products, services, and platforms, from early development and data strategy to commercialization, scaling, and exit. We deliver product innovation and marketplace development counsel, regulatory protection and enforcement guidance, and dispute-ready support.',
    ]
  ),
  item(
    'Platform, content, and consumer tech',
    '',
    [
      'We advise companies building and operating consumer-facing platforms and digital ecosystems, including e-commerce and marketplace businesses, social and communications services, adtech and martech, media and entertainment, streaming and interactive experiences, games, sports, and connected products. We help align product design with privacy, IP, content, consumer protection, revenue generation, and platform accountability and safety requirements.',
    ]
  ),
  item(
    'Strategic transactions and growth',
    '',
    [
      'We help technology companies and their investors execute transformative transactions, including M&A, IPOs, financings, joint ventures, and strategic partnerships. Our teams combine industry knowledge with transactional capability so clients can move on high-stakes opportunities while managing regulatory complexity across jurisdictions.',
    ]
  ),
  item(
    'Risk, regulatory, and disputes',
    '',
    [
      'We help clients navigate the shifting regulatory landscape, from AI governance and data protection to cybersecurity, digital advertising, and platform accountability. When disputes arise, we bring the same technology fluency to enforcement actions, IP litigation, and complex cross-border proceedings.',
    ]
  ),
];

export const technologyHighlights = [
  {
    kicker: '',
    title: 'Technology prowess',
    body: p('We pair product-first advice with deep technology fluency, helping you build, launch, and scale with confidence across fast-moving innovation cycles. We are often at the forefront of advising clients on emerging areas of law, helping them address regulatory challenges, identify opportunities, and strengthen their competitive position.'),
  },
  {
    kicker: 'Global',
    title: 'Global experience',
    body: p('With cross-border reach, we help you stay ahead of regulatory and market shifts across innovation, operations, and growth. We can assemble multijurisdictional teams spanning technology development and licensing, commercial partnerships, sourcing, distribution, M&A, IPOs, financing, joint ventures, international trade and tariffs, disputes, tax, and IP protection and enforcement.'),
  },
  {
    kicker: '',
    title: 'Innovation risk management',
    body: p('We help you design resilient legal and risk programs to operationalize your legal obligations so innovation can move forward without disruption.'),
  },
];

export const capabilityGroups = [
  ['For global banks and financial institutions', ['Global Loans', 'Global Markets', 'Capital Markets', 'Financial Regulation', 'Corporate and M&A', 'Restructuring and Special Situations', 'Tax', 'Litigation and Dispute Resolution', 'Regulatory Enforcement', 'International Arbitration', 'Antitrust and Competition']],
  ['For capital markets participants and asset managers', ['Capital Markets', 'Investment Funds', 'Private Capital', 'Corporate and M&A', 'Tax', 'Derivatives and Structured Finance', 'Litigation and Dispute Resolution', 'Regulatory Enforcement', 'Global Loans']],
  ['For fintech, payments, and embedded finance platforms', ['Financial Regulation', 'Payments and Fintech', 'Corporate and M&A', 'Technology Transactions', 'Intellectual Property', 'Cyber and Data Security', 'Labor and Employment', 'Tax', 'Real Estate', 'Infrastructure']],
  ['For digital asset and blockchain businesses', ['Digital Assets and Blockchain', 'Financial Regulation', 'Intellectual Property', 'Corporate and M&A', 'Technology Transactions', 'Infrastructure', 'Litigation and Dispute Resolution', 'Regulatory Enforcement']],
  ['For venture-backed and emerging financial companies', ['Venture Capital and Emerging Companies', 'Corporate and M&A', 'Investment Funds', 'Technology Transactions', 'Intellectual Property', 'Financial Regulation', 'Payments and Fintech', 'Tax']],
  ['For financial market infrastructure providers', ['Financial Regulation', 'Global Payments', 'Digital Assets and Blockchain', 'Infrastructure', 'Technology Transactions', 'Intellectual Property', 'Corporate and M&A', 'Antitrust and Competition']],
  ['For disputes, enforcement, and investigations', ['Litigation and Dispute Resolution', 'Regulatory Enforcement', 'International Arbitration', 'White Collar and Investigations', 'Securities Litigation', 'Antitrust and Competition', 'Cyber and Data Security']],
].map(([title, items]) => ({ title, items: ul(items) }));

export const financialInsights = [
  ['Legal development', 'Data Bytes 69: Your EMEA Data Privacy Update for October 2026', 'October 15, 2026'],
  ['Legal development', 'Can you de-bank on ML/TF risk? Lessons from recent cases', 'October 15, 2026'],
  ['Legal development', 'Antitrust and Competition newsletter: Q3 2026', 'October 15, 2026'],
  ['Legal development', 'Debt Capital Markets Update Q3 2026', 'October 12, 2026'],
  ['Legal development', 'CMA Merger Watch: UK merger control quarterly update (Q3 2026)', 'October 09, 2026'],
  ['Legal development', 'Financial Services SpeedRead: 8 October 2026 edition', 'October 08, 2026'],
];

export const financialNews = [
  ['News', 'Ashurst Perkins Coie advises Pacira BioSciences, Inc. on its $1.65 billion acquisition by Viatris Inc.', 'October 08, 2026'],
  ['News', 'Ashurst Perkins Coie advises PX3 Partners on acquisition of Purified Air', 'October 06, 2026'],
];

export const technologyInsights = [
  ['Legal development', 'An eye on tomorrow: Legal tech is going from niche to norm', 'September 30, 2026'],
  ['Legal development', 'EU Data Act and Data Governance Act: cornerstones of new data ecosystems', 'May 15, 2026'],
  ['Legal development', 'The kids are online: what Australia\'s Children\'s Online Privacy Code means for you', 'May 08, 2026'],
  ['Business Insight', 'Frontier cyber AI: Be alert, but no need to panic if you take action now', 'April 15, 2026'],
];

export const technologyNews = [
  ['News', 'Ashurst Perkins Coie advises Heidi on US$100m Series C financing and US$240 million growth facility', 'October 07, 2026'],
  ['News', 'Ashurst Perkins Coie advises PX3 Partners on acquisition of Purified Air', 'October 06, 2026'],
];

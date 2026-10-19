const p = (text) => `<p>${text}</p>`;
const ul = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const item = (title, teaser, body) => ({ title, teaser, body: body.map(p).join('') });

export const energyIntro = [
  '<h3>Geopolitical realignment, digital transformation, and the demand for secure and sustainable energy sources are reshaping the systems that power economies. Predictable energy development and supply, investable transition technologies, critical minerals, and infrastructure that can withstand climate, social, and regulatory pressure now sit at the center of national strategy and corporate growth.</h3>',
  p('Ashurst Perkins Coie provides end-to-end legal solutions to such challenges, both locally and globally. We lead on regulatory planning and permitting, complex transactions and investments, project development and finance, operational strategy, and high-stakes disputes. We work across energy, infrastructure, and resources, connecting sector knowledge with the firm’s capabilities in regulatory policy, construction, environmental, corporate, litigation, securities, tax, real estate, intellectual property, labor and employment, and insurance recovery.'),
  p('Our clients include sponsors, utilities, producers, developers, public sector bodies, contractors, equity investors, debt financiers, and large energy users. We help move critical projects from concept to operation: structure procurement and public-private interfaces, secure approvals, negotiate commercial frameworks, manage delivery risk, and resolve disputes. The result is advice that is commercial, globally informed, and focused on building secure energy systems, resilient infrastructure, and sustainable growth.'),
].join('');

export const energyHighlights = [
  {
    kicker: '',
    title: 'Secure energy systems',
    body: p('We advise across the energy value chain: production, generation, transport, storage, and consumption. Our work spans renewable and conventional generation and production, traditional energy product logistics, power markets, transmission, storage, alternative fuels, and the commercial frameworks that make new technologies investable at scale.'),
  },
  {
    kicker: '',
    title: 'Resilient infrastructure',
    body: p('We support our clients leading the evolution to integrated digital ecosystems that optimize mobility, sustainability, and resilience. We help public and private clients deliver transport, energy, health, social, and digital infrastructure. From structuring and procurement through financial close, operations, and reform, we optimize the public-private regulatory interface and apply international lessons to local delivery challenges.'),
  },
  {
    kicker: '',
    title: 'Resources for the future',
    body: p('We advise across the mining and resource recovery life cycles for the materials that underpin modern economies, from steel, copper, and alloys to battery metals and critical minerals. We connect our resources with energy, infrastructure, finance, environmental, and disputes capabilities.'),
  },
];

export const energyHow = [
  item('Power—renewable and conventional', '', [
    'We advise on solar, wind, hydroelectric, geothermal, nuclear, and other generation projects throughout the life cycle, including siting, permitting, construction, operation, financing, grid interconnection, offtake, tax incentives, and market participation. We work with utilities, developers, investors, and energy users to buy and sell energy products, bring complex projects to market, and defend them when challenged.',
  ]),
  item('Oil and gas', '', [
    'Our clients span every major oil and gas market, including exploration and production, refining, midstream, and downstream sectors. Our work includes strategic transactions, regulatory and environmental counseling, project development, financing, and complex litigation.',
  ]),
  item('Low carbon solutions', '', [
    'We support clients on hydrogen, battery storage, renewable fuels, waste-to-value, green molecules, carbon capture, and the commercial frameworks needed to scale emerging technologies. Our work spans regulation and incentives, feedstock, offtake, project development, construction, financing, market participation, and disputes.',
  ]),
  item('Resources', '', [
    'We advise every stage of the mine life cycle, from exploration and regulatory approvals to financing, mine development, construction, operations, productivity, shipping, and marketing. We meet our clients with their most important transactions, projects, and disputes, from concept to closure to redevelopment.',
  ]),
  item('Transmission, grids, and digital infrastructure', '', [
    'We help clients develop, finance, regulate, and operate transmission, interconnection, storage, charging, grid-enhancing, and digital infrastructure. Our work includes transmission planning, rate regulation, land use, real estate, environmental review, RTO/ISO processes, market rules, and commercial arrangements for assets that connect supply, demand, and data.',
  ]),
  item('Major infrastructure and PPPs', '', [
    'We advise sponsors, public sector clients, contractors, equity investors, and debt financiers on critical infrastructure worldwide. We support structuring, procurement, privatizations, public-private partnerships, financial close, contract management, operations, and regulatory reform, helping clients deliver resilient assets at speed and at scale.',
  ]),
  item('Transport', '', [
    'We advise clients across the full transport ecosystem, acting for governments, operators, infrastructure managers, manufacturers, asset owners, and investors. Our work covers franchises and operating models, major transport infrastructure, fleet procurement, digitalization, corporate transactions, regulation, financing, and disputes, supporting projects from concept and procurement through to operation, renewal, and market reform.',
  ]),
  item('Defense', '', [
    'We support clients across the defense and security sector, acting for government departments, agencies, prime contractors, technology companies, and investors. Through dedicated experience in major global defense markets, we provide integrated advice on regulatory, transactional, and financing issues, from bid strategy, export controls, and foreign investment screening to infrastructure delivery, cyber compliance, M&amp;A, and disputes.',
  ]),
];

export const energyInsights = [
  ['Video or webinars', 'Nearing Net Zero', 'October 13, 2026'],
  ['Legal development', 'Exit offshore: mitigating disputes risk under double taxation treaties after Tiger Global', 'April 01, 2026'],
  ['Legal development', 'Germany’s national Data Center Strategy', 'March 24, 2026'],
];

export const energyNews = [
  ['News', 'Ashurst Perkins Coie advises Algebris Investments on the acquisition of Vector Renewables', 'October 06, 2026'],
  ['News', 'Ashurst Perkins Coie grows energy transition footprint in London with partner hire', 'October 02, 2026'],
  ['News', 'Ashurst Perkins Coie advises lenders on the limited recourse financing of two solar photovoltaic plants with integrated battery storage in Chad', 'October 01, 2026'],
];

export const danBrown = {
  name: 'Dan Brown',
  role: 'Global Sector Leader, Energy and Infrastructure',
  office: 'Brisbane',
  phone: '+61 7 3259 7149',
  mobile: '+61 401 564 654',
  email: 'dan.brown@ashurstperkins.com',
  linkedIn: 'https://www.linkedin.com/in/projectslawyerdanbrown/',
  headline:
    'Dan helps clients deliver complex energy, resources and infrastructure projects that are reshaping the economies of tomorrow.',
  bio: [
    'Dan Brown is Global Leader, Energy &amp; Infrastructure Industry at Ashurst Perkins Coie.',
    'He advises sponsors, developers, investors and lenders on major energy, resources and infrastructure projects across the Asia-Pacific region.',
    'Dan’s work sits at the center of the systems that power modern economies. He advises on renewable energy, conventional power, transmission, major infrastructure, digital infrastructure, data centers and emerging energy transition technologies.',
    'Clients value Dan for his clear judgement, deep industry knowledge and commercial approach. He helps clients structure projects, manage risk, navigate market and regulatory change, and make confident decisions on complex projects.',
    'As Global Leader of Ashurst Perkins Coie’s Energy &amp; Infrastructure Industry, Dan helps shape the firm’s global sector strategy. He connects teams across markets and ensures Ashurst Perkins Coie brings uncommon insight and experience to clients facing major investment, policy and transition challenges.',
    'Dan’s recognition includes The Australian’s Green List of Australia’s Top 100 Energy Players, Legal 500’s 2026 Green Ambassador recognition, and Best Lawyers recognition for Energy, Construction and Infrastructure.',
  ]
    .map(p)
    .join(''),
  quote: 'The depth of Dan Brown’s industry knowledge is second to none. This has enabled him to provide commercial and creative solutions to issues identified in our deals.',
  quoteSource: 'Client, Chambers Asia-Pacific, Energy and Resources 2026',
  sectors: ul(['Energy &amp; Infrastructure']),
  services: ul([
    'Construction',
    'Projects, Energy, Environment &amp; Resources',
    'Real Estate',
    'Litigation, Investigations &amp; Advisory',
  ]),
  experience: ul([
    '<strong>Ark Energy:</strong> Advised on its investment in a 30% interest in the 923.4MW MacIntyre Wind Farm in Queensland, one of the largest onshore wind farms in the southern hemisphere.',
    '<strong>Ark Energy:</strong> Advising on the procurement phase of the Boomer Green Energy Hub, a wind farm and battery energy storage system supplying approximately 1,150MW to the national grid.',
    '<strong>AMPYR Australia:</strong> Advising on the development of the 300MW/600MWh Bulabul Battery Project in New South Wales.',
    '<strong>CS Energy:</strong> Advised on its acquisition of a 50% interest in the Boulder Creek Wind Farm, including the joint venture arrangements for development, construction and operation.',
    '<strong>Cubico Sustainable Investments:</strong> Advised on the development, operations and joint venture arrangements for the circa A$700 million Wambo Wind Farm Stage 1 and Stage 2.',
    '<strong>EnergyAustralia:</strong> Advised on its joint venture with EDF power solutions Australia to co-develop the Lake Lyell Pumped Hydro Energy Storage project in Lithgow.',
    '<strong>Shell:</strong> Advised on its joint development arrangements for the 500MW/1000MWh Wallerawang 9 BESS in New South Wales.',
    '<strong>Acciona – Brisbane Metro:</strong> Advised on a suite of bespoke construction and procurement contracts for the $900 million Brisbane Metro project.',
  ]),
};

export const danBrownInsights = [
  ['Legal development', 'Australian electricity and gas markets – September 2026 update', 'October 13, 2026'],
  ['Podcasts', 'Nearing Net Zero: Can we really mine our way to net zero?', 'October 13, 2026'],
  ['Podcasts', 'Nearing Net Zero: Data centres and the social license question', 'September 15, 2026'],
  ['Legal development', 'The ESEM is coming', 'September 24, 2026'],
  ['Thought leadership', 'Current Thinking – Exploring the Issues Shaping Our Energy Future in APAC', 'August 24, 2026'],
  ['Legal development', 'Australian electricity and gas markets – August 2026 update', 'September 09, 2026'],
];

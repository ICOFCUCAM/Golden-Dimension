export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  // ----- Article body (used by /news/:slug detail page) -----
  author?: string;
  authorRole?: string;
  body: { type: 'p' | 'h2' | 'quote' | 'list'; text?: string; items?: string[] }[];
  related?: string[]; // slugs of related articles
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'expanding-southeast-asia',
    title: 'Golden Dimensions expands operations across Southeast Asia',
    excerpt:
      'Strategic expansion into key Southeast Asian markets — new offices in Singapore, Jakarta, and Ho Chi Minh City to deepen institutional delivery in the region.',
    category: 'Company News',
    date: 'March 5, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg',
    author: 'Editorial Team',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Golden Dimensions Ltd has opened three new offices in Southeast Asia — in Singapore, Jakarta, and Ho Chi Minh City — extending the firm\'s in-region delivery capability for institutional clients across the APAC corridor.' },
      { type: 'p', text: 'The expansion responds to a growing pipeline of multidisciplinary mandates from regional banks, infrastructure agencies, and telecommunications operators that require partner-level presence on the ground rather than fly-in delivery teams.' },
      { type: 'h2', text: 'Why now' },
      { type: 'p', text: 'The decision reflects a shift the firm has tracked across the region for several years: institutional clients increasingly want delivery partners who carry the same accountability framework across all phases of a programme — and who can do that in-region rather than at distance.' },
      { type: 'quote', text: '"In-region presence isn\'t about having a flag on a map — it\'s about being able to answer the regulator\'s call the same morning, with the same partners who designed the programme."' },
      { type: 'h2', text: 'What changes for clients' },
      { type: 'list', items: [
        'Local delivery teams in Singapore, Jakarta, and Ho Chi Minh City',
        'Same firm-wide governance and quality framework — no regional variant',
        'Direct partner cadence across the APAC time zone',
        'Local regulatory and language coverage on engagements',
      ]},
      { type: 'p', text: 'The new offices are operational from April 2026 and immediately staffed for engagements across financial systems modernisation, infrastructure programmes, and telecommunications systems.' },
    ],
    related: ['ai-financial-services', 'maritime-route', 'engineering-award'],
  },
  {
    id: '2',
    slug: 'sustainability-report-2025',
    title: 'Sustainability report 2025 — embedded, not retrofitted',
    excerpt:
      'Annual sustainability report: progress in carbon reduction, renewable adoption, and the firm\'s position that sustainability is an operating constraint, not a deliverable.',
    category: 'Sustainability',
    date: 'February 28, 2026',
    readTime: '6 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977258998_4bfc5237.jpg',
    author: 'Sustainability Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'The firm\'s 2025 sustainability report is published today. It documents measurable progress against the firm\'s carbon, energy, and environmental commitments — and re-states the operating thesis behind them.' },
      { type: 'h2', text: 'The thesis' },
      { type: 'p', text: 'Sustainability isn\'t a deliverable for us — it\'s an operating constraint. ESG, environmental, and resilience standards are embedded into delivery from the design phase of every engagement, accountable to the same governance as financial and operational outcomes.' },
      { type: 'quote', text: '"If sustainability is something you measure at the end, you\'re measuring something you can no longer change. We measure it at the design phase."' },
      { type: 'h2', text: 'Headline numbers' },
      { type: 'list', items: [
        'Operational carbon down 38% versus 2020 baseline',
        '100% renewable electricity across UK and EU offices',
        'Sustainability advisory embedded in 100% of infrastructure engagements',
        'Independent third-party verification of all reported figures',
      ]},
      { type: 'p', text: 'The full report is available on request. Future reports will follow the same annual cadence and the same independent verification standard.' },
    ],
    related: ['engineering-award', 'expanding-southeast-asia', 'community-impact'],
  },
  {
    id: '3',
    slug: 'ai-financial-services',
    title: 'AI in financial services — practitioner notes from the field',
    excerpt:
      'A view from inside the firm\'s financial-systems practice on where AI is actually moving the needle for banks and insurers — and where it isn\'t.',
    category: 'Industry Insights',
    date: 'February 20, 2026',
    readTime: '5 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977278005_0d9f47a5.jpg',
    author: 'Financial Systems Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'There is more AI commentary in financial services than there is AI in financial services. From inside the firm\'s practice, the picture is narrower — and more useful — than the discourse suggests.' },
      { type: 'h2', text: 'Where it\'s moving the needle' },
      { type: 'list', items: [
        'Document-heavy operations (KYC, claims, regulatory reporting)',
        'Code-assisted modernisation of legacy systems',
        'Tier-1 fraud and AML triage',
        'Customer-facing summarisation in regulated channels',
      ]},
      { type: 'h2', text: 'Where it isn\'t' },
      { type: 'list', items: [
        'Decision-grade credit underwriting in regulated jurisdictions',
        'Anything where the audit trail must defend a specific decision',
        'Treasury operations where the cost of being wrong is asymmetric',
      ]},
      { type: 'quote', text: '"Most failed AI engagements in financial services are the ones where the team forgot which side of the audit-trail boundary they were on."' },
      { type: 'p', text: 'The pattern that holds across the engagements where it does work: AI accelerates the document-heavy part of the workflow, but the decision authority — and the audit trail — stays with the human or the deterministic rule. That boundary is what allows the work to land in production.' },
    ],
    related: ['5g-and-beyond', 'expanding-southeast-asia', 'healthcare-innovation'],
  },
  {
    id: '4',
    slug: 'maritime-route',
    title: 'Golden Transport launches new transatlantic maritime route',
    excerpt:
      'A new maritime route connecting key Atlantic ports — 15% faster transit, more competitive rates for institutional cargo clients.',
    category: 'Transport',
    date: 'February 15, 2026',
    readTime: '3 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg',
    author: 'Transport Logistics Team',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Our logistics division has launched a new maritime route connecting major Atlantic ports — reducing typical transit time by approximately 15% and improving rate competitiveness for institutional cargo clients.' },
      { type: 'p', text: 'The route is operated under the same multimodal framework as the rest of our logistics practice — air, sea, and ground modes are scheduled and tracked from a single delivery lead so that handoffs across modes don\'t introduce schedule risk.' },
      { type: 'h2', text: 'Available now' },
      { type: 'list', items: [
        'FCL and LCL capacity from launch',
        'Cargo insurance available across the route',
        'Customs clearance handled in-house',
        'Real-time tracking from booking through delivery',
      ]},
      { type: 'p', text: 'For routing options or quotes, contact the Transport Logistics team or use the shipment request form.' },
    ],
    related: ['expanding-southeast-asia', 'sustainability-report-2025'],
  },
  {
    id: '5',
    slug: 'engineering-award',
    title: 'Engineering practice recognised for sustainable infrastructure work',
    excerpt:
      'International recognition for our engineering team\'s approach to sustainable infrastructure development in emerging markets.',
    category: 'Engineering',
    date: 'February 10, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977215644_33f51b04.png',
    author: 'Infrastructure Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Our infrastructure engineering practice has been recognised internationally for its work on sustainable infrastructure programmes in emerging markets — specifically for the integration of resilience and environmental engineering into the feasibility and design phases of capital programmes.' },
      { type: 'h2', text: 'What was recognised' },
      { type: 'p', text: 'The recognition specifically cites the firm\'s approach of embedding environmental engineering disciplines into the same delivery team as the civil and structural engineers — rather than treating them as a separate review stage that runs after design completes.' },
      { type: 'quote', text: '"Most resilience problems in infrastructure are decided at feasibility, not at construction. We staff feasibility accordingly."' },
      { type: 'p', text: 'The team will continue to operate under that integrated model across upcoming capital programmes in transport, energy, and water infrastructure.' },
    ],
    related: ['sustainability-report-2025', 'maritime-route'],
  },
  {
    id: '6',
    slug: '5g-and-beyond',
    title: 'The future of telecommunications — practitioner notes on 5G',
    excerpt:
      'A view from inside the firm\'s telecommunications practice on what 5G is actually delivering for operators and enterprises — and what comes next.',
    category: 'Technology',
    date: 'February 5, 2026',
    readTime: '7 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977370549_8a38d5c2.png',
    author: 'Telecommunications Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Five years into 5G rollouts, the practice picture is clearer than the press picture: 5G has reshaped enterprise networking and private-network use cases more than it has reshaped consumer mobile.' },
      { type: 'h2', text: 'Where 5G has actually moved' },
      { type: 'list', items: [
        'Private 5G networks in industrial, port, and campus settings',
        'Fixed wireless access in markets without fibre coverage',
        'Network slicing for regulated enterprise services',
        'Edge compute integration for latency-sensitive applications',
      ]},
      { type: 'h2', text: 'What comes next' },
      { type: 'p', text: 'For operators, the next 18–24 months are about extracting commercial value from the network already deployed — through OSS / BSS modernisation that supports new commercial models, and through managed-service propositions to enterprise customers.' },
      { type: 'p', text: 'For institutional buyers, the question is less "should we deploy private 5G" and more "what operating model do we run it under" — which is where most of our current engagements concentrate.' },
    ],
    related: ['ai-financial-services', 'engineering-award'],
  },
  {
    id: '7',
    slug: 'healthcare-innovation',
    title: 'Healthcare innovation — improving outcomes through clinician-led design',
    excerpt:
      'How the firm\'s healthcare practice combines clinical operations and platform engineering to improve patient outcomes without disrupting care continuity.',
    category: 'Healthcare',
    date: 'January 28, 2026',
    readTime: '5 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977301660_a8b4da81.png',
    author: 'Healthcare Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Healthcare modernisation has a recurring failure pattern: technology-led programmes that improve a metric on paper while increasing administrative burden on clinicians. Our practice is structured to avoid that pattern by design.' },
      { type: 'h2', text: 'Clinician-led design as the operating constraint' },
      { type: 'p', text: 'Every digital health engagement we run is structured so that clinical workflow design happens in parallel with platform engineering — under one accountable lead — rather than the platform being built first and the clinical workflow being adapted to it afterwards.' },
      { type: 'quote', text: '"If you measure the value of a digital health programme by what it does for the clinician\'s 7am ward round, you get one answer. If you measure it by the project plan, you get a different one. We measure the first."' },
      { type: 'h2', text: 'What this looks like in practice' },
      { type: 'list', items: [
        'EHR deployments with parallel clinical workflow redesign',
        'Patient-facing services validated with the population they serve',
        'Operating-model changes embedded with the platform launch, not after',
        'Measurable reduction in clinician documentation burden as a programme KPI',
      ]},
    ],
    related: ['ai-financial-services', 'sustainability-report-2025'],
  },
  {
    id: '8',
    slug: 'community-impact',
    title: 'Community impact — annual giving report',
    excerpt:
      'A year of community engagement, charitable initiatives, and social responsibility programmes — measured by the same outcome standard as the firm\'s commercial work.',
    category: 'Giving',
    date: 'January 20, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977512052_0c8c8a55.png',
    author: 'Social Impact Practice',
    authorRole: 'Golden Dimensions Ltd',
    body: [
      { type: 'p', text: 'Our annual community impact report is published today. As with the sustainability report, the headline thesis is unchanged: community programmes are measured by the same outcome standard as the firm\'s commercial work.' },
      { type: 'h2', text: 'Where the firm engaged in 2025' },
      { type: 'list', items: [
        'Educational scholarships and vocational programmes across MENA and SSA',
        'Pro-bono engineering work on community infrastructure',
        'Skills-transfer programmes for emerging-market public agencies',
        'Direct charitable contributions, audited and disclosed',
      ]},
      { type: 'p', text: 'The full report — including the audited contribution figures and outcome reporting — is available on request.' },
    ],
    related: ['sustainability-report-2025', 'expanding-southeast-asia'],
  },
];

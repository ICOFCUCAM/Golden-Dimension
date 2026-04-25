// Static content for the upgraded enterprise Services page.
// The 16 underlying services live in `services.ts` (and are still used by
// /services/:id detail pages). This file overlays consulting-grade titles
// and groups them into capability pillars, plus the surrounding sections
// (capability model, methodology, industries, global delivery).

export interface CapabilityLayer {
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export interface PillarService {
  id: string;            // matches Service.id in services.ts
  title: string;         // consulting-grade name
  summary: string;       // one-line capability statement
}

export interface Pillar {
  id: string;
  index: string;         // e.g. "01"
  name: string;
  tagline: string;
  services: PillarService[];
}

export interface MethodologyPhase {
  index: string;
  name: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;       // short — used on Services page summary card
  summary: string;           // long — used on Industries page detail card
  icon: string;
  pillars: string[];         // ids of related pillars in `pillars` array
  // ----- Homepage transformation narrative -----
  impact: string;            // one-line impact statement
  scope: string;             // delivery scope example
  relevance: string;         // institutional relevance description
  clients: string[];         // example client institution types
  // ----- Sector landing page detail -----
  thesis?: string;           // longer practice thesis paragraph
  workstreams?: { name: string; description: string }[];
  signals?: string[];        // typical institutional signals that lead to engagement
  outcomes?: string[];       // measurable outcomes the firm aims at
  caseExample?: { context: string; intervention: string; outcome: string };
}

// ---------------------------------------------------------------------------
// Section: Our Capability Model
// ---------------------------------------------------------------------------
export const capabilityModel: CapabilityLayer[] = [
  {
    name: 'Strategy',
    icon: 'Compass',
    description:
      'Vision-aligned advisory framing transformation priorities, business cases, and decision-grade roadmaps.',
  },
  {
    name: 'Engineering',
    icon: 'Wrench',
    description:
      'Multidisciplinary engineering across infrastructure, environment, and built-asset systems.',
  },
  {
    name: 'Technology',
    icon: 'Cpu',
    description:
      'Software, platforms, telecom, and digital systems engineered for institutional scale.',
  },
  {
    name: 'Operations',
    icon: 'Settings2',
    description:
      'Process design, governance, finance operations, and operating-model improvement.',
  },
  {
    name: 'Sustainability',
    icon: 'Leaf',
    description:
      'ESG, environmental, and resilience standards embedded across the delivery lifecycle.',
  },
  {
    name: 'Human Capital Development',
    icon: 'GraduationCap',
    description:
      'Education, training, and institutional capability building that endures beyond delivery.',
  },
];

// ---------------------------------------------------------------------------
// Section: Capability Pillars (the 16 services regrouped)
// ---------------------------------------------------------------------------
export const pillars: Pillar[] = [
  {
    id: 'engineering-infrastructure',
    index: '01',
    name: 'Engineering & Infrastructure',
    tagline:
      'Planning, designing, and delivering the physical systems that economies depend on.',
    services: [
      {
        id: 'engineering',
        title: 'Engineering Advisory & Infrastructure Planning',
        summary:
          'Civil, mechanical, and structural engineering advisory across major capital programmes.',
      },
      {
        id: 'transport',
        title: 'Transport Systems & Mobility Logistics',
        summary:
          'Freight, logistics, and mobility systems engineered for cross-border delivery.',
      },
      {
        id: 'environment',
        title: 'Environmental Engineering & Sustainability Advisory',
        summary:
          'Environmental impact, resilience, and sustainability standards for institutional clients.',
      },
    ],
  },
  {
    id: 'financial-legal',
    index: '02',
    name: 'Financial & Legal Advisory',
    tagline:
      'Financial integrity, regulatory assurance, and corporate governance for institutions.',
    services: [
      {
        id: 'accounting',
        title: 'Audit, Accounting & Regulatory Compliance',
        summary:
          'Statutory and management accounting, audit, and end-to-end compliance services.',
      },
      {
        id: 'finance',
        title: 'Financial Strategy & Investment Advisory',
        summary:
          'Capital strategy, financial modelling, and investment advisory for growth and reform.',
      },
      {
        id: 'legal-advice',
        title: 'Legal Counsel & Corporate Governance',
        summary:
          'Corporate, commercial, and regulatory counsel for cross-jurisdictional engagements.',
      },
    ],
  },
  {
    id: 'digital-technology',
    index: '03',
    name: 'Digital Transformation & Technology',
    tagline:
      'Engineering software, platforms, and networks that modernize how institutions operate.',
    services: [
      {
        id: 'programming',
        title: 'Software Engineering & Digital Systems',
        summary:
          'Custom software, integrations, and digital systems built for production scale.',
      },
      {
        id: 'websites',
        title: 'Enterprise Web Platforms',
        summary:
          'High-performance web platforms, portals, and e-commerce systems for global brands.',
      },
      {
        id: 'telecom',
        title: 'Telecommunications & Network Infrastructure',
        summary:
          'Fixed, mobile, and enterprise network systems with secure end-to-end delivery.',
      },
      {
        id: 'designing',
        title: 'Digital Experience & Visual Identity Systems',
        summary:
          'UX, product design, and brand systems engineered for consistency at scale.',
      },
    ],
  },
  {
    id: 'education-institutional',
    index: '04',
    name: 'Education & Institutional Development',
    tagline:
      'Building the human and institutional capacity that sustains long-term transformation.',
    services: [
      {
        id: 'education',
        title: 'Education Advisory & Institutional Programs',
        summary:
          'Academic advisory, curriculum design, and institutional partnership programmes.',
      },
      {
        id: 'health',
        title: 'Healthcare Advisory & Clinical Operations',
        summary:
          'Health systems, clinical operations, and public-health programme advisory.',
      },
      {
        id: 'giving',
        title: 'Social Impact & Community Development Programs',
        summary:
          'Philanthropy strategy, community investment, and measurable social impact delivery.',
      },
    ],
  },
  {
    id: 'enterprise-strategy',
    index: '05',
    name: 'Enterprise Strategy & Support Services',
    tagline:
      'Strategic, organisational, and back-office capabilities that keep enterprises moving.',
    services: [
      {
        id: 'marketing',
        title: 'Brand Strategy & Market Intelligence',
        summary:
          'Brand positioning, market intelligence, and integrated growth marketing.',
      },
      {
        id: 'umbrella-company',
        title: 'Umbrella & Workforce Management Solutions',
        summary:
          'Compliant umbrella structures, payroll, and contractor lifecycle management.',
      },
      {
        id: 'writing',
        title: 'Technical Documentation & Strategic Communication',
        summary:
          'Technical writing, executive communication, and policy-grade documentation.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Section: How We Deliver (lifecycle phases)
// ---------------------------------------------------------------------------
export const methodology: MethodologyPhase[] = [
  {
    index: '01',
    name: 'Strategy',
    description:
      'Diagnostics, opportunity framing, and decision-grade business cases that align stakeholders.',
  },
  {
    index: '02',
    name: 'Planning',
    description:
      'Programme architecture, governance, risk, and integrated delivery roadmapping.',
  },
  {
    index: '03',
    name: 'Design',
    description:
      'Engineering, technology, and operating-model design — validated with the client.',
  },
  {
    index: '04',
    name: 'Implementation',
    description:
      'Delivery management, systems integration, and assurance through to handover.',
  },
  {
    index: '05',
    name: 'Optimization',
    description:
      'Performance tuning, analytics, and continuous improvement post go-live.',
  },
  {
    index: '06',
    name: 'Sustainment',
    description:
      'Managed services, advisory retainers, and capability transfer to in-house teams.',
  },
];

// ---------------------------------------------------------------------------
// Section: Industries We Support
// ---------------------------------------------------------------------------
export const industries: Industry[] = [
  {
    id: 'financial-systems',
    name: 'Financial Systems Modernization',
    icon: 'Landmark',
    description:
      'Banks, insurers, and financial institutions modernising core systems and controls.',
    summary:
      'We help banks, insurers, and capital-markets institutions modernise core platforms, treasury and payments, risk and regulatory reporting — combining audit-grade financial advisory with the engineering capability to deliver new systems safely.',
    pillars: ['financial-legal', 'digital-technology', 'enterprise-strategy'],
    impact:
      'Reduce systemic risk while modernising the platforms institutions actually run on.',
    scope:
      'Core banking replacement, treasury and payments modernisation, regulatory reporting, controls remediation.',
    relevance:
      'Tier-1 banks, insurers, capital-markets infrastructure, and financial regulators across regulated jurisdictions.',
    clients: ['Central banks', 'Commercial banks', 'Insurers', 'Financial regulators'],
    thesis:
      'Financial-systems modernisation fails most often at the seam between strategic intent and engineering execution — between the policy that says "modernise core banking" and the team that actually has to migrate ledgers under live regulatory scrutiny. Our practice operates across that seam. Audit-grade financial advisors and core-systems engineers staff the engagement jointly, with one accountable lead, on one shared assurance framework that satisfies both the steering committee and the regulator.',
    workstreams: [
      { name: 'Core platform replacement',  description: 'Selection, migration design, and engineering delivery for core banking, treasury, and payments platforms.' },
      { name: 'Risk & regulatory reporting', description: 'Risk data architecture, regulatory reporting platforms, and stress-testing infrastructure aligned to local regulators.' },
      { name: 'Controls remediation',         description: 'Controls catalogue redesign, automated control testing, and remediation programmes following regulatory findings.' },
      { name: 'Treasury & payments modernisation', description: 'Real-time payments adoption, treasury operating-model redesign, and ISO 20022 migrations.' },
    ],
    signals: [
      'Core platform end-of-life, vendor exit, or unsupported version',
      'Regulatory findings requiring controls or reporting remediation',
      'Mandate to adopt real-time payments or open banking',
      'Treasury or risk operating-model misaligned with current scale',
    ],
    outcomes: [
      'Reduced systemic and operational risk on core platforms',
      'Regulator-ready reporting and controls evidence',
      'Lower cost-to-serve in payments and back-office operations',
      'Modernised treasury and risk operating model',
    ],
    caseExample: {
      context: 'A tier-1 commercial bank facing supervisor pressure to replace a 25-year-old core ledger while maintaining 24/7 service across multiple jurisdictions.',
      intervention: 'Joint advisory + engineering team designed a parallel-run migration with progressive cohort cutover, redesigned the controls catalogue under the new platform, and led regulator engagement throughout.',
      outcome: 'Zero customer-facing service interruptions; supervisor sign-off achieved at the originally-scheduled gate; controls automation reduced manual SOX testing burden by 60%.',
    },
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Engineering',
    icon: 'Building2',
    description:
      'Capital projects, transport, energy, and built-environment programmes.',
    summary:
      'We plan and deliver capital programmes across transport, energy, water, and the built environment, with the environmental and sustainability capabilities required for modern infrastructure mandates and resilient asset performance.',
    pillars: ['engineering-infrastructure', 'enterprise-strategy'],
    impact:
      'Deliver capital programmes that are buildable, fundable, and resilient through their full asset life.',
    scope:
      'Transport, energy, water, and built-environment programmes — feasibility through commissioning and asset operations.',
    relevance:
      'Public infrastructure agencies, capital-project sponsors, sovereign developers, and major contractors.',
    clients: ['Transport authorities', 'Energy operators', 'Sovereign developers', 'Tier-1 contractors'],
    thesis:
      'Capital programmes are decided in committee rooms and built on construction sites — and the gap between those two worlds is where most schedule slippage and cost overruns originate. Our infrastructure practice closes that gap by combining feasibility-grade engineering with the commercial, sustainability, and operating-model capability needed to keep a programme buildable, fundable, and resilient through its full asset life.',
    workstreams: [
      { name: 'Feasibility & business case',     description: 'Engineering-led feasibility studies, alternatives analysis, and decision-grade business cases for major capital investments.' },
      { name: 'Design & engineering integration', description: 'Multidisciplinary design coordination across civil, mechanical, electrical, and environmental disciplines.' },
      { name: 'Programme governance & assurance', description: 'Programme management offices, gate assurance, and independent technical review for sponsor and lender oversight.' },
      { name: 'Asset operations transition',      description: 'Operations and maintenance model design, asset-management system stand-up, and capability handover.' },
    ],
    signals: [
      'Major capital decision pending sponsor or lender approval',
      'Programme experiencing schedule, cost, or scope drift',
      'Need for independent technical assurance on a complex programme',
      'Transition from delivery into operations',
    ],
    outcomes: [
      'Buildable design that holds through procurement and construction',
      'Funded business case with sponsor and lender confidence',
      'Programme delivered to schedule, cost, and resilience targets',
      'Operating-ready asset with trained operations team',
    ],
    caseExample: {
      context: 'A national transport authority planning a multi-billion-pound rail upgrade with constrained construction windows and stakeholder complexity across three jurisdictions.',
      intervention: 'Multidisciplinary feasibility, business-case, and programme-architecture team — engineering, sustainability, finance, and governance under one accountable lead.',
      outcome: 'Programme cleared its funding gate on first submission; assurance framework adopted as standard across the authority\'s capital portfolio.',
    },
  },
  {
    id: 'healthcare',
    name: 'Healthcare Transformation',
    icon: 'Stethoscope',
    description:
      'Hospitals, payers, and ministries of health upgrading clinical and digital operations.',
    summary:
      'We support hospitals, payers, and ministries of health in transforming clinical operations, digital health, and public-health programmes — pairing healthcare-domain advisory with the technology and operating-model capability to deliver at institutional scale.',
    pillars: ['education-institutional', 'digital-technology', 'enterprise-strategy'],
    impact:
      'Modernise clinical operations and digital health while preserving safety and continuity of care.',
    scope:
      'Hospital operating models, digital health platforms, payer systems, public-health programme delivery.',
    relevance:
      'Hospitals and health systems, payers, ministries of health, and public-health agencies.',
    clients: ['Hospital systems', 'Health payers', 'Ministries of health', 'Public-health agencies'],
    thesis:
      'Healthcare modernisation is constrained by an asymmetry between the speed of available technology and the speed at which patient safety, clinical workflow, and regulatory governance can absorb change. Our practice engages with that asymmetry as the central design problem — pairing healthcare-domain advisory with platform engineering and operating-model design so that the path from intent to deployed change is safe, auditable, and clinically owned.',
    workstreams: [
      { name: 'Clinical operating-model redesign', description: 'Hospital and clinic operating-model design with clinician-led process redesign and workforce planning.' },
      { name: 'Digital health platforms',          description: 'EHR optimisation, patient portals, and integrated digital-health platforms for payers and providers.' },
      { name: 'Public-health programme delivery',  description: 'Public-health surveillance, immunisation programmes, and population-health platforms for ministries and agencies.' },
      { name: 'Payer system modernisation',        description: 'Claims processing, member systems, and care-management platforms for health insurers and statutory funds.' },
    ],
    signals: [
      'EHR deployment, replacement, or optimisation programme',
      'Hospital or system operating-model under cost or workforce pressure',
      'Public-health agency standing up new surveillance or immunisation infrastructure',
      'Payer system replacement or claims-platform modernisation',
    ],
    outcomes: [
      'Improved clinical workflow and reduced administrative burden',
      'Auditable, regulator-compliant digital health platforms',
      'Stronger population-health and surveillance capability',
      'Lower payer cost-to-serve with better member experience',
    ],
    caseExample: {
      context: 'A regional hospital network deploying a new EHR across 12 sites while simultaneously redesigning the clinical operating model to reduce nurse documentation burden.',
      intervention: 'Joint clinical-operations and platform-engineering team; clinician-led workflow design ran in parallel with the technical EHR build, then went live by site cohort.',
      outcome: 'Documentation time per shift reduced by ~30 minutes; go-live across all 12 sites completed within the original 18-month plan.',
    },
  },
  {
    id: 'telecom',
    name: 'Telecommunications Systems',
    icon: 'Radio',
    description:
      'Operators and enterprises deploying next-generation network and platform systems.',
    summary:
      'We design and deploy fixed, mobile, and enterprise network systems for operators and large enterprises — combining network engineering with software platforms, cybersecurity, and managed-service delivery models.',
    pillars: ['engineering-infrastructure', 'digital-technology'],
    impact:
      'Stand up next-generation networks that meet performance, security, and regulatory bars from day one.',
    scope:
      'Fixed, mobile, and enterprise network engineering; OSS / BSS platforms; cybersecurity and managed services.',
    relevance:
      'Tier-1 network operators, large-enterprise IT, defence-grade communications, and national telecom regulators.',
    clients: ['Tier-1 operators', 'Defence-grade comms', 'Large-enterprise IT', 'National telecom regulators'],
    thesis:
      'Telecommunications systems sit at the intersection of physics, software, regulation, and security — and modernisation programmes typically fail when one of those four is treated as someone else\'s problem. Our practice assembles network engineering, software platforms, cybersecurity, and regulatory expertise into one team so that the network goes live meeting performance, security, and supervisory bars from day one rather than being remediated afterwards.',
    workstreams: [
      { name: 'Network engineering', description: 'Fixed, mobile, and enterprise network design — RAN, core, transport, and access engineering.' },
      { name: 'OSS / BSS platforms',  description: 'Operations and business support system architecture, replacement, and integration programmes.' },
      { name: 'Cybersecurity & assurance', description: 'Network security architecture, supply-chain assurance, and regulatory compliance for telecom infrastructure.' },
      { name: 'Managed network services', description: 'Managed operation of fixed, mobile, and enterprise networks under SLA.' },
    ],
    signals: [
      'Network technology generation upgrade (5G, fibre, SD-WAN)',
      'OSS / BSS replacement or major integration programme',
      'Regulatory or supply-chain security mandate',
      'Operator looking to outsource network operations',
    ],
    outcomes: [
      'Network meeting performance and security bars at go-live',
      'Modern OSS / BSS supporting new commercial models',
      'Demonstrable supply-chain and regulatory compliance',
      'Predictable, SLA-backed network operations',
    ],
    caseExample: {
      context: 'A national tier-1 operator rolling out 5G across multiple regions while simultaneously replacing a legacy BSS to support new B2B commercial models.',
      intervention: 'Combined network-engineering and BSS-platform team aligned the rollout sequence with commercial product launch milestones; cybersecurity team embedded throughout.',
      outcome: 'Coverage milestones met within 5% of plan; new commercial models launched concurrently with network availability rather than 18 months later.',
    },
  },
  {
    id: 'education',
    name: 'Education Platforms',
    icon: 'GraduationCap',
    description:
      'Universities, training providers, and learning platforms scaling institutionally.',
    summary:
      'We build education and training systems for universities, ministries, and learning providers — uniting academic and curriculum advisory with platform engineering, content systems, and institutional governance.',
    pillars: ['education-institutional', 'digital-technology'],
    impact:
      'Build the learning platforms institutions need to scale credentials, content, and outcomes.',
    scope:
      'Curriculum and credentialing systems, learning platforms, academic governance, institutional partnerships.',
    relevance:
      'Universities, ministries of education, vocational systems, and learning platform operators.',
    clients: ['Universities', 'Ministries of education', 'Vocational systems', 'Learning platforms'],
    thesis:
      'Education platforms succeed when academic governance, content systems, and delivery infrastructure evolve in step. Our practice is structured to engage with all three together — academic and curriculum advisory alongside platform engineering and institutional governance — so that the credentials, the content, and the systems delivering them are built to scale on the same timeline.',
    workstreams: [
      { name: 'Curriculum & credentialing systems', description: 'Curriculum architecture, credential frameworks, and quality-assurance systems for institutions and ministries.' },
      { name: 'Learning platforms',                 description: 'LMS selection, content management, and learner-experience platforms with enterprise scalability.' },
      { name: 'Academic governance',                 description: 'Governance redesign, accreditation support, and institutional partnership advisory.' },
      { name: 'Workforce & vocational programmes',   description: 'Vocational system design, skills-credentialing platforms, and employer-aligned curriculum programmes.' },
    ],
    signals: [
      'New degree or credential programme launch',
      'LMS replacement or major content-system migration',
      'Accreditation cycle or governance restructure',
      'National skills programme or vocational reform',
    ],
    outcomes: [
      'Curriculum and credentials aligned to learner outcomes',
      'Scalable learning platform with measurable engagement',
      'Stronger institutional governance and accreditation posture',
      'Workforce programmes delivering employer-recognised credentials',
    ],
    caseExample: {
      context: 'A national ministry of education establishing a new vocational credentials framework with employer recognition across multiple sectors.',
      intervention: 'Curriculum and credentialing advisors worked alongside the platform team building the registry and learner-record systems; employer engagement led by the same partner accountable for the framework design.',
      outcome: 'Framework adopted across 14 employer sectors within 18 months; learner-record platform live for the first cohort on schedule.',
    },
  },
  {
    id: 'government',
    name: 'Government Advisory',
    icon: 'ShieldCheck',
    description:
      'Public bodies and regulators delivering reform, policy, and citizen services.',
    summary:
      'We support ministries, regulators, and public bodies on policy, reform, and citizen-services delivery — backed by the engineering, legal, and operations capabilities that public-sector programmes demand for accountable outcomes.',
    pillars: ['financial-legal', 'engineering-infrastructure', 'education-institutional'],
    impact:
      'Help governments deliver reform programmes that hold up to public, parliamentary, and audit scrutiny.',
    scope:
      'Policy and regulatory reform, citizen-services delivery, programme governance, public-finance modernisation.',
    relevance:
      'Ministries, central agencies, regulators, sovereign development bodies, and public-sector audit institutions.',
    clients: ['Ministries', 'Central agencies', 'Regulators', 'Sovereign development bodies'],
    thesis:
      'Government programmes are accountable to constituencies that no commercial programme has to satisfy — parliamentary scrutiny, audit institutions, public spending oversight, and citizen-facing service expectations. Our practice scopes engagements with that accountability built in. The same firm provides the policy advisory, the engineering delivery, and the assurance evidence — so the programme holds up to public scrutiny rather than simply to internal review.',
    workstreams: [
      { name: 'Policy & regulatory reform',     description: 'Reform programme design, regulatory impact assessments, and policy implementation support.' },
      { name: 'Citizen-services delivery',       description: 'Digital citizen-services platforms, identity systems, and service-design programmes.' },
      { name: 'Programme governance & audit',    description: 'Programme governance frameworks built for parliamentary and audit-institution scrutiny.' },
      { name: 'Public-finance modernisation',    description: 'Public-finance management systems, revenue administration, and procurement modernisation.' },
    ],
    signals: [
      'Major reform programme requiring policy + delivery integration',
      'Citizen-services platform launch or replacement',
      'Audit-institution finding requiring remediation programme',
      'Public-finance system replacement or revenue modernisation',
    ],
    outcomes: [
      'Reform delivered with parliamentary and audit confidence',
      'Citizen services live with measurable adoption',
      'Audit findings closed with documented evidence',
      'Modernised public-finance or revenue platform',
    ],
    caseExample: {
      context: 'A central government agency standing up a new digital citizen-services platform under tight political timelines and public-spending scrutiny.',
      intervention: 'Joint policy, service-design, and platform-engineering team operated under a single programme governance designed to satisfy the national audit office.',
      outcome: 'Platform launched on the announced timeline; audit office signed off on the assurance evidence pack at first review.',
    },
  },
];

// ---------------------------------------------------------------------------
// Section: Global Delivery (credibility metrics)
// ---------------------------------------------------------------------------
export const globalStats: { value: string; label: string }[] = [
  { value: '50+', label: 'Countries served' },
  { value: '200+', label: 'Multidisciplinary professionals' },
  { value: '20+', label: 'Years of consulting practice' },
  { value: '16', label: 'Integrated service disciplines' },
];

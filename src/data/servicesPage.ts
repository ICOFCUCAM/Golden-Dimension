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
    name: 'Long-term Support',
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
    name: 'Financial Systems Transformation',
    icon: 'Landmark',
    description:
      'Banks, insurers, and financial institutions modernising core systems and controls.',
    summary:
      'We help banks, insurers, and capital-markets institutions modernise core platforms, treasury and payments, risk and regulatory reporting — combining audit-grade financial advisory with the engineering capability to deliver new systems safely.',
    pillars: ['financial-legal', 'digital-technology', 'enterprise-strategy'],
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
  },
  {
    id: 'healthcare',
    name: 'Healthcare Modernization',
    icon: 'Stethoscope',
    description:
      'Hospitals, payers, and ministries of health upgrading clinical and digital operations.',
    summary:
      'We support hospitals, payers, and ministries of health in transforming clinical operations, digital health, and public-health programmes — pairing healthcare-domain advisory with the technology and operating-model capability to deliver at institutional scale.',
    pillars: ['education-institutional', 'digital-technology', 'enterprise-strategy'],
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
  },
  {
    id: 'government',
    name: 'Government & Public Sector Advisory',
    icon: 'ShieldCheck',
    description:
      'Public bodies and regulators delivering reform, policy, and citizen services.',
    summary:
      'We support ministries, regulators, and public bodies on policy, reform, and citizen-services delivery — backed by the engineering, legal, and operations capabilities that public-sector programmes demand for accountable outcomes.',
    pillars: ['financial-legal', 'engineering-infrastructure', 'education-institutional'],
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

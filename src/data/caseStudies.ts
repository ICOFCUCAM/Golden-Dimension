export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  // Cross-references — kept aligned with /data/servicesPage.ts ids
  sectorId: string;          // Industry.id
  pillarId: string;          // Pillar.id
  engagementModelId: string; // 'advisory' | 'programme-delivery' | 'managed-services' | 'capability-transfer'
  // Headline
  client: string;            // anonymised client descriptor (e.g. "Tier-1 European Bank")
  region: string;
  duration: string;
  year: string;
  snippet: string;           // one-line headline outcome
  // Full body
  context: string;
  intervention: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  workstreams: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'core-banking-replacement',
    slug: 'core-banking-replacement',
    title: 'Core banking replacement under live regulatory scrutiny',
    sectorId: 'financial-systems',
    pillarId: 'financial-legal',
    engagementModelId: 'programme-delivery',
    client: 'Tier-1 commercial bank',
    region: 'European Union',
    duration: '32 months',
    year: '2024',
    snippet:
      'Migrated a 25-year-old core ledger to a modern platform with zero customer-facing service interruptions and supervisor sign-off at the originally-scheduled gate.',
    context:
      'A tier-1 commercial bank faced supervisor pressure to replace a 25-year-old core ledger while maintaining 24/7 service across multiple European jurisdictions. Three previous internal attempts had stalled at the design phase. The supervisor had signalled that a fourth failed attempt would trigger formal regulatory action.',
    intervention:
      'A joint advisory + engineering team designed a parallel-run migration with progressive cohort cutover. The same partners framed the strategic options paper, designed the technical architecture, redesigned the controls catalogue, and led regulator engagement throughout — under one programme governance designed jointly with the client board and the supervisor.',
    outcome:
      'Migration completed across all three jurisdictions on the originally-scheduled supervisor gate. Zero customer-facing service interruptions across 18 months of progressive cutover. Controls automation reduced manual SOX testing burden by ~60%, and the new architecture cut routine reporting cycles from days to hours.',
    metrics: [
      { label: 'Service interruptions',        value: '0' },
      { label: 'SOX testing burden reduction', value: '60%' },
      { label: 'Reporting cycle improvement',  value: 'Days → hours' },
      { label: 'Supervisor gate',              value: 'On schedule' },
    ],
    workstreams: [
      'Strategic options paper and supervisor engagement',
      'Target-state architecture and migration design',
      'Controls catalogue redesign and automation',
      'Programme delivery across three jurisdictions',
    ],
  },
  {
    id: 'national-rail-upgrade',
    slug: 'national-rail-upgrade',
    title: 'National rail upgrade — funding gate cleared on first submission',
    sectorId: 'infrastructure',
    pillarId: 'engineering-infrastructure',
    engagementModelId: 'advisory',
    client: 'National transport authority',
    region: 'Sub-Saharan Africa',
    duration: '14 months',
    year: '2025',
    snippet:
      'Multi-billion rail upgrade cleared its funding gate on first submission; the assurance framework was adopted as standard across the authority\'s portfolio.',
    context:
      'A national transport authority was planning a multi-billion-pound rail upgrade with constrained construction windows and stakeholder complexity across three jurisdictions. Funding was contingent on a single-pass approval from the development bank and the national audit office.',
    intervention:
      'A multidisciplinary feasibility, business-case, and programme-architecture team — engineering, sustainability, finance, and governance — operated under one accountable lead. Feasibility, environmental impact, and financial modelling proceeded in parallel rather than as serial reviews.',
    outcome:
      'Programme cleared its funding gate on first submission. The integrated assurance framework developed for this programme was adopted by the authority as the standard across its capital portfolio. Construction commenced on schedule.',
    metrics: [
      { label: 'Funding gate',           value: 'First-submission pass' },
      { label: 'Schedule slippage',      value: '0 weeks' },
      { label: 'Adopted as standard',    value: 'Authority-wide' },
      { label: 'Disciplines integrated', value: '7' },
    ],
    workstreams: [
      'Engineering feasibility and alternatives analysis',
      'Environmental impact and resilience modelling',
      'Financial modelling and business case',
      'Programme governance and assurance design',
    ],
  },
  {
    id: 'hospital-network-ehr',
    slug: 'hospital-network-ehr',
    title: 'Hospital network EHR + clinical operating-model redesign',
    sectorId: 'healthcare',
    pillarId: 'education-institutional',
    engagementModelId: 'programme-delivery',
    client: 'Regional hospital network · 12 sites',
    region: 'United Kingdom',
    duration: '18 months',
    year: '2024',
    snippet:
      'EHR deployed across 12 sites on the original timeline with clinician documentation time reduced by ~30 minutes per shift.',
    context:
      'A regional hospital network was deploying a new EHR across 12 sites while simultaneously redesigning the clinical operating model to reduce nurse documentation burden. Two previous EHR rollouts in the network had delivered the technology but increased clinician workload.',
    intervention:
      'A joint clinical-operations and platform-engineering team — clinician-led workflow design ran in parallel with the technical EHR build. The same partners owned both tracks, so workflow constraints fed back into platform configuration in real time. Sites went live by cohort, with each cohort\'s lessons feeding the next.',
    outcome:
      'Documentation time per shift reduced by ~30 minutes — measured at the bedside, not in surveys. All 12 sites went live within the original 18-month plan. Patient-safety incidents linked to documentation friction dropped to baseline within 90 days of go-live.',
    metrics: [
      { label: 'Sites live',             value: '12 / 12' },
      { label: 'Documentation time saved', value: '~30 min/shift' },
      { label: 'Schedule variance',      value: '+0 days' },
      { label: 'Cohort go-lives',         value: '6' },
    ],
    workstreams: [
      'Clinician-led workflow redesign',
      'EHR configuration and integration',
      'Change management and training',
      'Cohort-based progressive cutover',
    ],
  },
  {
    id: 'tier1-5g-rollout',
    slug: 'tier1-5g-rollout',
    title: 'Tier-1 5G rollout aligned with new commercial models',
    sectorId: 'telecom',
    pillarId: 'digital-technology',
    engagementModelId: 'programme-delivery',
    client: 'Tier-1 national telecom operator',
    region: 'Asia Pacific',
    duration: '24 months',
    year: '2025',
    snippet:
      '5G coverage milestones met within 5% of plan; new B2B commercial models launched concurrently with network availability rather than 18 months later.',
    context:
      'A national tier-1 operator was rolling out 5G across multiple regions while simultaneously replacing a legacy BSS to support new B2B commercial models. The historical pattern at the operator was for network and commercial timelines to drift apart by 12–18 months.',
    intervention:
      'A combined network-engineering and BSS-platform team aligned the rollout sequence with commercial product launch milestones. Cybersecurity team embedded throughout, not as a final gate. Network and BSS shared a single integrated programme plan rather than parallel ones.',
    outcome:
      '5G coverage milestones hit within 5% of the original plan. New B2B commercial models launched concurrently with network availability — the historical 12–18 month gap closed to under 4 weeks. Supply-chain security audit cleared on first review.',
    metrics: [
      { label: 'Coverage variance to plan',  value: '< 5%' },
      { label: 'Network-to-commercial gap', value: '< 4 weeks' },
      { label: 'Security audit',             value: 'First-pass' },
      { label: 'Regions deployed',           value: '7' },
    ],
    workstreams: [
      'Network engineering and rollout sequencing',
      'BSS replacement and integration',
      'Cybersecurity and supply-chain assurance',
      'Commercial product alignment',
    ],
  },
  {
    id: 'vocational-credentials-framework',
    slug: 'vocational-credentials-framework',
    title: 'National vocational credentials framework with employer recognition',
    sectorId: 'education',
    pillarId: 'education-institutional',
    engagementModelId: 'capability-transfer',
    client: 'National ministry of education',
    region: 'MENA',
    duration: '20 months',
    year: '2024',
    snippet:
      'Framework adopted across 14 employer sectors within 18 months; learner-record platform live for the first cohort on schedule.',
    context:
      'A national ministry of education needed to establish a new vocational credentials framework with employer recognition across multiple sectors — and ensure the ministry\'s own teams could operate the framework without external dependency by year three.',
    intervention:
      'Curriculum and credentialing advisors worked alongside the platform team building the registry and learner-record systems. Employer engagement was led by the same partner accountable for the framework design — so credential structure and employer expectations evolved together. Ministry teams were embedded from day one with a structured capability-transfer plan.',
    outcome:
      'Framework adopted across 14 employer sectors within 18 months — three sectors ahead of plan. Learner-record platform live for the first cohort on schedule. Ministry teams owned operations from month 20; the firm\'s ongoing role is now advisory only.',
    metrics: [
      { label: 'Sectors recognising the framework', value: '14' },
      { label: 'Learner cohort onboarded on time',  value: 'Yes' },
      { label: 'Capability transfer complete',      value: 'Month 20' },
      { label: 'Ongoing dependency',                value: 'Advisory only' },
    ],
    workstreams: [
      'Curriculum and credential framework design',
      'Learner-record platform engineering',
      'Employer engagement and adoption programme',
      'Ministry capability transfer',
    ],
  },
  {
    id: 'citizen-services-platform',
    slug: 'citizen-services-platform',
    title: 'Digital citizen-services platform — audit-office sign-off at first review',
    sectorId: 'government',
    pillarId: 'digital-technology',
    engagementModelId: 'programme-delivery',
    client: 'Central government agency',
    region: 'European Union',
    duration: '22 months',
    year: '2025',
    snippet:
      'Platform launched on the announced political timeline; audit office signed off on the assurance evidence pack at first review.',
    context:
      'A central government agency was standing up a new digital citizen-services platform under tight political timelines and intense public-spending scrutiny. The national audit office had flagged previous large IT programmes for governance and assurance gaps.',
    intervention:
      'A joint policy, service-design, and platform-engineering team operated under a single programme governance designed to satisfy the national audit office. Assurance evidence was generated continuously rather than retrofitted. Service design was tested with real citizen cohorts before scale.',
    outcome:
      'Platform launched on the announced political timeline. The national audit office signed off on the assurance evidence pack at first review — unusual for a programme of this scale. Citizen-services adoption exceeded the year-one target within six months of launch.',
    metrics: [
      { label: 'Political launch date hit',  value: 'Yes' },
      { label: 'Audit-office sign-off',      value: 'First review' },
      { label: 'Year-one adoption target',   value: 'Hit in 6 months' },
      { label: 'Service availability SLA',   value: '99.95%' },
    ],
    workstreams: [
      'Policy and service-design integration',
      'Citizen-services platform engineering',
      'Identity and authentication architecture',
      'Audit and assurance evidence framework',
    ],
  },
  {
    id: 'cross-border-payments-modernisation',
    slug: 'cross-border-payments-modernisation',
    title: 'Cross-border payments modernisation — ISO 20022 across three banks',
    sectorId: 'financial-systems',
    pillarId: 'digital-technology',
    engagementModelId: 'programme-delivery',
    client: 'Three commercial banks · joint programme',
    region: 'MENA',
    duration: '16 months',
    year: '2025',
    snippet:
      'ISO 20022 migration completed across three independently-operated banks on a single coordinated cutover with zero settlement disruption.',
    context:
      'Three commercial banks operating across the same regional payments corridor needed to migrate to ISO 20022 messaging on coordinated timelines — but had no shared programme infrastructure, governance, or precedent for joint delivery.',
    intervention:
      'A single multidisciplinary programme team operated across all three banks under a joint steering committee. Common architecture patterns and migration playbooks were developed once and applied three times, with bank-specific adaptations only where genuinely necessary. Joint testing windows allowed end-to-end validation across counterparts.',
    outcome:
      'ISO 20022 migration completed on a single coordinated cutover weekend with zero settlement disruption. Joint architecture patterns reduced per-bank delivery cost by an estimated 35–40% versus equivalent solo programmes. The joint governance has been retained for future shared modernisation work.',
    metrics: [
      { label: 'Banks migrated together',     value: '3' },
      { label: 'Settlement disruption',       value: '0 minutes' },
      { label: 'Per-bank cost reduction',     value: '~35–40%' },
      { label: 'Cutover window',              value: '1 weekend' },
    ],
    workstreams: [
      'Joint programme architecture and governance',
      'Common ISO 20022 migration patterns',
      'Per-bank technical adaptation',
      'Coordinated end-to-end testing',
    ],
  },
  {
    id: 'sovereign-infrastructure-resilience',
    slug: 'sovereign-infrastructure-resilience',
    title: 'Sovereign infrastructure resilience programme · advisory mandate',
    sectorId: 'infrastructure',
    pillarId: 'engineering-infrastructure',
    engagementModelId: 'advisory',
    client: 'Sovereign development authority',
    region: 'Sub-Saharan Africa',
    duration: '6 months',
    year: '2025',
    snippet:
      'Resilience advisory engagement reframed a $2bn infrastructure portfolio into a sequenced programme with explicit climate and political resilience criteria.',
    context:
      'A sovereign development authority held a $2bn portfolio of planned infrastructure investments without a coordinated framework for evaluating climate, political, or operational resilience across them. Investment decisions were being made portfolio-piece-by-piece.',
    intervention:
      'A six-month advisory mandate combined infrastructure engineering, sustainability, and public-finance specialists. The team built a resilience-criteria framework, applied it across the portfolio, and reframed investment sequencing accordingly.',
    outcome:
      'Portfolio resequenced with explicit resilience criteria; three investments deferred and two accelerated. Framework adopted by the authority as the standard for future investment review. The advisory engagement led directly to a follow-on programme-delivery mandate on the highest-priority investment.',
    metrics: [
      { label: 'Portfolio value reviewed',     value: '$2bn' },
      { label: 'Investments resequenced',     value: '5' },
      { label: 'Framework adoption',           value: 'Authority-wide' },
      { label: 'Follow-on engagement',        value: 'Programme delivery' },
    ],
    workstreams: [
      'Resilience criteria framework',
      'Portfolio review and scoring',
      'Investment-sequencing recommendations',
      'Framework handover to authority',
    ],
  },
];

export const engagementModelsById: Record<string, string> = {
  'advisory':            'Advisory',
  'programme-delivery':  'Programme Delivery',
  'managed-services':    'Managed Services',
  'capability-transfer': 'Capability Transfer',
};

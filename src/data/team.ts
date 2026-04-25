/**
 * Practitioner / leadership profiles.
 *
 * NOTE: Names below are placeholders that signal the *shape* of a real
 * practitioner roster. Replace with real names, titles, locations, and
 * (optional) LinkedIn handles before launch — keep the same field shape so
 * the UI doesn't need to change.
 */
export interface Practitioner {
  id: string;
  initials: string;            // 2-letter monogram
  name: string;
  title: string;               // e.g. "Managing Partner"
  practiceArea: string;        // matches one of the pillar ids, or 'firm' for firm-wide roles
  location: string;
  since: string;               // year joined
  bio: string;
  expertise: string[];
  linkedin?: string;
}

export const practitioners: Practitioner[] = [
  {
    id: 'managing-partner',
    initials: 'MR',
    name: 'M. Reyes',
    title: 'Managing Partner',
    practiceArea: 'firm',
    location: 'London',
    since: '2003',
    bio: 'Founded the firm in 2003 with the thesis that strategy, engineering, and technology should be delivered as one accountable practice rather than as separate vendor tracks. Continues to lead the firm-wide governance and quality framework that all engagements operate under.',
    expertise: ['Firm strategy', 'Multidisciplinary delivery', 'Institutional governance'],
  },
  {
    id: 'lead-engineering-infrastructure',
    initials: 'JK',
    name: 'J. Kowalski',
    title: 'Practice Lead — Engineering & Infrastructure',
    practiceArea: 'engineering-infrastructure',
    location: 'London',
    since: '2007',
    bio: 'Civil and structural engineer by training; leads the firm\'s infrastructure engineering practice across capital programmes in transport, energy, water, and the built environment. Known for embedding environmental and resilience engineering into feasibility rather than retrofitting it at construction.',
    expertise: ['Capital programmes', 'Transport infrastructure', 'Resilience engineering', 'Sponsor advisory'],
  },
  {
    id: 'lead-financial-legal',
    initials: 'SE',
    name: 'S. El-Rashidi',
    title: 'Practice Lead — Financial & Legal Advisory',
    practiceArea: 'financial-legal',
    location: 'Dubai',
    since: '2009',
    bio: 'Chartered accountant and former regulator; leads the firm\'s financial systems and legal advisory practice. Spends the majority of her time on core platform replacements and regulatory remediation programmes for tier-1 banks and insurers.',
    expertise: ['Core banking', 'Regulatory engagement', 'Risk and reporting', 'Cross-jurisdictional advisory'],
  },
  {
    id: 'lead-digital-technology',
    initials: 'DC',
    name: 'D. Chen',
    title: 'Practice Lead — Digital Transformation & Technology',
    practiceArea: 'digital-technology',
    location: 'Singapore',
    since: '2011',
    bio: 'Software architect and former CTO; leads the firm\'s technology practice across software platforms, networks, data, and digital experience. Operates the practice as a single team rather than four parallel disciplines.',
    expertise: ['Platform architecture', 'Network engineering', 'Data systems', 'OSS / BSS modernisation'],
  },
  {
    id: 'lead-education-institutional',
    initials: 'AO',
    name: 'A. Okonkwo',
    title: 'Practice Lead — Education & Institutional Development',
    practiceArea: 'education-institutional',
    location: 'London',
    since: '2010',
    bio: 'Former hospital chief operating officer and academic dean; leads the firm\'s healthcare, education, and institutional development practice. Focused on engagements where clinical or academic operating models evolve in step with platforms.',
    expertise: ['Health systems', 'Academic governance', 'Operating-model design', 'Capability transfer'],
  },
  {
    id: 'lead-enterprise-strategy',
    initials: 'EM',
    name: 'E. Müller',
    title: 'Practice Lead — Enterprise Strategy & Support Services',
    practiceArea: 'enterprise-strategy',
    location: 'London',
    since: '2008',
    bio: 'Strategy consultant by training; leads the firm\'s enterprise strategy and support services practice — brand, market intelligence, technical communication, and workforce-management solutions for institutional clients.',
    expertise: ['Brand strategy', 'Workforce management', 'Strategic communication', 'Operating support'],
  },
  {
    id: 'coo',
    initials: 'TH',
    name: 'T. Hassan',
    title: 'Chief Operating Officer',
    practiceArea: 'firm',
    location: 'London',
    since: '2012',
    bio: 'Operates the firm\'s shared governance, quality, and assurance framework across every engagement, regardless of pillar or geography. Owns programme assurance, operational risk, and the firm-wide capability standards.',
    expertise: ['Programme assurance', 'Operational risk', 'Quality framework', 'Firm operations'],
  },
  {
    id: 'head-international',
    initials: 'NB',
    name: 'N. Banerjee',
    title: 'Head of International Delivery',
    practiceArea: 'firm',
    location: 'Singapore',
    since: '2015',
    bio: 'Leads the firm\'s international delivery posture — the operating model that allows engagements to span multiple jurisdictions under one accountable lead. Spends the majority of her time on cross-border programmes in MENA, SSA, and APAC.',
    expertise: ['Cross-border delivery', 'Regional operations', 'Public sector engagements', 'International governance'],
  },
];

export const firmWideTitles = ['Managing Partner', 'Chief Operating Officer', 'Head of International Delivery'];

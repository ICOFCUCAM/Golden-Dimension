export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  image: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'accounting',
    title: 'Accounting',
    shortDescription: 'Comprehensive bookkeeping, auditing, tax preparation, and financial compliance services.',
    fullDescription: 'Golden Dimensions Ltd provides end-to-end accounting services designed to keep your business financially healthy and compliant. Our team of certified accountants delivers meticulous bookkeeping, thorough auditing, strategic tax preparation, detailed financial analysis, and full regulatory compliance services. We work with businesses of all sizes across multiple industries to ensure financial transparency and operational efficiency.',
    features: ['Bookkeeping & Financial Records', 'Internal & External Auditing', 'Tax Preparation & Planning', 'Financial Analysis & Reporting', 'Regulatory Compliance', 'Payroll Processing'],
    benefits: ['Reduced financial risk', 'Tax optimization strategies', 'Real-time financial visibility', 'Regulatory peace of mind'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977174340_4b0f7940.png',
    icon: 'Calculator'
  },
  {
    id: 'designing',
    title: 'Designing',
    shortDescription: 'Graphic design, product design, branding, UI/UX design, and visual identity systems.',
    fullDescription: 'Our creative design team transforms ideas into compelling visual experiences. From brand identity systems and graphic design to product design and UI/UX interfaces, we craft designs that communicate your brand\'s essence and engage your audience. We combine aesthetic excellence with strategic thinking to deliver designs that drive business results.',
    features: ['Brand Identity & Logo Design', 'UI/UX Design', 'Product Design', 'Marketing Collateral', 'Visual Identity Systems', 'Packaging Design'],
    benefits: ['Stronger brand recognition', 'Enhanced user experience', 'Consistent visual identity', 'Increased engagement'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977194837_13937f7c.png',
    icon: 'Palette'
  },
  {
    id: 'engineering',
    title: 'Engineering',
    shortDescription: 'Engineering consultancy, infrastructure planning, project management, and technical innovation.',
    fullDescription: 'Golden Dimensions delivers world-class engineering consultancy services spanning infrastructure planning, project management, and technical innovation. Our engineers bring decades of combined experience in civil, mechanical, electrical, and environmental engineering to solve complex challenges and deliver projects on time and within budget.',
    features: ['Infrastructure Planning', 'Project Management', 'Structural Engineering', 'Technical Innovation', 'Quality Assurance', 'Feasibility Studies'],
    benefits: ['Reduced project risk', 'Cost-effective solutions', 'Innovation-driven outcomes', 'On-time delivery'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977215644_33f51b04.png',
    icon: 'Wrench'
  },
  {
    id: 'education',
    title: 'Education',
    shortDescription: 'Academic consulting, tutoring programs, training workshops, and institutional partnerships.',
    fullDescription: 'We empower educational institutions and learners through comprehensive academic consulting, customized tutoring programs, professional training workshops, and strategic institutional partnerships. Our education specialists design programs that foster excellence, innovation, and lifelong learning across all levels of education.',
    features: ['Academic Consulting', 'Tutoring Programs', 'Corporate Training', 'Institutional Partnerships', 'Curriculum Development', 'E-Learning Solutions'],
    benefits: ['Improved learning outcomes', 'Skilled workforce development', 'Institutional excellence', 'Scalable education solutions'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977240203_4902cdad.jpg',
    icon: 'GraduationCap'
  },
  {
    id: 'environment',
    title: 'Environment',
    shortDescription: 'Environmental sustainability consulting, climate strategy, and green innovation projects.',
    fullDescription: 'Golden Dimensions is committed to building a sustainable future. Our environmental consulting services help organizations develop and implement effective sustainability strategies, comply with environmental regulations, and drive green innovation. We work across industries to reduce environmental impact while maintaining business growth.',
    features: ['Sustainability Strategy', 'Climate Risk Assessment', 'Environmental Compliance', 'Green Innovation', 'Carbon Footprint Analysis', 'Waste Management Solutions'],
    benefits: ['Reduced environmental impact', 'Regulatory compliance', 'Cost savings through efficiency', 'Enhanced corporate reputation'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977258998_4bfc5237.jpg',
    icon: 'Leaf'
  },
  {
    id: 'finance',
    title: 'Finance',
    shortDescription: 'Financial planning, investment advisory, wealth management, and risk analysis.',
    fullDescription: 'Our finance professionals provide strategic financial planning, expert investment advisory, comprehensive wealth management, and thorough risk analysis. We help individuals and organizations make informed financial decisions, optimize their portfolios, and achieve long-term financial security through data-driven strategies.',
    features: ['Financial Planning', 'Investment Advisory', 'Wealth Management', 'Risk Analysis', 'Portfolio Optimization', 'Financial Modeling'],
    benefits: ['Optimized returns', 'Risk mitigation', 'Long-term wealth growth', 'Informed decision-making'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977278005_0d9f47a5.jpg',
    icon: 'TrendingUp'
  },
  {
    id: 'giving',
    title: 'Giving',
    shortDescription: 'Charitable initiatives, social responsibility programs, and community development.',
    fullDescription: 'At Golden Dimensions, we believe in giving back. Our Giving division manages charitable initiatives, corporate social responsibility programs, and community development projects. We help organizations create meaningful impact through strategic philanthropy, volunteer programs, and sustainable community partnerships.',
    features: ['Charitable Initiatives', 'CSR Programs', 'Community Development', 'Volunteer Coordination', 'Impact Assessment', 'Fundraising Strategy'],
    benefits: ['Meaningful community impact', 'Enhanced brand reputation', 'Employee engagement', 'Sustainable social change'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977512052_0c8c8a55.png',
    icon: 'Heart'
  },
  {
    id: 'health',
    title: 'Health',
    shortDescription: 'Healthcare consulting, wellness initiatives, and health systems improvement.',
    fullDescription: 'Our healthcare consulting team works with hospitals, clinics, pharmaceutical companies, and health organizations to improve patient outcomes, optimize operations, and implement innovative health solutions. From wellness initiatives to health systems transformation, we deliver expertise that saves lives and improves care quality.',
    features: ['Healthcare Consulting', 'Wellness Programs', 'Health Systems Optimization', 'Patient Experience Design', 'Regulatory Compliance', 'Digital Health Solutions'],
    benefits: ['Improved patient outcomes', 'Operational efficiency', 'Regulatory compliance', 'Innovation in care delivery'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977301660_a8b4da81.png',
    icon: 'Stethoscope'
  },
  {
    id: 'legal-advice',
    title: 'Legal Advice',
    shortDescription: 'Legal compliance guidance, contract review, documentation services, and regulatory consulting.',
    fullDescription: 'Golden Dimensions provides comprehensive legal advisory services including compliance guidance, contract review and drafting, documentation services, and regulatory consulting. Our legal experts help businesses navigate complex legal landscapes, mitigate risks, and ensure full compliance with local and international regulations.',
    features: ['Legal Compliance', 'Contract Review & Drafting', 'Documentation Services', 'Regulatory Consulting', 'Dispute Resolution', 'Corporate Governance'],
    benefits: ['Legal risk mitigation', 'Regulatory compliance', 'Protected business interests', 'Expert legal guidance'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977490608_10d7a0d3.jpg',
    icon: 'Scale'
  },
  {
    id: 'marketing',
    title: 'Marketing',
    shortDescription: 'Brand strategy, digital campaigns, market research, and creative communication.',
    fullDescription: 'Our marketing team crafts powerful brand strategies, executes data-driven digital campaigns, conducts thorough market research, and creates compelling creative communications. We help businesses build strong brands, reach their target audiences, and achieve measurable marketing ROI across all channels.',
    features: ['Brand Strategy', 'Digital Marketing', 'Market Research', 'Content Marketing', 'Social Media Management', 'Campaign Analytics'],
    benefits: ['Increased brand awareness', 'Higher conversion rates', 'Data-driven decisions', 'Measurable ROI'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977327805_a3161e28.png',
    icon: 'Megaphone'
  },
  {
    id: 'programming',
    title: 'Programming',
    shortDescription: 'Software engineering, application development, automation systems, and digital transformation.',
    fullDescription: 'Golden Dimensions\' programming division delivers cutting-edge software engineering, custom application development, intelligent automation systems, and comprehensive digital transformation services. Our developers use the latest technologies and methodologies to build scalable, secure, and high-performance software solutions.',
    features: ['Custom Software Development', 'Mobile Applications', 'Cloud Solutions', 'Automation Systems', 'API Development', 'DevOps & CI/CD'],
    benefits: ['Scalable solutions', 'Reduced operational costs', 'Digital transformation', 'Competitive advantage'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977347507_5c1db369.jpg',
    icon: 'Code'
  },
  {
    id: 'telecom',
    title: 'Telecom',
    shortDescription: 'Telecommunications network design, installation, optimization, and maintenance.',
    fullDescription: 'Our telecommunications experts provide end-to-end network solutions including design, installation, optimization, and ongoing maintenance. We work with carriers, enterprises, and governments to build reliable, high-performance communication networks that connect people and businesses worldwide.',
    features: ['Network Design', 'Installation Services', 'Network Optimization', 'Maintenance & Support', '5G Solutions', 'Infrastructure Planning'],
    benefits: ['Reliable connectivity', 'Optimized performance', 'Future-ready networks', 'Reduced downtime'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977370549_8a38d5c2.png',
    icon: 'Radio'
  },
  {
    id: 'transport',
    title: 'Transport',
    shortDescription: 'Air freight, maritime cargo, ground transportation, and heavy cargo logistics.',
    fullDescription: 'Golden Transport provides comprehensive logistics solutions including air freight, maritime cargo shipping, ground transportation, and heavy cargo logistics. Our global network ensures your goods reach their destination safely, efficiently, and on time, no matter the size or complexity of the shipment.',
    features: ['Air Freight', 'Maritime Shipping', 'Ground Transport', 'Heavy Cargo', 'Supply Chain Management', 'Customs Clearance'],
    benefits: ['Global reach', 'On-time delivery', 'Cost-effective shipping', 'End-to-end tracking'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg',
    icon: 'Truck'
  },
  {
    id: 'umbrella-company',
    title: 'Umbrella Company',
    shortDescription: 'Payroll management and administrative services for contractors and freelancers.',
    fullDescription: 'Our Umbrella Company services provide seamless payroll management and administrative support for contractors, freelancers, and temporary workers. We handle all the complexities of employment administration, tax compliance, and benefits management so professionals can focus on what they do best.',
    features: ['Payroll Management', 'Tax Compliance', 'Benefits Administration', 'Contract Management', 'Invoice Processing', 'Employment Support'],
    benefits: ['Simplified administration', 'Tax compliance assurance', 'Focus on core work', 'Professional support'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977533418_9728a497.png',
    icon: 'Umbrella'
  },
  {
    id: 'websites',
    title: 'Websites',
    shortDescription: 'Custom website design and development with modern responsive technologies.',
    fullDescription: 'We create stunning, high-performance websites that drive business results. Our web development team specializes in custom design, responsive development, e-commerce solutions, and content management systems. Every website we build is optimized for speed, SEO, accessibility, and conversion.',
    features: ['Custom Web Design', 'Responsive Development', 'E-Commerce Solutions', 'CMS Integration', 'SEO Optimization', 'Performance Tuning'],
    benefits: ['Professional online presence', 'Higher conversion rates', 'Mobile-optimized experience', 'Search engine visibility'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977347507_5c1db369.jpg',
    icon: 'Globe'
  },
  {
    id: 'writing',
    title: 'Writing',
    shortDescription: 'Professional writing including business documentation, technical reports, and creative content.',
    fullDescription: 'Golden Dimensions\' writing services encompass professional business documentation, detailed technical reports, compelling creative content, and strategic communications. Our writers combine industry expertise with exceptional writing skills to produce content that informs, persuades, and inspires action.',
    features: ['Business Documentation', 'Technical Writing', 'Creative Content', 'Copywriting', 'Report Writing', 'Editorial Services'],
    benefits: ['Professional communication', 'Clear messaging', 'Engaging content', 'Brand consistency'],
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977443075_3804fe94.png',
    icon: 'PenTool'
  }
];

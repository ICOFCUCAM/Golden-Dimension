export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Golden Dimensions Expands Operations Across Southeast Asia',
    excerpt: 'Our firm announces strategic expansion into key Southeast Asian markets, establishing new offices in Singapore, Jakarta, and Ho Chi Minh City to better serve our growing client base in the region.',
    category: 'Company News',
    date: 'March 5, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg'
  },
  {
    id: '2',
    title: 'Sustainability Report 2025: Our Commitment to a Greener Future',
    excerpt: 'Golden Dimensions publishes its annual sustainability report, highlighting significant progress in carbon reduction, renewable energy adoption, and environmental consulting achievements.',
    category: 'Sustainability',
    date: 'February 28, 2026',
    readTime: '6 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977258998_4bfc5237.jpg'
  },
  {
    id: '3',
    title: 'Digital Transformation: How AI is Reshaping Financial Services',
    excerpt: 'Our technology and finance teams explore the intersection of artificial intelligence and financial services, examining how emerging technologies are creating new opportunities for growth.',
    category: 'Industry Insights',
    date: 'February 20, 2026',
    readTime: '5 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977278005_0d9f47a5.jpg'
  },
  {
    id: '4',
    title: 'Golden Transport Launches New Maritime Logistics Route',
    excerpt: 'Our logistics division introduces a new maritime shipping route connecting major ports across the Atlantic, reducing transit times by 15% and offering more competitive rates for clients.',
    category: 'Transport',
    date: 'February 15, 2026',
    readTime: '3 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977387826_06abad98.jpg'
  },
  {
    id: '5',
    title: 'Engineering Excellence: Award-Winning Infrastructure Project',
    excerpt: 'Golden Dimensions\' engineering team receives international recognition for their innovative approach to sustainable infrastructure development in emerging markets.',
    category: 'Engineering',
    date: 'February 10, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977215644_33f51b04.png'
  },
  {
    id: '6',
    title: 'The Future of Telecommunications: 5G and Beyond',
    excerpt: 'Our telecom experts analyze the rapid evolution of 5G networks and their implications for businesses, exploring how next-generation connectivity will transform industries worldwide.',
    category: 'Technology',
    date: 'February 5, 2026',
    readTime: '7 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977370549_8a38d5c2.png'
  },
  {
    id: '7',
    title: 'Healthcare Innovation: Improving Patient Outcomes Through Technology',
    excerpt: 'Golden Dimensions partners with leading healthcare institutions to implement digital health solutions that improve patient care, streamline operations, and reduce costs.',
    category: 'Healthcare',
    date: 'January 28, 2026',
    readTime: '5 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977301660_a8b4da81.png'
  },
  {
    id: '8',
    title: 'Community Impact: Our Annual Giving Report',
    excerpt: 'Reflecting on a year of meaningful community engagement, charitable initiatives, and social responsibility programs that have positively impacted thousands of lives across the globe.',
    category: 'Giving',
    date: 'January 20, 2026',
    readTime: '4 min read',
    image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977512052_0c8c8a55.png'
  }
];

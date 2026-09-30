export interface SubdomainItem {
  id: string;
  index?: string;
  name: string;
  url: string;
  category: string;
  status: string;
  isActive: boolean;
  accent: string;
  description: string;
}

export interface SiteConfig {
  domain: string;
  brand: string;
  githubUrl: string;
  copyrightYear: string;
}

export const SITE_CONFIG: SiteConfig = {
  domain: 'anrix.me',
  brand: 'ANRIX',
  githubUrl: 'https://github.com/anrix05',
  copyrightYear: '2026'
};

export const getSubdomainsLabel = (count: number): string =>
  `ANRIX NETWORK · ${count} ${count === 1 ? 'SUBDOMAIN' : 'SUBDOMAINS'}`;

export const SUBDOMAINS: SubdomainItem[] = [
  {
    id: 'portfolio',
    index: '01',
    name: 'Portfolio',
    url: 'https://portfolio.anrix.me',
    category: 'Projects & Bio',
    status: 'Active',
    isActive: true,
    accent: '#38bdf8',
    description: 'Flagship portfolio: web applications, client projects, professional experience.'
  },
  {
    id: 'graveyard',
    index: '02',
    name: 'Graveyard',
    url: 'https://graveyard.anrix.me',
    category: 'Archived Apps',
    status: '14 legacy builds',
    isActive: false,
    accent: '#34d399',
    description: 'Vault of sunsetted projects, legacy builds, old hackathon entries and code experiments.'
  },
  {
    id: 'zeroblur',
    index: '03',
    name: 'Zeroblur',
    url: 'https://zeroblur.anrix.me',
    category: 'Product & System',
    status: 'Active',
    isActive: true,
    accent: '#a855f7',
    description: 'High-performance digital product platform and system dashboard.'
  }
];

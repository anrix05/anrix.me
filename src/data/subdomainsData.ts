export interface SubdomainData {
  id: 'portfolio' | 'graveyard' | 'zeroblur';
  name: string;
  subdomain: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  color: string; // Primary hex color
  bgColor: string;
  badgeBg: string;
  buttonBg: string;
  buttonHover: string;
  iconType: 'briefcase' | 'ghost' | 'zap';
}

export const SUBDOMAINS: SubdomainData[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    subdomain: 'portfolio.anrix.me',
    url: 'https://portfolio.anrix.me',
    badge: 'Main Showcase',
    tagline: 'Main Showcase & Bio',
    description: 'My flagship portfolio showcasing projects, experience, skills & selected work.',
    color: '#2563EB', // Blue #2563EB
    bgColor: '#EFF6FF',
    badgeBg: '#2563EB',
    buttonBg: '#2563EB',
    buttonHover: '#1D4ED8',
    iconType: 'briefcase'
  },
  {
    id: 'graveyard',
    name: 'Graveyard',
    subdomain: 'graveyard.anrix.me',
    url: 'https://graveyard.anrix.me',
    badge: '14 Legacy Builds',
    tagline: '14 Legacy Builds & Archived Apps',
    description: 'A vault containing 14+ legacy projects, retired web applications, old experiments, hackathon builds & forgotten ideas.',
    color: '#16A34A', // Green #16A34A
    bgColor: '#F0FDF4',
    badgeBg: '#16A34A',
    buttonBg: '#16A34A',
    buttonHover: '#15803D',
    iconType: 'ghost'
  },
  {
    id: 'zeroblur',
    name: 'Zeroblur',
    subdomain: 'zeroblur.anrix.me',
    url: 'https://zeroblur.anrix.me',
    badge: 'Active App',
    tagline: 'Product Platform & System',
    description: 'A high-performance digital product platform and web application system.',
    color: '#9333EA', // Purple #9333EA
    bgColor: '#FAF5FF',
    badgeBg: '#9333EA',
    buttonBg: '#9333EA',
    buttonHover: '#7E22CE',
    iconType: 'zap'
  }
];

export const PERSONAL_INFO = {
  name: "ANRIX",
  domain: "anrix.me",
  heading: "Anrix.me",
  subheading: "One-click access to my full digital ecosystem, projects & archives.",
  github: "https://github.com/anrix05",
  email: "contact@anrix.me"
};

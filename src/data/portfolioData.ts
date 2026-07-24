export interface SubdomainNode {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  stat: string;
  category: string;
  icon: string;
  description: string;
  position: { x: number; y: number }; // Percentage position on screen canvas
  color: string;
}

export const PERSONAL_INFO = {
  name: "ANRIX",
  domain: "anrix.me",
  tagline: "One-click for Anrix Network",
  subtitle: "Direct access portal to all Anrix subdomains, applications, and archived projects.",
  badge: "⚡ Anrix Subdomain Navigation Portal →",
  subdomains: [
    { name: "Portfolio", url: "https://portfolio.anrix.me", desc: "Main project showcase & bio" },
    { name: "Graveyard", url: "https://graveyard.anrix.me", desc: "Retired apps & archived builds" },
    { name: "Zeroblur", url: "https://zeroblur.anrix.me", desc: "Zeroblur product & system" }
  ]
};

export const SUBDOMAIN_NODES: SubdomainNode[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    subdomain: "portfolio.anrix.me",
    url: "https://portfolio.anrix.me",
    stat: "Main Showcase",
    category: "Projects & Bio",
    icon: "Briefcase",
    description: "Main portfolio featuring flagship web applications, client work, and experience.",
    position: { x: 16, y: 36 },
    color: "#38bdf8" // Sky blue glow
  },
  {
    id: "graveyard",
    name: "Graveyard",
    subdomain: "graveyard.anrix.me",
    url: "https://graveyard.anrix.me",
    stat: "14 Legacy Builds",
    category: "Archived Apps",
    icon: "Skull",
    description: "Vault of sunsetted projects, old hackathon entries, and code experiments.",
    position: { x: 84, y: 36 },
    color: "#34d399" // Emerald glow
  },
  {
    id: "zeroblur",
    name: "Zeroblur",
    subdomain: "zeroblur.anrix.me",
    url: "https://zeroblur.anrix.me",
    stat: "Active App",
    category: "Product & System",
    icon: "Zap",
    description: "Zeroblur high-performance digital product platform.",
    position: { x: 50, y: 74 },
    color: "#a855f7" // Purple glow
  }
];

export const TECH_MARQUEE = [
  { name: "Portfolio", url: "https://portfolio.anrix.me", icon: "Briefcase" },
  { name: "Graveyard", url: "https://graveyard.anrix.me", icon: "Skull" },
  { name: "Zeroblur", url: "https://zeroblur.anrix.me", icon: "Zap" },
  { name: "Vercel", url: "#", icon: "Triangle" },
  { name: "Raycast", url: "#", icon: "Command" },
];

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: 'Smartphones' | 'Laptops' | 'Gadgets' | 'Reviews';
  views: string;
  date: string;
  youtubeId: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for simulation
  date: string;
  readTime: string;
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide icon name
}
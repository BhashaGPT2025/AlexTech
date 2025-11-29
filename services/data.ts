import { Video, BlogPost } from '../types';

// Initial Data (Fallbacks)
const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'iPhone 16 Pro Max: The Final Verdict',
    thumbnail: 'https://picsum.photos/seed/iphone16/1280/720',
    category: 'Smartphones',
    views: '1.2M',
    date: '2 days ago',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'M4 iPad Pro - Is it a Laptop Replacement?',
    thumbnail: 'https://picsum.photos/seed/ipadpro/1280/720',
    category: 'Reviews',
    views: '850K',
    date: '1 week ago',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'The Perfect Minimal Desk Setup 2024',
    thumbnail: 'https://picsum.photos/seed/desk/1280/720',
    category: 'Gadgets',
    views: '2.5M',
    date: '2 weeks ago',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Samsung Galaxy S25 Ultra Hands-on',
    thumbnail: 'https://picsum.photos/seed/galaxy/1280/720',
    category: 'Smartphones',
    views: '500K',
    date: '3 weeks ago',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'MacBook Air M3 - Still the King?',
    thumbnail: 'https://picsum.photos/seed/macbook/1280/720',
    category: 'Laptops',
    views: '900K',
    date: '1 month ago',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '6',
    title: 'Sony WH-1000XM6 Leaks & Rumors',
    thumbnail: 'https://picsum.photos/seed/headphones/1280/720',
    category: 'Gadgets',
    views: '300K',
    date: '1 month ago',
    youtubeId: 'dQw4w9WgXcQ'
  }
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-ai-wearables',
    title: 'The Future of AI Wearables is Invisible',
    excerpt: 'Why the next generation of tech won\'t be a screen in your pocket, but a subtle layer on your reality.',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/ai/800/600',
    content: `<p>We are standing on the precipice of a new era in personal computing. The screen, once our primary window into the digital world, is beginning to dissolve.</p><br/><p>With the advent of devices like the Humane Pin (despite its flaws) and the Rabbit R1, the industry is signaling a shift away from app-centric interfaces to intent-centric interactions. But the real revolution isn't in dedicated hardware—it's in the integration of AI into form factors we already wear.</p>`
  },
  {
    id: '2',
    slug: 'switching-to-android',
    title: 'I Switched to Android for 30 Days',
    excerpt: 'As a long-time Apple ecosystem user, breaking the walled garden was harder (and easier) than I thought.',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/android/800/600',
    content: `<p>The blue bubble anxiety is real. But so is the freedom of customization.</p><br/><p>Moving from an iPhone 15 Pro Max to the Pixel 9 Pro was an exercise in unlearning muscle memory. The notification system on Android remains superior, offering granular control that iOS still struggles to match. However, the ecosystem friction—AirDrop, iMessage, Universal Clipboard—is the real moat keeping users locked in.</p>`
  },
  {
    id: '3',
    slug: 'camera-tech-explained',
    title: 'Why Megapixels Don\'t Matter Anymore',
    excerpt: 'Computational photography has rendered the spec sheet obsolete. Here is what you should actually look for.',
    date: 'Sep 15, 2024',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/camera/800/600',
    content: `<p>Marketing teams love big numbers. 200MP sensors sound impressive on a box, but physics imposes limits on light collection per pixel.</p><br/><p>The magic today happens in the ISP (Image Signal Processor) and the NPU (Neural Processing Unit). We're essentially taking bursts of data and reconstructing reality—or an idealized version of it—using algorithms.</p>`
  }
];

// Helper to get data from local storage or fallback to initial
const getStoredData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error accessing localStorage", e);
    return fallback;
  }
};

// Data Accessors
export const getVideos = (): Video[] => getStoredData('videos', INITIAL_VIDEOS);

export const getBlogPosts = (): BlogPost[] => getStoredData('posts', INITIAL_BLOG_POSTS);

// Data Mutators (Simulating Admin Actions)
export const addVideo = (video: Video) => {
  const current = getVideos();
  const updated = [video, ...current];
  localStorage.setItem('videos', JSON.stringify(updated));
  return updated;
};

export const addBlogPost = (post: BlogPost) => {
  const current = getBlogPosts();
  const updated = [post, ...current];
  localStorage.setItem('posts', JSON.stringify(updated));
  return updated;
};

// Export initial constants for reference if needed
export const videos = INITIAL_VIDEOS; 
export const blogPosts = INITIAL_BLOG_POSTS;
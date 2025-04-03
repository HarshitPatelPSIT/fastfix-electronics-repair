export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  author?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Extend Your Smartphone Battery Life',
    slug: 'extend-smartphone-battery-life',
    excerpt: 'Learn simple techniques to maximize your phone\'s battery performance and longevity with these expert tips.',
    image: 'https://images.unsplash.com/photo-1563884072595-25dbcf1faacd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Tips & Tricks',
    date: '2025-04-01'
  },
  {
    id: 2,
    title: '5 Common Laptop Problems and How to Fix Them',
    slug: 'common-laptop-problems-solutions',
    excerpt: 'Discover DIY solutions for common laptop issues like slow performance, overheating, and battery problems.',
    image: 'https://images.unsplash.com/photo-1605789538467-68d8a433ca8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Troubleshooting',
    date: '2025-03-28'
  },
  {
    id: 3,
    title: 'Keep Your Gaming Console Cool: A Maintenance Guide',
    slug: 'gaming-console-cooling-maintenance',
    excerpt: 'Learn proper cooling techniques and maintenance tips to prevent overheating and extend your console\'s lifespan.',
    image: 'https://images.unsplash.com/photo-1623126908029-58c58da8037a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Maintenance',
    date: '2025-03-15'
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Choosing a Screen Protector',
    slug: 'choosing-screen-protector-guide',
    excerpt: 'Everything you need to know about different types of screen protectors and which one is right for your device.',
    image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Guides',
    date: '2025-03-10'
  },
  {
    id: 5,
    title: 'When to Repair vs. When to Replace Your Device',
    slug: 'repair-vs-replace-decision-guide',
    excerpt: 'A comprehensive guide to help you decide whether repairing or replacing your damaged device is the better option.',
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Advice',
    date: '2025-03-05'
  },
  {
    id: 6,
    title: 'The Future of Smartphone Repair: 2025 Trends',
    slug: 'smartphone-repair-trends-2025',
    excerpt: 'Explore the latest innovations and trends in smartphone repair technology and what they mean for consumers.',
    image: 'https://images.unsplash.com/photo-1550367083-9fa5414c55da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80',
    category: 'Industry News',
    date: '2025-02-28'
  }
];

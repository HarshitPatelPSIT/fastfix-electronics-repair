export interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Smartphone Repair',
    description: 'Screen replacement, battery replacement, charging port repair, water damage recovery, and more.',
    duration: '1-2 hours',
    price: 49,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  },
  {
    id: 2,
    title: 'Tablet Repair',
    description: 'Screen replacement, battery service, button repair, charging problems, and software troubleshooting.',
    duration: '2-3 hours',
    price: 69,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  },
  {
    id: 3,
    title: 'Computer Repair',
    description: 'Hardware upgrades, virus removal, data recovery, system optimization, and component replacement.',
    duration: '24-48 hours',
    price: 89,
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  },
  {
    id: 4,
    title: 'Game Console Repair',
    description: 'Disc drive repair, HDMI port replacement, overheating issues, power problems, and controller repairs.',
    duration: '1-3 days',
    price: 79,
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  },
  {
    id: 5,
    title: 'Data Recovery',
    description: 'Recover lost or deleted data from smartphones, tablets, hard drives, and other storage devices.',
    duration: '2-5 days',
    price: 129,
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  },
  {
    id: 6,
    title: 'Liquid Damage Treatment',
    description: 'Specialized cleaning and repair for devices damaged by water, coffee, or other liquids.',
    duration: '1-3 days',
    price: 99,
    image: 'https://images.unsplash.com/photo-1592439025152-00681965fa1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80'
  }
];

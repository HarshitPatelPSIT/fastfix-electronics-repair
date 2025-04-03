export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'David Chen',
    role: 'Technical Director',
    bio: '15+ years experience in electronics repair. Apple and Samsung certified technician.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Senior Repair Specialist',
    bio: 'Specializes in smartphone and tablet microsoldering repairs. Computer science background.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 3,
    name: 'Michael Torres',
    role: 'Computer Systems Expert',
    bio: 'Specialized in computer hardware, software troubleshooting, and data recovery solutions.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80'
  }
];

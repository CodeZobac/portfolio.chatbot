import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'etic-algarve',
    title: 'Full-Stack Developer & Solutions Architect',
    company: 'ETIC Algarve',
    period: '2024 - 2025',
    location: 'Faro, Portugal',
    type: 'tech',
    achievements: [
      'Architected and delivered ETIC Resource Hub in 2 weeks - a centralized management platform serving 200+ students and staff',
      'Made strategic decision to rebuild legacy application rather than refactor, creating a modern, scalable foundation',
      'Designed full-stack architecture from Supabase database to Next.js frontend with TypeScript',
      'Implemented role-based access control and real-time data synchronization',
      'Reduced operational overhead by centralizing resource management and automating workflows'
    ],
    responsibilities: [
      'Full-stack development and architecture decisions',
      'Database design and optimization',
      'API development and integration',
      'Frontend development with React and Next.js',
      'Infrastructure setup and deployment',
      'Stakeholder communication and requirements gathering'
    ],
    technologies: [
      'TypeScript',
      'Next.js',
      'React',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Vercel'
    ]
  },
  {
    id: 'hospitality-operations',
    title: 'Operations Manager & Team Leader',
    company: 'High-Volume Hospitality',
    period: '2018 - 2023',
    location: 'Algarve, Portugal',
    type: 'hospitality',
    achievements: [
      'Led teams of 15+ staff in high-pressure, fast-paced environments',
      'Managed operations serving 500+ customers daily during peak season',
      'Developed stakeholder management skills working with diverse customers and suppliers',
      'Built emotional intelligence and conflict resolution capabilities',
      'Optimized workflows and processes to improve efficiency and customer satisfaction'
    ],
    responsibilities: [
      'Team leadership and staff management',
      'Operations planning and execution',
      'Customer relationship management',
      'Problem-solving under pressure',
      'Resource allocation and optimization',
      'Quality control and service standards'
    ],
    technologies: []
  }
];

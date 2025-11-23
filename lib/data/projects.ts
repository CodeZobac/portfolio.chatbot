import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'gyst',
    name: 'Gyst - Your AI-Powered Knowledge Brain',
    tagline: 'AI-Native Knowledge Management Platform',
    description: 'An AI-native knowledge management platform that transforms static documents into a dynamic, conversational knowledge network for teams.',
    problem: 'Teams struggle with static, disconnected documentation that becomes outdated and difficult to search. Knowledge is scattered across wikis, docs, and chat logs.',
    solution: 'Architected an AI-native platform using agentic AI (CrewAI) for intelligent document analysis and tagging, combined with a RAG pipeline for accurate conversational search.',
    role: 'Solutions Architect & Lead Developer',
    keyDecisions: [
      'Implemented agentic system with CrewAI for document analysis, tagging, and relationship mapping',
      'Built RAG pipeline to ensure responses are grounded in actual documents, not hallucinated',
      'Chose FastAPI for high-performance async operations needed for AI agent orchestration',
      'Designed reactive Next.js frontend for instant, natural conversational search experience'
    ],
    techStack: [
      'Next.js',
      'FastAPI',
      'TypeScript',
      'CrewAI',
      'RAG',
      'NLP',
      'PostgreSQL',
      'Docker'
    ],
    category: 'ai',
    featured: true,
    image: '/projects/gyst.svg',
    links: {
      github: 'https://github.com/afonsocaboz/gyst'
    }
  },
  {
    id: 'bottleneck-ninja',
    name: 'Bottleneck Ninja',
    tagline: 'AI-Powered PC Build Optimizer',
    description: 'An intelligent system that analyzes PC component configurations to identify performance bottlenecks and provide optimization recommendations.',
    problem: 'PC builders struggle to identify performance bottlenecks in their configurations, often overspending on components that don\'t improve overall system performance.',
    solution: 'Built an AI-powered analysis tool using CrewAI agents that evaluates component compatibility, identifies bottlenecks, and suggests optimal configurations based on use case and budget.',
    role: 'Solo Developer & Architect',
    keyDecisions: [
      'Chose CrewAI for multi-agent orchestration to handle complex analysis workflows',
      'Implemented RAG pipeline to keep hardware knowledge base current with latest components',
      'Designed modular agent system for scalability and maintainability',
      'Selected FastAPI for high-performance API with async capabilities'
    ],
    techStack: [
      'Python',
      'FastAPI',
      'CrewAI',
      'RAG Pipeline',
      'OpenAI API',
      'React',
      'TypeScript',
      'Tailwind CSS'
    ],
    category: 'ai',
    featured: true,
    image: '/projects/bottleneck-ninja.svg',
    links: {
      github: 'https://github.com/afonsocaboz/bottleneck-ninja',
      demo: 'https://bottleneck-ninja.vercel.app'
    }
  },
  {
    id: 'etic-hub',
    name: 'ETIC Resource Hub',
    tagline: 'Centralized Management Platform for Educational Institution',
    description: 'A comprehensive resource management system serving 200+ students and staff at ETIC Algarve, centralizing schedules, materials, and administrative workflows.',
    problem: 'ETIC Algarve had a legacy application that was difficult to maintain and lacked modern features. Resources were scattered across multiple systems, creating operational inefficiencies.',
    solution: 'Made the strategic decision to rebuild from scratch rather than refactor. Delivered a modern, scalable platform in 2 weeks with role-based access control, real-time updates, and intuitive UX.',
    role: 'Lead Developer & Solutions Architect',
    keyDecisions: [
      'Strategic rebuild vs refactor decision - prioritized long-term maintainability',
      'Chose Supabase for rapid development with built-in auth and real-time capabilities',
      'Implemented Next.js App Router for optimal performance and SEO',
      'Designed database schema to support future feature expansion',
      'Delivered MVP in 2 weeks to validate approach before full feature rollout'
    ],
    techStack: [
      'TypeScript',
      'Next.js 15',
      'React',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Vercel'
    ],
    category: 'web',
    featured: true,
    image: '/projects/etic-hub.svg',
    links: {
      live: 'https://etic-hub.vercel.app'
    }
  },
  {
    id: 'cybercompass',
    name: 'CyberCompass',
    tagline: 'Interactive Digital Ethics Simulator',
    description: 'An educational platform that teaches digital ethics through interactive scenarios and real-world case studies.',
    problem: 'Digital ethics education is often theoretical and disconnected from real-world decision-making. Students need practical experience navigating ethical dilemmas.',
    solution: 'Created an interactive simulator with branching scenarios that present realistic ethical challenges. Users make decisions and see consequences, learning through experience rather than lectures.',
    role: 'Full-Stack Developer',
    keyDecisions: [
      'Chose Vue.js for reactive UI to handle complex state management in branching scenarios',
      'Implemented MongoDB for flexible schema to accommodate diverse scenario types',
      'Designed decision tree engine for scalable scenario creation',
      'Built analytics dashboard to track learning outcomes'
    ],
    techStack: [
      'Vue.js',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'Chart.js'
    ],
    category: 'web',
    featured: true,
    image: '/projects/cybercompass.svg',
    links: {
      github: 'https://github.com/afonsocaboz/cybercompass'
    }
  },
  {
    id: 'goalkeeper-finder',
    name: 'Goalkeeper-Finder',
    tagline: 'On-Demand Athlete Marketplace',
    description: 'A full-stack mobile application that functions as an "Uber for goalkeepers," connecting teams with available goalkeepers through real-time booking, rating, and notification systems.',
    problem: 'Amateur football teams constantly struggle to find reliable goalkeepers for their games, causing cancellations and frustration.',
    solution: 'Built a two-sided marketplace mobile app (Flutter) with real-time booking, ratings, and push notifications to seamlessly connect teams with available goalkeepers.',
    role: 'Solo Developer & Product Designer',
    keyDecisions: [
      'Chose Flutter for native performance on both iOS and Android with single codebase',
      'Implemented Supabase for robust user profiles, availability scheduling, and transactional integrity',
      'Designed two-sided marketplace with separate interfaces optimized for players and goalkeepers',
      'Integrated Firebase Cloud Messaging (FCM) for instant booking notifications',
      'Used OpenStreetMap for location-based search to reduce costs'
    ],
    techStack: [
      'Flutter',
      'Dart',
      'Supabase',
      'PostgreSQL',
      'Firebase (FCM)',
      'OpenStreetMap'
    ],
    category: 'mobile',
    featured: true,
    image: '/projects/goalkeeper-finder.svg',
    links: {
      github: 'https://github.com/afonsocaboz/goalkeeper-finder'
    }
  },
  {
    id: 'global-search-launcher',
    name: 'Global Search Launcher',
    tagline: 'Productivity Super-tool for Windows',
    description: 'A high-performance desktop application for Windows that provides a system-wide, keyboard-first search interface, aggregating files, applications, clipboard history, and browser bookmarks.',
    problem: 'Windows lacks a powerful, system-wide search tool like macOS\'s Spotlight or Alfred. Users waste time navigating file explorers and hunting for information.',
    solution: 'Built a high-performance desktop app with Rust backend (Tauri) for speed and low resource consumption, providing instant access to information and dramatically accelerated workflow.',
    role: 'Solo Developer & System Architect',
    keyDecisions: [
      'Chose Rust backend (Tauri) for system-level integration, performance, and low resource consumption',
      'Integrated Everything SDK for blazing-fast file indexing on Windows',
      'Built keyboard-first React UI that feels native to Windows',
      'Implemented global keyboard shortcuts and system tray integration',
      'Optimized for sub-100ms search response times'
    ],
    techStack: [
      'Rust',
      'Tauri',
      'React',
      'TypeScript',
      'Everything SDK'
    ],
    category: 'web',
    featured: true,
    image: '/projects/global-search-launcher.svg',
    links: {
      github: 'https://github.com/afonsocaboz/global-search-launcher'
    }
  },
  {
    id: 'family-recipes',
    name: 'Family Recipes',
    tagline: 'Modern Platform for Culinary Traditions',
    description: 'A modern, full-stack web application designed to preserve and share family culinary traditions with private family groups, rich markdown formatting, and interactive 3D animated interface.',
    problem: 'Family culinary traditions are often lost or scattered across handwritten notes, photos, and memories. There\'s no modern, delightful way to preserve and share these traditions.',
    solution: 'Created a polished web platform using Next.js 15 with React Server Components, secure authentication (NextAuth v5), and elegant UI/UX (shadcn/ui, Motion) to make technology feel personal and warm.',
    role: 'Full-Stack Developer & UX Designer',
    keyDecisions: [
      'Leveraged Next.js 15 with React Server Components for optimal performance and SEO',
      'Implemented NextAuth v5 for secure authentication with multiple providers',
      'Chose Supabase for rapid development with PostgreSQL reliability and file storage',
      'Used shadcn/ui + Motion for polished, delightful user experience with 3D animations',
      'Selected markdown for recipe formatting to balance flexibility with simplicity'
    ],
    techStack: [
      'Next.js 15',
      'React Server Components',
      'TypeScript',
      'Supabase',
      'NextAuth v5',
      'Tailwind CSS',
      'shadcn/ui',
      'Motion'
    ],
    category: 'web',
    featured: true,
    image: '/projects/family-recipes.svg',
    links: {
      github: 'https://github.com/afonsocaboz/family-recipes'
    }
  },
  {
    id: 'restaurant-manager',
    name: 'Restaurant Manager',
    tagline: 'Comprehensive Restaurant Operations Platform',
    description: 'A full-featured restaurant management system handling reservations, orders, inventory, and staff scheduling.',
    problem: 'Drawing from my hospitality experience, I identified that restaurants struggle with fragmented systems for different operations, leading to inefficiencies and errors.',
    solution: 'Built an integrated platform that unifies all restaurant operations in one system. Applied my operational knowledge from managing high-volume hospitality to design workflows that match real-world needs.',
    role: 'Solo Developer & Product Designer',
    keyDecisions: [
      'Leveraged hospitality experience to design intuitive workflows for staff',
      'Chose React Native for cross-platform mobile support (iOS/Android)',
      'Implemented offline-first architecture for reliability during internet outages',
      'Selected PostgreSQL for complex relational data (reservations, inventory, staff)',
      'Built real-time order tracking with WebSocket integration'
    ],
    techStack: [
      'React Native',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'WebSocket',
      'Redux',
      'Expo'
    ],
    category: 'mobile',
    featured: false,
    image: '/projects/restaurant-manager.svg',
    links: {
      github: 'https://github.com/afonsocaboz/restaurant-manager'
    }
  }
];

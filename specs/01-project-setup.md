# Spec 01: Project Setup & Configuration

## Goal
Set up a Next.js 15 project with TypeScript, Tailwind CSS, and configure the Vercel AI SDK to work with Google Gemini Flash.

## Requirements

### 1. Initialize Next.js Project
- Create a new Next.js 15 project with App Router
- Enable TypeScript
- Configure Tailwind CSS
- Set up the project structure

### 2. Install Dependencies
```bash
npm install ai @ai-sdk/google-generative-ai zod
npm install -D @types/node typescript
```

### 3. Project Structure
```
portfolio/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── InputForm.tsx
│   └── portfolio/
│       ├── ExperienceCard.tsx
│       ├── ProjectsGrid.tsx
│       ├── SkillsChart.tsx
│       └── ContactForm.tsx
├── lib/
│   ├── ai/
│   │   ├── system-prompt.ts
│   │   └── tools.ts
│   └── data/
│       ├── experience.ts
│       ├── projects.ts
│       └── skills.ts
├── .env.local
└── next.config.js
```

### 4. Environment Variables
Create `.env.local`:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 5. Configure Gemini in AI SDK
Create `lib/ai/config.ts`:
```typescript
import { google } from '@ai-sdk/google-generative-ai';

export const model = google('gemini-2.0-flash-exp', {
  // Optional: Configure model parameters
  safetySettings: [
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_ONLY_HIGH',
    },
  ],
});
```

### 6. Basic Layout Setup
Update `app/layout.tsx`:
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Portfolio - [Your Name]',
  description: 'Interactive AI-powered portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 7. Tailwind Configuration
Update `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

## Acceptance Criteria
- [ ] Next.js 15 project is initialized with TypeScript
- [ ] Tailwind CSS is configured and working
- [ ] All required dependencies are installed
- [ ] Project structure matches the specification
- [ ] Environment variables are set up
- [ ] Gemini model is configured with AI SDK
- [ ] Basic layout renders without errors
- [ ] Development server runs successfully (`npm run dev`)

## Testing
1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Verify no console errors
4. Verify Tailwind styles are applied

## Notes
- Use `gemini-flash-latest` for the latest Gemini Flash model
- Keep API key secure in `.env.local` (never commit it)
- The AI SDK's Google provider handles authentication automatically
- Gemini Flash is cost-effective and fast for this use case

## Next Steps
After completing this spec, move to:
- **Spec 02**: Define personal data and system prompt

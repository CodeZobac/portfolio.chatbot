# Spec 06: Portfolio UI Components

## Goal
Create reusable UI components that render when the AI calls specific tools, displaying experience, projects, skills, education, and contact information.

## Requirements

### 1. Experience Card Component

#### `components/portfolio/ExperienceCard.tsx`
```typescript
import { Experience } from '@/lib/data/experience';

interface ExperienceCardProps {
  data: Experience[];
  highlight?: string;
}

export default function ExperienceCard({ data, highlight }: ExperienceCardProps) {
  return (
    <div className="mt-4 space-y-4">
      {data.map((exp) => (
        <div
          key={exp.id}
          className={`border-l-4 pl-4 ${
            highlight && exp.company.toLowerCase().includes(highlight.toLowerCase())
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
        >
          <h3 className="font-bold text-lg">{exp.title}</h3>
          <p className="text-gray-600">
            {exp.company} • {exp.location} • {exp.period}
          </p>
          <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
          
          <ul className="mt-2 space-y-1">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="text-sm">
                ✓ {achievement}
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {exp.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gray-200 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 2. Projects Grid Component

Create `components/portfolio/ProjectsGrid.tsx` - see full spec

### 3. Skills Chart Component

Create `components/portfolio/SkillsChart.tsx` - see full spec

### 4. Education Component

Create `components/portfolio/EducationCard.tsx` - see full spec

### 5. Contact Form Component

Create `components/portfolio/ContactForm.tsx` - see full spec

## Acceptance Criteria
- [ ] All 5 components are created
- [ ] Components render data correctly
- [ ] Styling is consistent
- [ ] Components are responsive
- [ ] Animations work smoothly
- [ ] No TypeScript errors

## Next Steps
Move to **Spec 07**: Testing and deployment

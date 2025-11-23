# AI Portfolio Project - Specs Overview

## Project Vision
Build an interactive AI-powered portfolio where recruiters can chat with an AI assistant that knows everything about you. The AI dynamically renders pre-built UI components (experience timeline, project gallery, skills chart, etc.) based on the conversation context.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **AI Model**: Google Gemini 2.0 Flash (via Vercel AI SDK)
- **Styling**: Tailwind CSS
- **AI Integration**: Vercel AI SDK with function calling

## Why Gemini Flash?
- **Cost-effective**: Much cheaper than GPT-4
- **Fast**: Low latency for real-time chat
- **Function calling**: Excellent support for tool use
- **Multimodal**: Can handle text and images
- **Free tier**: Generous free quota for development

## Implementation Approach

### Phase 1: Foundation (Specs 01-02)
Set up the project structure and define your personal data

### Phase 2: AI Integration (Specs 03-04)
Configure tools and create the API route with Gemini

### Phase 3: UI Development (Specs 05-06)
Build the chat interface and portfolio components

### Phase 4: Launch (Spec 07)
Test and deploy to production

## Spec Files

### [Spec 01: Project Setup](./01-project-setup.md)
- Initialize Next.js with TypeScript
- Install dependencies (AI SDK, Gemini provider)
- Configure Tailwind CSS
- Set up project structure
- Configure environment variables

**Time Estimate**: 30 minutes

---

### [Spec 02: Data & System Prompt](./02-data-and-system-prompt.md)
- Create data files (experience, projects, skills, education)
- Write comprehensive system prompt
- Define personality and conversation guidelines
- Add example interactions

**Time Estimate**: 2-3 hours (depends on how much content you have)

---

### [Spec 03: Tool Definitions](./03-tool-definitions.md)
- Define 6 tools for component rendering
- Implement tool execution logic
- Add filtering and data processing
- Create TypeScript types

**Time Estimate**: 1-2 hours

---

### [Spec 04: API Route](./04-api-route.md)
- Create Next.js API route
- Integrate Gemini Flash model
- Enable streaming responses
- Add error handling

**Time Estimate**: 30 minutes

---

### [Spec 05: Chat Interface](./05-chat-interface.md)
- Build main chat page
- Create message bubble component
- Implement input form
- Add loading states
- Handle tool call rendering

**Time Estimate**: 2-3 hours

---

### [Spec 06: Portfolio Components](./06-portfolio-components.md)
- Build ExperienceCard component
- Create ProjectsGrid component
- Implement SkillsChart component
- Add EducationCard component
- Create ContactForm component

**Time Estimate**: 3-4 hours

---

### [Spec 07: Testing & Deployment](./07-testing-deployment.md)
- Test all conversation flows
- Verify component rendering
- Deploy to Vercel
- Configure production environment

**Time Estimate**: 1-2 hours

---

## Total Time Estimate
**10-15 hours** for complete implementation

## Key Features

### 1. Conversational AI
- Natural language understanding
- Context-aware responses
- Personality-driven interactions

### 2. Dynamic Component Rendering
- Components only render when relevant
- Smooth animations and transitions
- Responsive design

### 3. Smart Tool Calling
- AI decides when to show components
- Can call multiple tools in sequence
- Filters data based on context

### 4. Professional Presentation
- Clean, modern UI
- Mobile-responsive
- Fast loading times

## Development Workflow

### For Each Spec:
1. Read the spec document thoroughly
2. Create/modify the specified files
3. Test the implementation
4. Check off acceptance criteria
5. Move to next spec

### Using with AI Agents:
Each spec is designed to be fed to an AI coding agent (like Kiro) as a complete, self-contained task. The agent should:
- Read the spec
- Implement the requirements
- Test the implementation
- Confirm completion

## Project Structure
```
portfolio/
├── app/
│   ├── api/chat/route.ts          # Spec 04
│   ├── layout.tsx                  # Spec 01
│   └── page.tsx                    # Spec 05
├── components/
│   ├── chat/
│   │   ├── MessageBubble.tsx      # Spec 05
│   │   └── InputForm.tsx          # Spec 05
│   └── portfolio/
│       ├── ExperienceCard.tsx     # Spec 06
│       ├── ProjectsGrid.tsx       # Spec 06
│       ├── SkillsChart.tsx        # Spec 06
│       ├── EducationCard.tsx      # Spec 06
│       └── ContactForm.tsx        # Spec 06
├── lib/
│   ├── ai/
│   │   ├── system-prompt.ts       # Spec 02
│   │   ├── tools.ts               # Spec 03
│   │   └── types.ts               # Spec 03
│   └── data/
│       ├── experience.ts          # Spec 02
│       ├── projects.ts            # Spec 02
│       ├── skills.ts              # Spec 02
│       └── personal.ts            # Spec 02
├── specs/                          # This directory
└── .env.local                      # Spec 01
```

## Getting Started

1. **Read the main research document**: `ai-portfolio-research.md`
2. **Start with Spec 01**: Set up the project foundation
3. **Work sequentially**: Each spec builds on the previous
4. **Test frequently**: Verify each component works before moving on
5. **Customize**: Adapt the specs to your needs

## Tips for Success

### 1. Start Simple
- Begin with basic data (2-3 experiences, 3-5 projects)
- You can always add more later

### 2. Test Early
- Test the API route before building the UI
- Verify tool calling works correctly

### 3. Iterate on the System Prompt
- The prompt is crucial for good AI behavior
- Refine it based on actual conversations

### 4. Focus on Content
- Good content > fancy animations
- Make sure your data is accurate and compelling

### 5. Monitor Costs
- Gemini Flash is cheap, but monitor usage
- Set up billing alerts in Google Cloud

## Common Issues & Solutions

### Issue: AI doesn't call tools
**Solution**: Improve tool descriptions in the system prompt

### Issue: Components don't render
**Solution**: Check tool output types match component props

### Issue: Slow responses
**Solution**: Reduce maxSteps or optimize tool execution

### Issue: API errors
**Solution**: Verify API key and check error logs

## Next Steps After Completion

1. **Gather Feedback**: Share with friends/colleagues
2. **Analyze Conversations**: See what recruiters ask most
3. **Add Features**: 
   - Testimonials component
   - Blog posts integration
   - GitHub activity feed
   - Analytics dashboard
4. **Optimize**:
   - Add caching
   - Improve loading times
   - Enhance mobile experience
5. **Promote**:
   - Share on LinkedIn
   - Add to resume
   - Include in job applications

## Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Support

If you get stuck:
1. Check the main research document
2. Review the specific spec's acceptance criteria
3. Test each component in isolation
4. Use console.log to debug
5. Check the AI SDK examples

---

**Ready to start?** Begin with [Spec 01: Project Setup](./01-project-setup.md)!

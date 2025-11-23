# Spec 07: Testing & Deployment

## Goal
Test the complete application and deploy to production.

## Requirements

### 1. Testing Checklist

#### Functional Testing
- [ ] Chat interface loads without errors
- [ ] Messages send and receive correctly
- [ ] AI responds appropriately to questions
- [ ] Tool calls trigger correct components
- [ ] All components render with correct data
- [ ] Loading states display properly
- [ ] Error handling works

#### Component Testing
- [ ] ExperienceCard displays all experiences
- [ ] ProjectsGrid shows projects with images
- [ ] SkillsChart renders skill bars correctly
- [ ] EducationCard shows degrees and certs
- [ ] ContactForm displays contact info

#### Conversation Testing
Test these conversation flows:
- [ ] "Tell me about your experience"
- [ ] "What projects have you built?"
- [ ] "What are your skills?"
- [ ] "Show me your education"
- [ ] "How can I contact you?"
- [ ] "Do you have experience with [technology]?"
- [ ] "Show me your resume"

### 2. Performance Testing
- [ ] Initial page load < 3 seconds
- [ ] AI responses stream smoothly
- [ ] No memory leaks
- [ ] Images load efficiently

### 3. Deployment

#### Environment Variables
Set in Vercel:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_key
```

#### Deploy to Vercel
```bash
npm run build
vercel --prod
```

## Acceptance Criteria
- [ ] All tests pass
- [ ] No console errors
- [ ] Application deployed successfully
- [ ] Environment variables configured
- [ ] Custom domain set up (optional)

## Next Steps
Monitor usage and iterate based on feedback!

# AI Portfolio Specs - Quick Start Guide

## 📋 What You Have

7 detailed specification documents that break down the entire AI portfolio project into manageable chunks. Each spec is designed to be fed to an AI coding agent or followed manually.

## 🎯 Quick Start

### Option 1: Use with AI Agent (Recommended)
```
1. Open Kiro (or your AI coding assistant)
2. Share Spec 01 with the agent
3. Let it implement the spec
4. Verify the implementation
5. Move to Spec 02
6. Repeat until complete
```

### Option 2: Manual Implementation
```
1. Read Spec 01
2. Create the files as specified
3. Check off acceptance criteria
4. Test the implementation
5. Move to next spec
```

## 📁 Spec Files

| Spec | Title | Time | Dependencies |
|------|-------|------|--------------|
| [00](./00-overview.md) | Overview | - | None (read first!) |
| [01](./01-project-setup.md) | Project Setup | 30 min | None |
| [02](./02-data-and-system-prompt.md) | Data & System Prompt | 2-3 hrs | Spec 01 |
| [03](./03-tool-definitions.md) | Tool Definitions | 1-2 hrs | Spec 02 |
| [04](./04-api-route.md) | API Route | 30 min | Spec 03 |
| [05](./05-chat-interface.md) | Chat Interface | 2-3 hrs | Spec 04 |
| [06](./06-portfolio-components.md) | Portfolio Components | 3-4 hrs | Spec 05 |
| [07](./07-testing-deployment.md) | Testing & Deployment | 1-2 hrs | Spec 06 |

**Total Time: 10-15 hours**

## 🚀 Recommended Workflow

### Day 1: Foundation (3-4 hours)
- ✅ Spec 01: Project Setup
- ✅ Spec 02: Data & System Prompt
- ✅ Spec 03: Tool Definitions

### Day 2: Backend (1 hour)
- ✅ Spec 04: API Route
- 🧪 Test API with curl/Postman

### Day 3: Frontend (5-6 hours)
- ✅ Spec 05: Chat Interface
- ✅ Spec 06: Portfolio Components
- 🧪 Test all conversation flows

### Day 4: Launch (2 hours)
- ✅ Spec 07: Testing & Deployment
- 🚀 Deploy to Vercel
- 🎉 Share with the world!

## 🔑 Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Gemini 2.0 Flash**: Fast, cheap AI model
- **Vercel AI SDK**: Streaming and tool calling
- **Tailwind CSS**: Utility-first styling

## 💡 Pro Tips

1. **Start with Spec 00**: Read the overview first
2. **Don't skip specs**: Each builds on the previous
3. **Test frequently**: Verify each component works
4. **Customize freely**: Adapt specs to your needs
5. **Use AI agents**: Let them handle boilerplate

## 🎨 What You'll Build

A portfolio where recruiters can:
- Chat naturally with an AI that knows you
- See your experience timeline dynamically
- Browse your projects with images
- View your skills chart
- Get your contact info
- Download your resume

All rendered on-demand based on conversation!

## 📊 Example Conversations

**Recruiter**: "Tell me about your React experience"
**AI**: "I have 5 years of React experience! Let me show you..."
→ *Renders experience timeline + React projects*

**Recruiter**: "What's your strongest skill?"
**AI**: "TypeScript is my strongest skill at 95% proficiency..."
→ *Renders skills chart*

**Recruiter**: "How can I reach you?"
**AI**: "I'd love to connect! Here's my contact info..."
→ *Renders contact card*

## 🛠️ Using with Kiro

### For Each Spec:
```
1. Open the spec file
2. Copy the entire content
3. Paste into Kiro chat
4. Say: "Please implement this spec"
5. Review the implementation
6. Test it works
7. Move to next spec
```

### Example Prompt:
```
I'm building an AI portfolio. Here's Spec 01 for project setup.
Please implement everything in this spec:

[paste spec content]

Let me know when you're done and what files you created.
```

## ✅ Acceptance Criteria

Each spec has its own acceptance criteria. The project is complete when:
- [ ] All 7 specs are implemented
- [ ] All acceptance criteria are checked
- [ ] Application runs without errors
- [ ] Deployed to production
- [ ] You can have a natural conversation with your AI

## 🐛 Troubleshooting

### API Key Issues
- Check `.env.local` exists
- Verify key is correct
- Restart dev server

### Tool Calling Not Working
- Check tool descriptions are clear
- Verify system prompt includes tool guidelines
- Test API route directly

### Components Not Rendering
- Check tool output types
- Verify component props match
- Look for TypeScript errors

### Slow Responses
- Reduce `maxSteps` in API route
- Optimize tool execution
- Check network latency

## 📚 Additional Resources

- [Main Research Doc](../ai-portfolio-research.md)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Gemini API](https://ai.google.dev/gemini-api/docs)
- [Next.js Docs](https://nextjs.org/docs)

## 🎯 Success Metrics

Your portfolio is successful when:
- ✅ Recruiters can chat naturally
- ✅ Components render contextually
- ✅ Responses are fast (< 2 seconds)
- ✅ Information is accurate
- ✅ Mobile experience is smooth
- ✅ You get interview requests! 🎉

## 🚀 Ready to Start?

1. Read [Spec 00: Overview](./00-overview.md)
2. Begin with [Spec 01: Project Setup](./01-project-setup.md)
3. Work through each spec sequentially
4. Test frequently
5. Deploy and share!

---

**Questions?** Check the main research document or the specific spec's notes section.

**Good luck building your AI portfolio!** 🎨🤖✨

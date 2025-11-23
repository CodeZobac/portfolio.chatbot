# Spec 04: API Route with Gemini Integration

## Goal
Create the Next.js API route that handles chat requests, integrates with Google Gemini Flash, and enables tool calling for dynamic component rendering.

## Requirements

### 1. Create API Route Handler

#### `app/api/chat/route.ts`
```typescript
import { google } from '@ai-sdk/google-generative-ai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { portfolioTools } from '@/lib/ai/tools';

// Configure Gemini model
const model = google('gemini-2.0-flash-exp');

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Stream response with tool calling
    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages,
      tools: portfolioTools,
      maxSteps: 5, // Allow up to 5 tool calls per conversation turn
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
```

## Acceptance Criteria
- [ ] API route is created at `/app/api/chat/route.ts`
- [ ] Gemini Flash model is properly configured
- [ ] System prompt is included in requests
- [ ] All tools are registered
- [ ] Streaming is enabled
- [ ] Error handling is implemented
- [ ] Route returns proper response format

## Testing
Test with curl or Postman

## Next Steps
Move to **Spec 05**: Build chat interface components

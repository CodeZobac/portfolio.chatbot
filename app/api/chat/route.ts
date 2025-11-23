import { streamText, convertToCoreMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { tools } from '@/lib/ai/tools';

/**
 * API Route: /api/chat
 * Handles chat requests and streams responses from Google Gemini
 */
export async function POST(request: Request) {
  try {
    // Parse incoming messages from request body
    const { messages } = await request.json();

    // Validate that messages exist
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Google Gemini client with API key from environment
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable');
      return new Response(
        JSON.stringify({ error: 'Server configuration error: API key not found' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Stream response from Gemini with tool calling support
    const result = streamText({
      model: google('gemini-flash-latest'),
      system: SYSTEM_PROMPT,
      messages: convertToCoreMessages(messages),
      tools,
    });

    // Return streaming response to client in UI message format
    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    // Log error for debugging
    console.error('Chat API error:', error);
    
    // Return user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: errorMessage 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

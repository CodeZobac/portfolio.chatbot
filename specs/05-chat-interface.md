# Spec 05: Chat Interface Components

## Goal
Build the client-side chat interface using Vercel AI SDK's `useChat` hook with dynamic component rendering based on tool calls.

## Requirements

### 1. Main Chat Page

#### `app/page.tsx`
```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import MessageBubble from '@/components/chat/MessageBubble';
import InputForm from '@/components/chat/InputForm';

export default function Portfolio() {
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Chat with My AI Portfolio</h1>
        <p className="text-gray-600">
          Ask me anything about my experience, skills, or projects!
        </p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <InputForm
        onSubmit={(text) => sendMessage({ text })}
        disabled={isLoading}
      />
    </div>
  );
}
```

### 2. Message Bubble Component

Create `components/chat/MessageBubble.tsx` - see full spec document

### 3. Input Form Component

Create `components/chat/InputForm.tsx` - see full spec document

## Acceptance Criteria
- [ ] Chat interface renders correctly
- [ ] Messages display in bubbles
- [ ] Input form works
- [ ] Loading states show
- [ ] Tool calls render components
- [ ] Scrolling works properly

## Next Steps
Move to **Spec 06**: Build portfolio UI components

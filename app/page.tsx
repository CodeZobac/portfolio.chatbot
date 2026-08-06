"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import EducationCard from "@/components/portfolio/EducationCard";
import ContactCard from "@/components/portfolio/ContactCard";
import ProfileCard from "@/components/ProfileCard";
import IntroAnimation from "@/components/intro/intro-animation";
import MarkdownMessage from "@/components/MarkdownMessage";
import { Message, MessageContent } from "@/components/ai-elements/message";
import type { ToolOutput } from "@/lib/types";

const VISIBLE_MESSAGE_LIMIT = 12;

const ProjectsCard = dynamic(
  () => import("@/components/portfolio/ProjectsCard"),
  { loading: ToolCardSkeleton },
);
const SkillsCard = dynamic(() => import("@/components/portfolio/SkillsCard"), {
  loading: ToolCardSkeleton,
});
const CVCard = dynamic(() => import("@/components/portfolio/CVCard"), {
  loading: ToolCardSkeleton,
});
const DramaticResumeCard = dynamic(
  () => import("@/components/portfolio/DramaticResumeCard"),
  { loading: ToolCardSkeleton },
);

function ToolCardSkeleton() {
  return (
    <div className="h-36 w-full animate-pulse rounded-2xl border border-amber-100 bg-amber-50/60" />
  );
}

const ToolOutputRenderer = memo(
  ({
    output,
    onModalOpen,
    onSendMessage,
  }: {
    output: ToolOutput;
    onModalOpen: (isOpen: boolean) => void;
    onSendMessage: (text: string) => void;
  }) => {
    switch (output.type) {
      case "experience":
        return null;
      case "projects":
        return (
          <ProjectsCard
            data={output.data}
            onModalOpen={onModalOpen}
          />
        );
      case "skills":
        return <SkillsCard data={output.data} />;
      case "education":
        return <EducationCard data={output.data} />;
      case "contact":
        return <ContactCard data={output.data} />;
      case "cv":
        return (
          <CVCard
            data={output.data}
            onModalOpen={onModalOpen}
            onSendMessage={onSendMessage}
          />
        );
      case "resume":
        return <DramaticResumeCard data={output.data} />;
      default:
        return null;
    }
  },
);

ToolOutputRenderer.displayName = "ToolOutputRenderer";

export default function Home() {
  const [input, setInput] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const { messages, sendMessage, status } = useChat({
    transport,
    experimental_throttle: 50,
  });
  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  // Avoid queuing a smooth scroll animation for every streamed chunk.
  useEffect(() => {
    const now = performance.now();
    if (isLoading && now - lastScrollRef.current < 50) return;

    if (scrollFrameRef.current !== null) {
      cancelAnimationFrame(scrollFrameRef.current);
    }
    scrollFrameRef.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: isLoading ? "auto" : "smooth",
        block: "end",
      });
      lastScrollRef.current = performance.now();
      scrollFrameRef.current = null;
    });

    return () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
    };
  }, [messages, isLoading]);

  const handleSuggestedMessage = useCallback(
    (text: string) => sendMessage({ text }),
    [sendMessage],
  );
  const handleModalOpen = useCallback(
    (isOpen: boolean) => setIsInputVisible(!isOpen),
    [],
  );
  const handleContactClick = useCallback(() => {
    handleSuggestedMessage("How can I contact Afonso?");
  }, [handleSuggestedMessage]);
  const hiddenMessageCount = Math.max(
    messages.length - VISIBLE_MESSAGE_LIMIT,
    0,
  );
  const renderedMessages =
    showFullHistory || hiddenMessageCount === 0
      ? messages
      : messages.slice(-VISIBLE_MESSAGE_LIMIT);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Intro Animation Overlay */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Zero-runtime background: no canvas, WebGL, filters, or animation loop. */}
      <div
        className="fixed inset-0 pointer-events-none z-[-2] bg-[#fffaf4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(245, 158, 11, 0.14), transparent 34%), radial-gradient(circle at 88% 92%, rgba(234, 88, 12, 0.11), transparent 36%), linear-gradient(145deg, #fffdf9 0%, #fff8ee 55%, #fffaf5 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[url('/grain.webp')] opacity-[0.025]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-amber-100 bg-white/95 shadow-sm transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
              Afonso Caboz
            </h1>
            <p className="text-xs text-stone-500">
              Systems Architect: AI & Full-Stack Integration 𖤍
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-stone-500">Online</span>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="fixed inset-x-0 bottom-0 z-30 h-28 pointer-events-none bg-gradient-to-t from-[#fffaf4] via-[#fffaf4]/80 to-transparent" />
      <main className="flex flex-1 flex-col pt-[70px] pb-[100px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Profile Card - Always visible at the start */}
            <div className="flex justify-center py-8 animate-fadeIn">
              <ProfileCard
                name="Afonso Caboz"
                title="Solutions Architect"
                handle="CodeZobac"
                status="Available"
                contactText="Contact"
                avatarUrl="/foto.jpg"
                grainUrl="/grain.webp"
                behindGlowEnabled={false}
                showUserInfo={true}
                enableTilt={false}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
              />
            </div>

            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center animate-slideIn">
                <div className="space-y-2 px-4 max-w-lg">
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                    How can I help you today?
                  </h2>
                  <p className="text-stone-500">
                    Explore my professional journey, technical skills, and
                    portfolio projects through this interactive chat.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 px-4">
                  {[
                    "Tell me about your experience",
                    "Show me your projects",
                    "What are your skills?",
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => sendMessage({ text })}
                      className="w-full rounded-xl bg-amber-50 p-4 text-left text-sm text-stone-600 shadow-sm transition-all hover:text-stone-900 hover:shadow-md border border-amber-200/50 hover:border-amber-400/50 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="relative z-10">{text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keep older messages in state without retaining their full DOM. */}
            {hiddenMessageCount > 0 && (
              <button
                type="button"
                onClick={() => setShowFullHistory((visible) => !visible)}
                className="mx-auto block rounded-full border border-amber-200 bg-white/95 px-4 py-2 text-xs font-medium text-stone-600 shadow-sm transition-colors hover:border-amber-300 hover:text-stone-900"
              >
                {showFullHistory
                  ? "Collapse earlier messages"
                  : `Show ${hiddenMessageCount} earlier messages`}
              </button>
            )}

            {/* Messages */}
            {renderedMessages.map((message) => (
              <div key={message.id} className="chat-message space-y-6">
                {message.parts.map((part, partIndex) => {
                  if (part.type === "text") {
                    return (
                      <Message
                        key={partIndex}
                        role={message.role}
                        className="gap-3"
                      >
                        {message.role === "assistant" && (
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-amber-50">
                            <Image
                              src="/always_solving_something.jpg"
                              alt="Assistant"
                              width={32}
                              height={32}
                              sizes="32px"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <MessageContent
                          className={
                            message.role === "user"
                              ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl rounded-tr-sm shadow-md border border-amber-400/20"
                              : "bg-white/95 border border-amber-100 text-stone-800 rounded-2xl rounded-tl-sm shadow-sm"
                          }
                        >
                          {message.role === "user" ? (
                            <div className="whitespace-pre-wrap break-words">
                              {part.text}
                            </div>
                          ) : (
                            <MarkdownMessage
                              content={part.text}
                              onButtonClick={handleSuggestedMessage}
                              isStreaming={
                                isLoading &&
                                message.id === messages[messages.length - 1]?.id
                              }
                              transparent={true}
                            />
                          )}
                        </MessageContent>
                      </Message>
                    );
                  }

                  if (part.type.startsWith("tool-")) {
                    if ("state" in part) {
                      if (
                        part.state === "input-streaming" ||
                        part.state === "input-available"
                      ) {
                        return (
                          <div
                            key={partIndex}
                            className="flex justify-start animate-fadeIn"
                          >
                            <div className="rounded-xl border border-amber-100 bg-white/95 p-4 shadow-sm flex items-center gap-3">
                              <div className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                              </div>
                              <span className="text-sm font-medium text-stone-600">
                                Generating {part.type.replace("tool-", "")}...
                              </span>
                            </div>
                          </div>
                        );
                      }

                      if (
                        part.state === "output-available" &&
                        "output" in part &&
                        part.output
                      ) {
                        const toolOutput = part.output as ToolOutput;
                        return (
                          <div
                            key={partIndex}
                            className="animate-slideIn w-full"
                          >
                            <ToolOutputRenderer
                              output={toolOutput}
                              onModalOpen={handleModalOpen}
                              onSendMessage={handleSuggestedMessage}
                            />
                          </div>
                        );
                      }

                      if (
                        part.state === "output-error" &&
                        "errorText" in part
                      ) {
                        return (
                          <div key={partIndex} className="flex justify-start">
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                              <p className="font-medium">Error</p>
                              <p className="mt-1 text-xs opacity-90">
                                {part.errorText}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    }
                  }
                  return null;
                })}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="rounded-2xl border border-amber-100 bg-white/95 px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-1.5">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Form */}
        {isInputVisible && (
          <div className="fixed bottom-6 left-0 right-0 z-[100] px-4 animate-slideUp">
            <div className="mx-auto max-w-3xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) {
                    sendMessage({ text: input });
                    setInput("");
                  }
                }}
                className="relative flex items-center"
                data-chat-input-area
              >
                <div className="absolute inset-0 rounded-full bg-white/95 shadow-2xl ring-1 ring-amber-200" />

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask me anything..."
                  className="relative w-full bg-transparent px-6 py-4 text-base text-stone-800 placeholder-stone-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />

                <div className="relative pr-2">
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-amber-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <svg
                        className="h-5 w-5 translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

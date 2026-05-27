"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
// import ExperienceCard from '@/components/portfolio/ExperienceCard';
import ProjectsCard from "@/components/portfolio/ProjectsCard";
import SkillsCard from "@/components/portfolio/SkillsCard";
import EducationCard from "@/components/portfolio/EducationCard";
import ContactCard from "@/components/portfolio/ContactCard";
import DramaticResumeCard from "@/components/portfolio/DramaticResumeCard";
import CVCard from "@/components/portfolio/CVCard";
import ProfileCard from "@/components/ProfileCard";
import GradualBlur from "@/components/GradualBlur";
import SplashAnimation from "@/components/SplashAnimation";
import IntroAnimation from "@/components/intro/intro-animation";
import MarkdownMessage from "@/components/MarkdownMessage";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ToolOutput } from "@/lib/types";

export default function Home() {
  const [input, setInput] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [isLensActive, setIsLensActive] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Intro Animation Overlay */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-2]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      {/* Splash Animation Layer */}
      <div className="fixed inset-0 pointer-events-auto z-[-1]">
        <SplashAnimation
          DENSITY_DISSIPATION={3}
          VELOCITY_DISSIPATION={3.5}
          PRESSURE={0.05}
          CURL={50}
          SPLAT_RADIUS={0.11}
          SPLAT_FORCE={3000}
          COLOR_UPDATE_SPEED={30}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#E37100"
          PAUSED={isLensActive}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] glass-strong transition-all duration-300">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
              Afonso Caboz
            </h1>
            <p className="text-xs text-stone-500">
              Full-Stack Solutions Architect
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-stone-500">Online</span>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <GradualBlur
        target="page"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
      />
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
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
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

            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className="space-y-6">
                {message.parts.map((part, partIndex) => {
                  if (part.type === "text") {
                    return (
                      <Message
                        key={partIndex}
                        role={message.role}
                        className="gap-3"
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage
                              src="/always_solving_something.jpg"
                              alt="Assistant"
                            />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <MessageContent
                          className={
                            message.role === "user"
                              ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl rounded-tr-sm shadow-md border border-amber-400/20"
                              : "bg-white/90 backdrop-blur-md border border-amber-100 text-stone-800 rounded-2xl rounded-tl-sm shadow-sm"
                          }
                        >
                          {message.role === "user" ? (
                            <div className="whitespace-pre-wrap break-words">
                              {part.text}
                            </div>
                          ) : (
                            <MarkdownMessage
                              content={part.text}
                              onButtonClick={(text) => sendMessage({ text })}
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
                            <div className="glass rounded-xl p-4 flex items-center gap-3">
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
                            {(() => {
                              switch (toolOutput.type) {
                                case "experience":
                                  return null; // Deprecated, now returns 'cv' type
                                case "projects":
                                  return (
                                    <ProjectsCard
                                      data={toolOutput.data}
                                      onModalOpen={(isOpen) =>
                                        setIsInputVisible(!isOpen)
                                      }
                                      onLensActiveChange={setIsLensActive}
                                    />
                                  );
                                case "skills":
                                  return <SkillsCard data={toolOutput.data} />;
                                case "education":
                                  return (
                                    <EducationCard data={toolOutput.data} />
                                  );
                                case "contact":
                                  return <ContactCard data={toolOutput.data} />;
                                case "cv":
                                  return (
                                    <CVCard
                                      data={toolOutput.data}
                                      onModalOpen={(isOpen) =>
                                        setIsInputVisible(!isOpen)
                                      }
                                      onSendMessage={(text) =>
                                        sendMessage({ text })
                                      }
                                    />
                                  );
                                case "resume":
                                  return (
                                    <DramaticResumeCard
                                      data={toolOutput.data}
                                    />
                                  );
                                default:
                                  return null;
                              }
                            })()}
                          </div>
                        );
                      }

                      if (
                        part.state === "output-error" &&
                        "errorText" in part
                      ) {
                        return (
                          <div key={partIndex} className="flex justify-start">
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 backdrop-blur-sm">
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
                <div className="glass rounded-2xl px-4 py-3">
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
                <div className="absolute inset-0 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-amber-200" />

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

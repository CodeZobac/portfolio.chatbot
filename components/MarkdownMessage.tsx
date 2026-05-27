'use client';

import ReactMarkdown from 'react-markdown';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, Code, Briefcase, GraduationCap, FolderGit2, ExternalLink } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
  onButtonClick?: (text: string) => void;
  className?: string;
  transparent?: boolean;
}

// Pattern to detect button syntax: **text**
const BUTTON_PATTERN = /\*\*([^*]+)\*\*/g;

// Icon mapping for contextual button icons
const getButtonIcon = (text: string) => {
  const lowercaseText = text.toLowerCase();
  if (lowercaseText.includes('experience') || lowercaseText.includes('work')) return Briefcase;
  if (lowercaseText.includes('project')) return FolderGit2;
  if (lowercaseText.includes('skill') || lowercaseText.includes('stack')) return Code;
  if (lowercaseText.includes('education') || lowercaseText.includes('academic')) return GraduationCap;
  if (lowercaseText.includes('contact') || lowercaseText.includes('reach') || lowercaseText.includes('email')) return Mail;
  if (lowercaseText.includes('resume') || lowercaseText.includes('cv') || lowercaseText.includes('download')) return FileText;
  return ArrowRight; // Default icon
};

const MarkdownMessage = memo(({ content, onButtonClick, className, transparent = false }: MarkdownMessageProps) => {
  // Use a local regex to avoid side effects on the shared BUTTON_PATTERN
  const localPattern = new RegExp(BUTTON_PATTERN.source, 'g');
  const hasButtons = localPattern.test(content);
  localPattern.lastIndex = 0; // Reset for parsing loop

  const renderContent = (text: string) => (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <span className="inline text-[16px] leading-[1.8] text-black tracking-wide font-normal">
            {children}
          </span>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-black">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-stone-600 font-serif">
            {children}
          </em>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6 mt-2 text-black tracking-tight leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-4 mt-8 text-black flex items-center gap-2 leading-tight">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mb-3 mt-6 text-stone-900 leading-snug">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 mb-6 pl-4 my-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-2 mb-6 pl-4 my-4 list-decimal marker:text-stone-400 marker:font-medium">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="list-item leading-[1.8] text-black pl-2">
            {children}
          </li>
        ),
        code: ({ children }) => (
          <code className="bg-stone-100 text-stone-900 px-1.5 py-0.5 rounded text-[14px] font-mono border border-stone-200 font-medium">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-amber-500 pl-4 py-2 my-6 italic text-stone-700 bg-amber-50/50 rounded-r leading-relaxed">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 hover:underline decoration-amber-600/30 underline-offset-4 transition-all font-medium"
          >
            {children}
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );

  const containerClasses = transparent
    ? `prose max-w-none ${className || ''}`
    : `prose max-w-none bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-100 ${className || ''}`;

  if (!hasButtons || !onButtonClick) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
        className={containerClasses}
      >
        {renderContent(content)}
      </motion.div>
    );
  }

  // Parse content into text and button segments
  const segments: Array<{ type: 'text' | 'button'; content: string }> = [];
  let lastIndex = 0;
  let match;
  let buttonCount = 0;
  const MAX_BUTTONS = 4;

  localPattern.lastIndex = 0;
  while ((match = localPattern.exec(content)) !== null) {
    // Add text before button
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    // Only render as interactive button if under the limit
    if (buttonCount < MAX_BUTTONS) {
      segments.push({
        type: 'button',
        content: match[1],
      });
      buttonCount++;
    } else {
      // Over the limit — keep as regular bold markdown
      segments.push({
        type: 'text',
        content: match[0], // preserve the **text** markdown syntax
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  const segmentContainerClasses = transparent
    ? `prose max-w-none ${className || ''}`
    : `prose max-w-none bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-100 ${className || ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={segmentContainerClasses}
    >
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return (
            <span key={index} className="inline">
              {renderContent(segment.content)}
            </span>
          );
        }

        // Render "tidy" inline button
        const Icon = getButtonIcon(segment.content);
        return (
          <button
            key={index}
            onClick={() => onButtonClick(segment.content)}
            className="group inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-[15px] font-medium text-white bg-[#E37100] rounded-md shadow-sm hover:bg-[#ff8000] active:scale-[0.97] transition-all duration-150 ease-out align-baseline select-none relative overflow-hidden will-change-transform"
          >
            <Icon className="w-3 h-3 text-white/90" />
            <span className="relative z-10">
              {segment.content}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
});

MarkdownMessage.displayName = 'MarkdownMessage';

export default MarkdownMessage;

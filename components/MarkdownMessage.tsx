'use client';

import ReactMarkdown from 'react-markdown';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, FileText, Mail, Code, Briefcase, GraduationCap, FolderGit2, ExternalLink } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
  onButtonClick?: (text: string) => void;
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

const MarkdownMessage = memo(({ content, onButtonClick, className, transparent = false }: MarkdownMessageProps & { className?: string, transparent?: boolean }) => {
  // Check if content contains button patterns
  const hasButtons = BUTTON_PATTERN.test(content);
  BUTTON_PATTERN.lastIndex = 0; // Reset regex

  const renderContent = (text: string) => (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <span className="inline text-[16px] leading-[1.8] text-zinc-200 tracking-wide font-normal">
            {children}
          </span>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-white">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-zinc-300 font-serif">
            {children}
          </em>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6 mt-2 text-white tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-4 mt-6 text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mb-3 mt-4 text-zinc-100">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 mb-6 pl-4 my-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-2 mb-6 pl-4 my-4 list-decimal marker:text-zinc-400 marker:font-medium">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="list-item leading-relaxed text-zinc-200 pl-2">
            {children}
          </li>
        ),
        code: ({ children }) => (
          <code className="bg-zinc-800 text-zinc-100 px-1.5 py-0.5 rounded text-[14px] font-mono border border-zinc-700 font-medium">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-zinc-300 bg-blue-900/20 rounded-r">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:underline decoration-blue-400/30 underline-offset-2 transition-colors font-medium"
          >
            {children}
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );

  const containerClasses = transparent
    ? `prose prose-invert max-w-none ${className || ''}`
    : `prose prose-invert max-w-none bg-zinc-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-zinc-800/50 ${className || ''}`;

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

  BUTTON_PATTERN.lastIndex = 0;
  while ((match = BUTTON_PATTERN.exec(content)) !== null) {
    // Add text before button
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    // Add button
    segments.push({
      type: 'button',
      content: match[1],
    });

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
    ? `text-[16px] leading-[1.8] text-zinc-200 ${className || ''}`
    : `text-[16px] leading-[1.8] text-zinc-200 bg-zinc-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-zinc-800/50 ${className || ''}`;

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

        // Render premium inline button
        const Icon = getButtonIcon(segment.content);
        return (
          <motion.button
            key={index}
            onClick={() => onButtonClick(segment.content)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-1.5 mx-1.5 px-3 py-1 text-[14px] font-semibold text-zinc-100 bg-zinc-800 rounded-lg border border-zinc-700 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all duration-200 align-baseline select-none relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Icon className="w-3.5 h-3.5 text-blue-400 transition-transform group-hover:scale-110 group-hover:rotate-[-10deg]" />
            <span className="relative z-10 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
              {segment.content}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
});

MarkdownMessage.displayName = 'MarkdownMessage';

export default MarkdownMessage;

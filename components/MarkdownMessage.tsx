'use client';

import ReactMarkdown from 'react-markdown';
import { memo, useDeferredValue, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, Code, Briefcase, GraduationCap, FolderGit2, ExternalLink } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
  onButtonClick?: (text: string) => void;
  className?: string;
  transparent?: boolean;
  isStreaming?: boolean;
}

const MAX_BUTTONS = 4;

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

// Extract plain text from React children (handles nested elements)
const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return '';
};

const MarkdownMessage = memo(({ content, onButtonClick, className, transparent = false, isStreaming = false }: MarkdownMessageProps) => {
  const containerClasses = transparent
    ? `prose max-w-none ${className || ''}`
    : `prose max-w-none bg-white/95 p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-100 ${className || ''}`;

  const deferredContent = useDeferredValue(content);
  const renderedContent = isStreaming ? deferredContent : content;
  const renderedMarkdown = useMemo(() => {
    let buttonCount = 0;
    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-[16px] leading-[1.8] text-black tracking-wide font-normal mb-3 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => {
            const text = extractText(children);

            // Render as interactive button if: callback exists, under cap, and text is short enough
            if (onButtonClick && buttonCount < MAX_BUTTONS && text.length > 0 && text.length < 40) {
              buttonCount++;
              const Icon = getButtonIcon(text);
              return (
                <button
                  onClick={() => onButtonClick(text)}
                  className="group inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-[15px] font-medium text-white bg-[#E37100] rounded-md shadow-sm hover:bg-[#ff8000] active:scale-[0.97] transition-all duration-150 ease-out align-baseline select-none relative overflow-hidden will-change-transform"
                >
                  <Icon className="w-3 h-3 text-white/90" />
                  <span className="relative z-10">
                    {text}
                  </span>
                </button>
              );
            }

            // Otherwise render as regular bold text
            return (
              <strong className="font-bold text-black">
                {children}
              </strong>
            );
          },
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
            <ul className="space-y-1.5 mb-4 pl-5 my-3 list-disc marker:text-amber-500">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 mb-4 pl-5 my-3 list-decimal marker:text-amber-500 marker:font-medium">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.7] text-black pl-1">
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
          hr: () => (
            <hr className="my-6 border-stone-200" />
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
        {renderedContent}
      </ReactMarkdown>
    );
  }, [renderedContent, onButtonClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={containerClasses}
    >
      {renderedMarkdown}
    </motion.div>
  );
});

MarkdownMessage.displayName = 'MarkdownMessage';

export default MarkdownMessage;

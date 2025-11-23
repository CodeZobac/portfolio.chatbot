import { PersonalInfo } from '@/lib/types';

interface ContactFormProps {
  data: {
    contact: PersonalInfo;
  };
}

export default function ContactForm({ data }: ContactFormProps) {
  const { contact } = data;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Contact Information
      </h3>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {contact.name}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            {contact.title}
          </p>
          <p className="mt-1 text-xs sm:text-sm italic text-zinc-500 dark:text-zinc-500">
            {contact.tagline}
          </p>
        </div>
        
        {/* Contact Methods */}
        <div className="space-y-2 border-t border-zinc-200 pt-3 sm:pt-4 dark:border-zinc-700">
          <div className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${contact.email}`}
              className="text-xs sm:text-sm text-blue-600 hover:underline active:text-blue-800 dark:text-blue-400 dark:active:text-blue-300 transition-colors break-all"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${contact.phone}`}
              className="text-xs sm:text-sm text-blue-600 hover:underline active:text-blue-800 dark:text-blue-400 dark:active:text-blue-300 transition-colors"
            >
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-h-[44px]">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {contact.location}
            </span>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="space-y-2 border-t border-zinc-200 pt-3 sm:pt-4 dark:border-zinc-700">
          <h5 className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Connect with me
          </h5>
          <div className="flex flex-wrap gap-2">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors hover:bg-zinc-100 hover:border-blue-500 active:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-blue-500 dark:active:bg-zinc-700 min-h-[44px]"
            >
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors hover:bg-zinc-100 hover:border-blue-500 active:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-blue-500 dark:active:bg-zinc-700 min-h-[44px]"
            >
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            {contact.twitter && (
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors hover:bg-zinc-100 hover:border-blue-500 active:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-blue-500 dark:active:bg-zinc-700 min-h-[44px]"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span>Twitter</span>
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-colors hover:bg-zinc-100 hover:border-blue-500 active:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:border-blue-500 dark:active:bg-zinc-700 min-h-[44px]"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
        
        {/* Resume Download Button */}
        <div className="border-t border-zinc-200 pt-3 sm:pt-4 dark:border-zinc-700">
          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 min-h-[44px]"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume</span>
          </a>
        </div>
        
        {/* Availability */}
        <div className="rounded-lg bg-blue-50 p-2.5 sm:p-3 dark:bg-blue-950">
          <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <span className="font-medium">Availability:</span> {contact.availability}
          </p>
        </div>
      </div>
    </div>
  );
}

import { PersonalInfo } from '@/lib/types';

interface ContactCardProps {
  data: {
    contact: PersonalInfo;
  };
}

export default function ContactCard({ data }: ContactCardProps) {
  const { contact } = data;

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <h3 className="mb-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
        Contact Information
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {contact.name}
          </h4>
          <p className="text-base font-medium text-indigo-600 dark:text-indigo-400">
            {contact.title}
          </p>
          <p className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400 border-l-2 border-zinc-300 dark:border-zinc-700 pl-3">
            "{contact.tagline}"
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-200/10 dark:border-zinc-700/30">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-500/10 transition-colors">
              <svg className="h-5 w-5 text-zinc-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <a href={`mailto:${contact.email}`} className="text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors">
              {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-500/10 transition-colors">
              <svg className="h-5 w-5 text-zinc-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <a href={`tel:${contact.phone}`} className="text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors">
              {contact.phone}
            </a>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-500/10 transition-colors">
              <svg className="h-5 w-5 text-zinc-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              {contact.location}
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-200/10 dark:border-zinc-700/30">
          <h5 className="text-sm font-semibold text-zinc-900 dark:text-white">
            Connect with me
          </h5>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'LinkedIn', url: contact.linkedin },
              { name: 'GitHub', url: contact.github },
              contact.twitter ? { name: 'Twitter', url: contact.twitter } : null,
              contact.website ? { name: 'Website', url: contact.website } : null,
            ].filter(Boolean).map((link) => (
              <a
                key={link!.name}
                href={link!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-white hover:shadow-md hover:text-indigo-600 dark:hover:bg-zinc-800 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30"
              >
                {link!.name} →
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-4 border border-indigo-500/10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              <span className="opacity-70">Availability:</span> {contact.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

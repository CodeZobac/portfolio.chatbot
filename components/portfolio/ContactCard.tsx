import { PersonalInfo } from "@/lib/types";

interface ContactCardProps {
  data: {
    contact: PersonalInfo;
  };
}

export default function ContactCard({ data }: ContactCardProps) {
  const { contact } = data;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
      <h3 className="mb-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
        Contact Information
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-2xl font-bold text-stone-900">{contact.name}</h4>
          <p className="text-base font-medium text-amber-600">
            {contact.title}
          </p>
          <p className="mt-2 text-sm italic text-stone-500 border-l-2 border-amber-300 pl-3">
            &quot;{contact.tagline}&quot;
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-amber-200/50">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors">
              <svg
                className="h-5 w-5 text-stone-400 group-hover:text-amber-600 transition-colors"
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
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-stone-600 hover:text-amber-600 transition-colors"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors">
              <svg
                className="h-5 w-5 text-stone-400 group-hover:text-amber-600 transition-colors"
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
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-stone-600 hover:text-amber-600 transition-colors"
            >
              {contact.phone}
            </a>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors">
              <svg
                className="h-5 w-5 text-stone-400 group-hover:text-amber-600 transition-colors"
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
            </div>
            <span className="text-sm text-stone-600">{contact.location}</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-amber-200/50">
          <h5 className="text-sm font-semibold text-stone-700">
            Connect with me
          </h5>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "LinkedIn", url: contact.linkedin },
              { name: "GitHub", url: contact.github },
              contact.twitter
                ? { name: "Twitter", url: contact.twitter }
                : null,
              contact.website
                ? { name: "Website", url: contact.website }
                : null,
            ]
              .filter(Boolean)
              .map((link) => (
                <a
                  key={link!.name}
                  href={link!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-amber-50/80 px-4 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-amber-100 hover:text-amber-600 border border-transparent hover:border-amber-400/30"
                >
                  {link!.name} →
                </a>
              ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 border border-amber-400/20">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <p className="text-sm font-medium text-stone-700">
              <span className="opacity-70">Availability:</span>{" "}
              {contact.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { experiences, projects } from "@/lib/content/content";
import { PERSON, SERVICES, SITE_URL, skillGroups } from "@/lib/seo";

const heading = "text-xl font-bold text-stone-900 sm:text-2xl";
const link = "text-amber-700 underline underline-offset-4";

/** Server-rendered, crawlable summary. Headings are Portuguese; facts come from the content JSON. */
export default function AboutSection() {
  return (
    <section id="sobre-wrapper" aria-labelledby="sobre" className="relative z-0 mx-auto w-full max-w-4xl space-y-10 px-4 pb-40 pt-12 text-stone-800 sm:px-6">
      <div className="space-y-3">
        <h2 id="sobre" lang="pt-PT" className={heading}>Sobre mim</h2>
        <p className="leading-relaxed">
          {PERSON.name} is an {PERSON.jobTitle.toLowerCase()} based in {PERSON.city}, {PERSON.region}, Portugal, working
          with clients in the Algarve, across Portugal and remotely.
        </p>
      </div>

      <div className="space-y-3">
        <h2 lang="pt-PT" className={heading}>Serviços</h2>
        <ul className="list-disc space-y-1 pl-5 marker:text-amber-500">
          {SERVICES.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 lang="pt-PT" className={heading}>Projetos</h2>
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id}><h3 className="font-semibold">{p.name}</h3><p className="text-stone-600">{p.tagline}</p></li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 lang="pt-PT" className={heading}>Experiência</h2>
        <ul className="space-y-1">
          {experiences.map((e) => <li key={e.id}>{e.title}, {e.company} ({e.period})</li>)}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 lang="pt-PT" className={heading}>Competências</h2>
        <dl className="space-y-2">
          {skillGroups.map(([category, names]) => (
            <div key={category}><dt className="font-semibold capitalize">{category.replace("-", " & ")}</dt><dd className="text-stone-600">{names.join(", ")}</dd></div>
          ))}
        </dl>
      </div>

      <div className="space-y-3">
        <h2 lang="pt-PT" className={heading}>Contacto</h2>
        <p>
          <a className={link} href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
          {" · "}<a className={link} href={PERSON.linkedin}>LinkedIn</a>
          {" · "}<a className={link} href={PERSON.github}>GitHub</a>
          {" · "}<a className={link} href={SITE_URL}>codezobac.com</a>
        </p>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BriefcaseBusiness,
  ExternalLink,
  FolderKanban,
  ImagePlus,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Trash2,
  Undo2,
  Wrench,
} from "lucide-react";
import { portfolioContentSchema } from "@/lib/content/schema";
import { parseYouTubeId, youtubeUrl } from "@/lib/content/youtube";
import type { Experience, PortfolioContent, Project, Skill } from "@/lib/types";
import type { MediaUpload } from "@/lib/admin/github";

type Section = "skills" | "projects" | "experiences";
type Status = { tone: "error" | "success" | "neutral"; message: string; href?: string } | null;

const DRAFT_KEY = "portfolio-admin-draft-v1";
const sections: Array<{ id: Section; label: string; icon: typeof Wrench }> = [
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experiences", label: "Experience", icon: BriefcaseBusiness },
];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

const emptySkill = (): Skill => ({
  id: makeId("skill"), name: "", proficiency: 50, category: "frontend", appliedIn: [], priority: "supporting",
});
const emptyProject = (): Project => ({
  id: makeId("project"), name: "", tagline: "", description: "", problem: "", solution: "", role: "",
  keyDecisions: [], techStack: [], category: "web", featured: false, image: "/projects/placeholder.webp", links: {},
});
const emptyExperience = (): Experience => ({
  id: makeId("experience"), title: "", company: "", period: "", location: "", type: "tech",
  achievements: [], responsibilities: [], technologies: [],
});

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? `Request failed with ${response.status}.`);
  return body;
}

function LoginPanel() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    try {
      await requestJson("/api/admin/session", { method: "POST", body: JSON.stringify({ password }) });
      window.location.reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign in could not be completed.");
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-panel" aria-labelledby="admin-login-title">
        <div className="admin-wordmark">AC / ADMIN</div>
        <div>
          <h1 id="admin-login-title">Portfolio workbench</h1>
          <p>Sign in to edit the content compiled into the public portfolio.</p>
        </div>
        <form onSubmit={submit} className="admin-login-form">
          <Field label="Admin password" value={password} type="password" onChange={setPassword} required error={error} />
          <button className="admin-button admin-button-primary" disabled={loading || !password} data-loading={loading}>
            {loading ? <><Spinner /> Verifying…</> : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function AdminApp({ initiallyAuthenticated }: { initiallyAuthenticated: boolean }) {
  return initiallyAuthenticated ? <Dashboard /> : <LoginPanel />;
}

function Dashboard() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [published, setPublished] = useState<PortfolioContent | null>(null);
  const [baseCommitSha, setBaseCommitSha] = useState("");
  const [uploads, setUploads] = useState<MediaUpload[]>([]);
  const [section, setSection] = useState<Section>("skills");
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [undo, setUndo] = useState<{ section: Section; index: number; record: Skill | Project | Experience } | null>(null);
  const [draftRecovered, setDraftRecovered] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setStatus(null);
    try {
      const result = await requestJson<{ content: PortfolioContent; baseCommitSha: string }>("/api/admin/content");
      let next = result.content;
      let nextUploads: MediaUpload[] = [];
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw) as { baseCommitSha: string; content: PortfolioContent; uploads?: MediaUpload[] };
          if (draft.baseCommitSha === result.baseCommitSha && portfolioContentSchema.safeParse(draft.content).success) {
            next = draft.content; nextUploads = draft.uploads ?? []; setDraftRecovered(!same(next, result.content));
          }
        }
      } catch { localStorage.removeItem(DRAFT_KEY); }
      setContent(next); setPublished(result.content); setBaseCommitSha(result.baseCommitSha); setUploads(nextUploads);
      setSelectedId(next.skills[0]?.id ?? "");
    } catch (reason) {
      setStatus({ tone: "error", message: reason instanceof Error ? reason.message : "Content could not be loaded." });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!content || !baseCommitSha || (published && same(content, published) && uploads.length === 0)) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ baseCommitSha, content, uploads })); }
    catch { setStatus({ tone: "error", message: "The browser could not save this draft. Remove large images or publish now." }); }
  }, [content, published, baseCommitSha, uploads]);

  const records = content?.[section] ?? [];
  const filtered = records.filter((record) => {
    const label = "name" in record ? record.name : `${record.title} ${record.company}`;
    return label.toLowerCase().includes(query.toLowerCase());
  });
  const selected = records.find((record) => record.id === selectedId);
  const dirty = !!content && !!published && (!same(content, published) || uploads.length > 0);

  function switchSection(next: Section) {
    setSection(next); setQuery("");
    setSelectedId(content?.[next][0]?.id ?? "");
  }

  function updateRecord(next: Skill | Project | Experience) {
    if (!content) return;
    setContent({ ...content, [section]: content[section].map((record) => record.id === next.id ? next : record) });
  }

  function addRecord() {
    if (!content) return;
    const record = section === "skills" ? emptySkill() : section === "projects" ? emptyProject() : emptyExperience();
    setContent({ ...content, [section]: [...content[section], record] } as PortfolioContent);
    setSelectedId(record.id); setQuery("");
  }

  function removeRecord() {
    if (!content || !selected) return;
    const index = content[section].findIndex((record) => record.id === selected.id);
    setUndo({ section, index, record: clone(selected) });
    const next = content[section].filter((record) => record.id !== selected.id);
    setContent({ ...content, [section]: next } as PortfolioContent);
    setSelectedId(next[Math.min(index, next.length - 1)]?.id ?? "");
    window.setTimeout(() => setUndo(null), 8000);
  }

  function restoreDeleted() {
    if (!content || !undo) return;
    const list = [...content[undo.section]] as Array<Skill | Project | Experience>;
    list.splice(undo.index, 0, undo.record);
    setContent({ ...content, [undo.section]: list } as PortfolioContent);
    setSection(undo.section); setSelectedId(undo.record.id); setUndo(null);
  }

  function move(direction: -1 | 1) {
    if (!content || !selected) return;
    const list = [...content[section]] as Array<Skill | Project | Experience>;
    const index = list.findIndex((record) => record.id === selected.id);
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    setContent({ ...content, [section]: list } as PortfolioContent);
  }

  async function addImage(projectId: string, file: File): Promise<string> {
    const upload = await optimizeImage(file, projectId);
    setUploads((current) => [...current.filter((item) => item.path !== upload.path), upload]);
    return `/${upload.path.replace(/^public\//, "")}`;
  }

  async function publish() {
    if (!content) return;
    const parsed = portfolioContentSchema.safeParse(content);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setStatus({ tone: "error", message: `${first.path.join(" → ")}: ${first.message}` });
      return;
    }
    setPublishing(true); setStatus(null);
    try {
      const result = await requestJson<{ commitSha: string; commitUrl: string }>("/api/admin/publish", {
        method: "POST", body: JSON.stringify({ content: parsed.data, baseCommitSha, uploads }),
      });
      setBaseCommitSha(result.commitSha); setPublished(clone(parsed.data) as PortfolioContent); setUploads([]);
      localStorage.removeItem(DRAFT_KEY); setDraftRecovered(false);
      setStatus({ tone: "success", message: "Published to GitHub. Vercel is rebuilding the portfolio.", href: result.commitUrl });
    } catch (reason) {
      setStatus({ tone: "error", message: reason instanceof Error ? reason.message : "Publishing failed." });
    } finally { setPublishing(false); }
  }

  async function logout() {
    await requestJson("/api/admin/session", { method: "DELETE", body: "{}" });
    window.location.reload();
  }

  if (loading) return <main className="admin-loading"><Spinner /><span>Loading published content…</span></main>;
  if (!content || !published) return <main className="admin-loading admin-error-panel">{status?.message ?? "Content is unavailable."}</main>;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><div className="admin-wordmark">AC / ADMIN</div><h1>Portfolio workbench</h1></div>
        <div className="admin-header-actions">
          <span className={`admin-dirty ${dirty ? "is-dirty" : ""}`}>{dirty ? "Draft changes" : "Up to date"}</span>
          <button className="admin-icon-button" onClick={logout} aria-label="Sign out"><LogOut size={18} /></button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Content sections">
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} className={section === id ? "is-active" : ""} onClick={() => switchSection(id)}>
            <Icon size={17} /><span>{label}</span><strong>{content[id].length}</strong>
          </button>
        ))}
      </nav>

      {(status || draftRecovered) && (
        <div className={`admin-status ${status?.tone ?? "neutral"}`} role="status" aria-live="polite">
          <span>{status?.message ?? "Recovered an unpublished draft from this browser."}</span>
          {status?.href && <a href={status.href} target="_blank" rel="noreferrer">View commit <ExternalLink size={14} /></a>}
        </div>
      )}

      <div className="admin-workbench">
        <aside className="admin-index">
          <div className="admin-index-tools">
            <label className="admin-search"><Search size={17} /><span className="sr-only">Search records</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${section}…`} />
            </label>
            <button className="admin-button admin-button-primary" onClick={addRecord}><Plus size={17} /> Add</button>
          </div>
          <div className="admin-records">
            {filtered.length ? filtered.map((record) => {
              const title = "name" in record ? record.name || "Untitled skill" : record.title || (section === "projects" ? "Untitled project" : "Untitled role");
              const subtitle = "company" in record ? record.company : "category" in record ? record.category : "";
              return <button key={record.id} className={record.id === selectedId ? "is-active" : ""} onClick={() => setSelectedId(record.id)}>
                <span><strong>{title}</strong><small>{subtitle || record.id}</small></span><code>{String(records.findIndex((item) => item.id === record.id) + 1).padStart(2, "0")}</code>
              </button>;
            }) : <div className="admin-empty"><p>No matching records.</p><button onClick={addRecord}>Add the first one</button></div>}
          </div>
        </aside>

        <section className="admin-editor" aria-live="polite">
          {selected ? <>
            <div className="admin-editor-heading">
              <div><span>{section === "experiences" ? "Experience" : section.slice(0, -1)}</span><h2>{"name" in selected ? selected.name || "Untitled" : selected.title || "Untitled"}</h2><code>{selected.id}</code></div>
              <div className="admin-editor-actions">
                <button className="admin-icon-button" onClick={() => move(-1)} disabled={records[0]?.id === selected.id} aria-label="Move up"><ArrowUp size={18} /></button>
                <button className="admin-icon-button" onClick={() => move(1)} disabled={records.at(-1)?.id === selected.id} aria-label="Move down"><ArrowDown size={18} /></button>
                <button className="admin-icon-button danger" onClick={removeRecord} aria-label="Remove record"><Trash2 size={18} /></button>
              </div>
            </div>
            {section === "skills" && <SkillEditor skill={selected as Skill} onChange={updateRecord} />}
            {section === "projects" && <ProjectEditor project={selected as Project} onChange={updateRecord} onUpload={addImage} />}
            {section === "experiences" && <ExperienceEditor experience={selected as Experience} onChange={updateRecord} />}
          </> : <div className="admin-empty editor"><p>This section has no records.</p><button onClick={addRecord}>Add a record</button></div>}
        </section>
      </div>

      <footer className="admin-publish-bar">
        <div><strong>{dirty ? "Changes are saved as a browser draft." : "Published content is loaded."}</strong><span>Publishing commits content and managed images to {baseCommitSha.slice(0, 7)}.</span></div>
        <div>
          <button className="admin-button" disabled={!dirty || publishing} onClick={() => { setContent(clone(published)); setUploads([]); localStorage.removeItem(DRAFT_KEY); }}><RefreshCcw size={16} /> Reset</button>
          <button className="admin-button admin-button-primary" disabled={!dirty || publishing} onClick={publish} data-loading={publishing}>
            {publishing ? <><Spinner /> Publishing…</> : <><Save size={17} /> Publish</>}
          </button>
        </div>
      </footer>

      {undo && <div className="admin-undo" role="status"><span>Record removed from this draft.</span><button onClick={restoreDeleted}><Undo2 size={16} /> Undo</button></div>}
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required, error, min, max, step, multiline, helper }: {
  label: string; value: string | number; onChange: (value: string) => void; type?: string; required?: boolean;
  error?: string; min?: number; max?: number; step?: number; multiline?: boolean; helper?: string;
}) {
  const id = useMemo(() => `field-${crypto.randomUUID()}`, []);
  const shared = { id, value, required, "aria-required": required, "aria-invalid": !!error, "aria-describedby": `${id}-help`, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <label className="admin-field" htmlFor={id}><span>{label}{required && <b aria-hidden="true"> *</b>}</span>
    {multiline ? <textarea {...shared} rows={5} /> : <input {...shared} type={type} min={min} max={max} step={step} />}
    <small id={`${id}-help`} className={error ? "error" : ""}>{error || helper || " "}</small>
  </label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return <label className="admin-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><small> </small></label>;
}

function ListField({ label, values, onChange, placeholder }: { label: string; values: string[]; onChange: (values: string[]) => void; placeholder: string }) {
  return <fieldset className="admin-list-field"><legend>{label}</legend>{values.map((value, index) => <div key={`${index}-${value}`}>
    <input value={value} aria-label={`${label} ${index + 1}`} placeholder={placeholder} onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} />
    <button type="button" onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}><Trash2 size={16} /></button>
  </div>)}<button type="button" className="admin-text-button" onClick={() => onChange([...values, ""])}><Plus size={15} /> Add {label.toLowerCase()}</button></fieldset>;
}

function SkillEditor({ skill, onChange }: { skill: Skill; onChange: (skill: Skill) => void }) {
  const set = <K extends keyof Skill>(key: K, value: Skill[K]) => onChange({ ...skill, [key]: value });
  return <div className="admin-form-grid">
    <Field label="Skill name" value={skill.name} onChange={(value) => set("name", value)} required />
    <Field label="Proficiency" value={skill.proficiency} type="number" min={0} max={100} onChange={(value) => set("proficiency", Number(value))} required helper="0–100" />
    <SelectField label="Category" value={skill.category} onChange={(value) => set("category", value as Skill["category"])} options={[["frontend","Frontend"],["backend","Backend"],["infrastructure","Infrastructure"],["ai-data","AI & data"],["soft-skills","Soft skills"]]} />
    <Field label="Years of experience" value={skill.yearsOfExperience ?? ""} type="number" min={0} max={80} step={0.5} onChange={(value) => set("yearsOfExperience", value === "" ? undefined : Number(value))} />
    <Field label="Strength tag" value={skill.strengthTag ?? ""} onChange={(value) => set("strengthTag", value || undefined)} />
    <SelectField label="Priority" value={skill.priority ?? "supporting"} onChange={(value) => set("priority", value as Skill["priority"])} options={[["core","Core"],["supporting","Supporting"],["emerging","Emerging"]]} />
    <div className="admin-form-wide"><ListField label="Applied projects" values={skill.appliedIn ?? []} onChange={(value) => set("appliedIn", value)} placeholder="Project name" /></div>
  </div>;
}

function ProjectEditor({ project, onChange, onUpload }: { project: Project; onChange: (project: Project) => void; onUpload: (projectId: string, file: File) => Promise<string> }) {
  const set = <K extends keyof Project>(key: K, value: Project[K]) => onChange({ ...project, [key]: value });
  const [mediaError, setMediaError] = useState("");
  async function upload(files: FileList | null, gallery: boolean) {
    if (!files?.length) return;
    setMediaError("");
    try {
      const paths = await Promise.all([...files].map((file) => onUpload(project.id, file)));
      if (gallery) set("gallery", [...(project.gallery ?? []), ...paths]); else set("image", paths[0]);
    } catch (reason) { setMediaError(reason instanceof Error ? reason.message : "The image could not be prepared."); }
  }
  return <div className="admin-form-grid">
    <Field label="Project name" value={project.name} onChange={(value) => set("name", value)} required />
    <Field label="Tagline" value={project.tagline} onChange={(value) => set("tagline", value)} required />
    <Field label="Role" value={project.role} onChange={(value) => set("role", value)} required />
    <SelectField label="Category" value={project.category} onChange={(value) => set("category", value as Project["category"])} options={[["web","Web"],["mobile","Mobile"],["ai","AI"]]} />
    <div className="admin-form-wide"><Field label="Description" value={project.description} onChange={(value) => set("description", value)} multiline required /></div>
    <div className="admin-form-wide"><Field label="Problem" value={project.problem} onChange={(value) => set("problem", value)} multiline required /></div>
    <div className="admin-form-wide"><Field label="Solution" value={project.solution} onChange={(value) => set("solution", value)} multiline required /></div>
    <div className="admin-form-wide"><ListField label="Key decisions" values={project.keyDecisions} onChange={(value) => set("keyDecisions", value)} placeholder="Decision or outcome" /></div>
    <div className="admin-form-wide"><ListField label="Technology stack" values={project.techStack} onChange={(value) => set("techStack", value)} placeholder="Technology" /></div>
    <YouTubeField key={project.id} value={project.youtubeId} onChange={(value) => set("youtubeId", value)} />
    <label className="admin-checkbox"><input type="checkbox" checked={project.featured} onChange={(event) => set("featured", event.target.checked)} /><span>Featured project</span></label>
    <div className="admin-form-wide admin-media-block"><Field label="Main image path" value={project.image} onChange={(value) => set("image", value)} required helper="Public path or complete URL" />
      <label className="admin-upload"><ImagePlus size={17} /><span>Upload main image</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void upload(event.target.files, false)} /></label>
      {project.image && <img src={project.image} alt="Current project cover preview" />}
    </div>
    <div className="admin-form-wide admin-media-block"><ListField label="Gallery images" values={project.gallery ?? []} onChange={(value) => set("gallery", value)} placeholder="Public path or URL" />
      <label className="admin-upload"><ImagePlus size={17} /><span>Upload gallery images</span><input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => void upload(event.target.files, true)} /></label>
      {mediaError && <p className="admin-inline-error">{mediaError}</p>}
    </div>
    <div className="admin-form-wide"><h3>Project links</h3></div>
    {(["live", "github", "demo"] as const).map((key) => <Field key={key} label={`${key[0].toUpperCase()}${key.slice(1)} URL`} value={project.links?.[key] ?? ""} type="url" onChange={(value) => set("links", { ...project.links, [key]: value || undefined })} />)}
  </div>;
}

function YouTubeField({ value, onChange }: { value?: string; onChange: (value?: string) => void }) {
  const [error, setError] = useState("");
  function validate(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.currentTarget.value;
    const id = parseYouTubeId(text);
    if (!text.trim()) { setError(""); onChange(undefined); }
    else if (!id) setError("That YouTube link was not recognized. Use a watch, share, Shorts, or embed URL.");
    else { setError(""); onChange(id); }
  }
  const id = useMemo(() => `youtube-${crypto.randomUUID()}`, []);
  return <label className="admin-field" htmlFor={id}><span>YouTube video link</span>
    <input id={id} type="url" defaultValue={youtubeUrl(value)} onBlur={validate} aria-invalid={!!error} aria-describedby={`${id}-help`} />
    <small id={`${id}-help`} className={error ? "error" : ""}>{error || "A full YouTube URL; the video ID is stored automatically."}</small>
  </label>;
}

function ExperienceEditor({ experience, onChange }: { experience: Experience; onChange: (experience: Experience) => void }) {
  const set = <K extends keyof Experience>(key: K, value: Experience[K]) => onChange({ ...experience, [key]: value });
  return <div className="admin-form-grid">
    <Field label="Job title" value={experience.title} onChange={(value) => set("title", value)} required />
    <Field label="Company" value={experience.company} onChange={(value) => set("company", value)} required />
    <Field label="Period" value={experience.period} onChange={(value) => set("period", value)} required helper="For example: Feb 2026 – Present" />
    <Field label="Location" value={experience.location} onChange={(value) => set("location", value)} required />
    <SelectField label="Experience type" value={experience.type} onChange={(value) => set("type", value as Experience["type"])} options={[["tech","Technology"],["hospitality","Hospitality"]]} />
    <div className="admin-form-wide"><ListField label="Achievements" values={experience.achievements} onChange={(value) => set("achievements", value)} placeholder="Achievement" /></div>
    <div className="admin-form-wide"><ListField label="Responsibilities" values={experience.responsibilities} onChange={(value) => set("responsibilities", value)} placeholder="Responsibility" /></div>
    <div className="admin-form-wide"><ListField label="Technologies" values={experience.technologies ?? []} onChange={(value) => set("technologies", value)} placeholder="Technology" /></div>
  </div>;
}

function Spinner() { return <span className="admin-spinner" aria-hidden="true" />; }

async function optimizeImage(file: File, projectId: string): Promise<MediaUpload> {
  if (!file.type.match(/^image\/(jpeg|png|webp)$/)) throw new Error("Use a JPEG, PNG, or WebP image.");
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  let blob: Blob | null = null;
  for (const quality of [0.82, 0.72, 0.62, 0.52]) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    if (blob && blob.size <= 700 * 1024) break;
    scale *= 0.82;
  }
  bitmap.close();
  if (!blob || blob.size > 700 * 1024) throw new Error("The image could not be reduced below 700 KB.");
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = ""; for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  const safeProject = projectId.replace(/[^a-z0-9-]/g, "-");
  return { path: `public/projects/admin/${safeProject}/${crypto.randomUUID()}.webp`, contentBase64: btoa(binary), mime: "image/webp", size: bytes.length };
}

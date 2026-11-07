"use client";

import { useState, type FormEvent } from "react";
import {
  useHomepageContent,
  type HomepageContent,
  type HomepageProject,
  type ProjectArt,
} from "../../homepage-content";

type TextContentKey = Exclude<keyof HomepageContent, "projects">;

const artOptions: { value: ProjectArt; label: string }[] = [
  { value: "solstice", label: "Solstice" },
  { value: "otherworld", label: "Otherworld" },
  { value: "soft-forms", label: "Soft Forms" },
  { value: "new-ritual", label: "New Ritual" },
  { value: "daydream", label: "Daydream" },
];

function ContentField({
  label,
  value,
  multiline = false,
  onChange,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  const className =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#10120f] px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-[#65675f] focus:border-acid/60";
  return (
    <label className="block text-xs font-medium text-[#a5a69f]">
      {label}
      {multiline ? (
        <textarea
          className={`${className} min-h-24 resize-y leading-6`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={className}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function SectionCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#171914] p-5 sm:p-6">
      <div className="mb-6 flex items-start gap-4 border-b border-white/10 pb-5">
        <span className="pt-0.5 font-mono text-xs text-acid">{number}</span>
        <div>
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-[#85877e]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const { content, setContent, loaded, error } = useHomepageContent();
  const [projectDraft, setProjectDraft] = useState<HomepageProject | null>(null);

  function updateContent(key: TextContentKey, value: string) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectDraft) return;
    const exists = content.projects.some((project) => project.id === projectDraft.id);
    setContent((current) => ({
      ...current,
      projects: exists
        ? current.projects.map((project) => (project.id === projectDraft.id ? projectDraft : project))
        : [...current.projects, projectDraft],
    }));
    setProjectDraft(null);
  }

  function deleteProject(project: HomepageProject) {
    if (!window.confirm(`Delete "${project.name}" from the homepage?`)) return;
    setContent((current) => ({
      ...current,
      projects: current.projects.filter((item) => item.id !== project.id),
    }));
  }

  function newProject() {
    setProjectDraft({
      id: crypto.randomUUID(),
      name: "",
      category: "",
      art: "solstice",
    });
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-paper px-6 py-12 text-ink">
        <p className="mx-auto max-w-6xl text-sm text-muted">Loading homepage content…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
          <div>
            <a className="text-xs text-[#979892] transition hover:text-acid" href="/">
              ← View homepage
            </a>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.24em] text-acid">
              FORME / CONTENT STUDIO
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Homepage dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Edit every homepage section and manage the work carousel. Changes save automatically in this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#c5c6bf] transition hover:border-acid/60 hover:text-acid"
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              Preview homepage ↗
            </a>
            <a
              className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#c5c6bf] transition hover:border-red-400/50 hover:text-red-200"
              href="/dashboard/logout"
            >
              Log out
            </a>
          </div>
        </header>

        {error && (
          <p role="alert" className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard number="01" title="Header & contact" description="Brand, navigation, and the email used across the site.">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContentField label="Brand name" value={content.brandName} onChange={(value) => updateContent("brandName", value)} />
              <ContentField label="Contact email" value={content.contactEmail} onChange={(value) => updateContent("contactEmail", value)} />
              <ContentField label="Work navigation label" value={content.navWorkLabel} onChange={(value) => updateContent("navWorkLabel", value)} />
              <ContentField label="Studio navigation label" value={content.navStudioLabel} onChange={(value) => updateContent("navStudioLabel", value)} />
            </div>
          </SectionCard>

          <SectionCard number="02" title="Hero" description="The introduction and call to action at the top of the homepage.">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContentField label="Eyebrow" value={content.heroEyebrow} onChange={(value) => updateContent("heroEyebrow", value)} />
              <ContentField label="Title — first line" value={content.heroTitleLine1} onChange={(value) => updateContent("heroTitleLine1", value)} />
              <ContentField label="Title — second line" value={content.heroTitleLine2} onChange={(value) => updateContent("heroTitleLine2", value)} />
              <ContentField label="Title — accent" value={content.heroAccent} onChange={(value) => updateContent("heroAccent", value)} />
              <ContentField label="Description" value={content.heroDescription} multiline onChange={(value) => updateContent("heroDescription", value)} />
              <ContentField label="Call to action" value={content.heroCta} onChange={(value) => updateContent("heroCta", value)} />
              <ContentField label="Scroll prompt" value={content.heroScrollText} onChange={(value) => updateContent("heroScrollText", value)} />
              <ContentField label="Bottom note" value={content.heroFootnote} onChange={(value) => updateContent("heroFootnote", value)} />
            </div>
          </SectionCard>

          <SectionCard number="03" title="Selected work" description="Section copy and all carousel projects.">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContentField label="Eyebrow" value={content.workEyebrow} onChange={(value) => updateContent("workEyebrow", value)} />
              <ContentField label="Heading" value={content.workTitle} onChange={(value) => updateContent("workTitle", value)} />
              <ContentField label="Heading accent" value={content.workAccent} onChange={(value) => updateContent("workAccent", value)} />
              <ContentField label="Artwork caption" value={content.workArtCaption} onChange={(value) => updateContent("workArtCaption", value)} />
              <div className="sm:col-span-2">
                <ContentField label="Description (new line creates a line break)" value={content.workDescription} multiline onChange={(value) => updateContent("workDescription", value)} />
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a5a69f]">
                  Projects <span className="text-[#777970]">({content.projects.length})</span>
                </h3>
                <button
                  className="rounded-full bg-acid px-3.5 py-2 text-xs font-semibold text-paper transition hover:bg-[#e0ff86]"
                  type="button"
                  onClick={newProject}
                >
                  + Add project
                </button>
              </div>

              <ul className="space-y-2">
                {content.projects.map((project, index) => (
                  <li key={project.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#10120f] px-3.5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{project.name || "Untitled project"}</p>
                      <p className="mt-1 truncate text-xs text-[#85877e]">
                        {String(index + 1).padStart(2, "0")} · {project.category} · {artOptions.find((option) => option.value === project.art)?.label}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#c5c6bf] transition hover:border-acid/50 hover:text-acid"
                        type="button"
                        onClick={() => setProjectDraft({ ...project })}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#c5c6bf] transition hover:border-red-400/50 hover:text-red-200"
                        type="button"
                        onClick={() => deleteProject(project)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                {content.projects.length === 0 && (
                  <li className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-xs text-[#85877e]">
                    No projects yet. Add one to bring the carousel back to life.
                  </li>
                )}
              </ul>

              {projectDraft && (
                <form className="mt-4 space-y-4 rounded-xl border border-acid/30 bg-paper p-4" onSubmit={saveProject}>
                  <h3 className="text-sm font-semibold">{content.projects.some((project) => project.id === projectDraft.id) ? "Edit project" : "New project"}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ContentField label="Project name" value={projectDraft.name} onChange={(value) => setProjectDraft({ ...projectDraft, name: value })} />
                    <ContentField label="Category / year" value={projectDraft.category} onChange={(value) => setProjectDraft({ ...projectDraft, category: value })} />
                    <label className="block text-xs font-medium text-[#a5a69f]">
                      Artwork style
                      <select
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#10120f] px-3.5 py-3 text-sm text-ink outline-none focus:border-acid/60"
                        value={projectDraft.art}
                        onChange={(event) => setProjectDraft({ ...projectDraft, art: event.target.value as ProjectArt })}
                      >
                        {artOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#c5c6bf] hover:border-white/30" type="button" onClick={() => setProjectDraft(null)}>
                      Cancel
                    </button>
                    <button className="rounded-full bg-acid px-4 py-2 text-xs font-semibold text-paper hover:bg-[#e0ff86]" type="submit">
                      Save project
                    </button>
                  </div>
                </form>
              )}
            </div>
          </SectionCard>

          <SectionCard number="04" title="The studio" description="The studio statement and contact call to action.">
            <div className="grid gap-4">
              <ContentField label="Eyebrow" value={content.studioEyebrow} onChange={(value) => updateContent("studioEyebrow", value)} />
              <ContentField label="Statement — first part" value={content.studioTextLead} onChange={(value) => updateContent("studioTextLead", value)} />
              <ContentField label="Statement — highlighted part" value={content.studioTextMuted} onChange={(value) => updateContent("studioTextMuted", value)} />
              <ContentField label="Call to action" value={content.studioCta} onChange={(value) => updateContent("studioCta", value)} />
            </div>
          </SectionCard>

          <SectionCard number="05" title="Footer" description="The copyright line. Footer contact uses the email above.">
            <ContentField label="Copyright text" value={content.footerCopyright} onChange={(value) => updateContent("footerCopyright", value)} />
          </SectionCard>
        </div>
      </div>
    </main>
  );
}

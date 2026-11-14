"use client";

import { useState, type FormEvent } from "react";
import {
  useHomepageContent,
  type HomepageContent,
  type HomepageProject,
  type ProjectArt,
} from "../../homepage-content";
import { useNewsContent } from "../../news/news-content";
import type { NewsItem } from "../../news/news-data";

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

function newNewsItem(id: number): NewsItem {
  return {
    id,
    slug: "",
    title: "",
    category: "",
    readTime: "5 min read",
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    author: "",
    deck: "",
    heroImage: "",
    heroAlt: "",
    accent: "from-cyan-400 via-sky-500 to-indigo-500",
    content: [{ heading: "Story", paragraphs: [""] }],
  };
}

export default function DashboardPage() {
  const { content, setContent, loaded, error } = useHomepageContent();
  const {
    items: managedNews,
    setItems: setManagedNews,
    loaded: newsLoaded,
    error: newsError,
  } = useNewsContent();
  const [projectDraft, setProjectDraft] = useState<HomepageProject | null>(null);
  const [newsDraft, setNewsDraft] = useState<NewsItem | null>(null);
  const [newsFormError, setNewsFormError] = useState("");

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

  function saveNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newsDraft) return;
    const slug = newsDraft.slug.trim();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setNewsFormError("Use a lowercase URL slug with words separated by hyphens.");
      return;
    }
    if (
      !newsDraft.title.trim() ||
      !newsDraft.category.trim() ||
      !newsDraft.readTime.trim() ||
      !newsDraft.publishedAt.trim() ||
      !newsDraft.author.trim() ||
      !newsDraft.deck.trim() ||
      !newsDraft.heroImage.trim() ||
      !newsDraft.heroAlt.trim()
    ) {
      setNewsFormError("Complete the title, category, author, summary, image URL, and image description.");
      return;
    }
    if (
      newsDraft.content.some(
        (section) => !section.heading.trim() || !section.paragraphs.some((paragraph) => paragraph.trim()),
      )
    ) {
      setNewsFormError("Each article section needs a heading and at least one paragraph.");
      return;
    }
    if (managedNews.some((item) => item.slug === slug && item.id !== newsDraft.id)) {
      setNewsFormError("A story with this URL slug already exists.");
      return;
    }

    const item = {
      ...newsDraft,
      slug,
      title: newsDraft.title.trim(),
      category: newsDraft.category.trim(),
      author: newsDraft.author.trim(),
      deck: newsDraft.deck.trim(),
      content: newsDraft.content.map((section) => ({
        heading: section.heading.trim(),
        paragraphs: section.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
      })),
    };
    const exists = managedNews.some((story) => story.id === item.id);
    setManagedNews((current) =>
      exists
        ? current.map((story) => (story.id === item.id ? item : story))
        : [item, ...current],
    );
    setNewsDraft(null);
    setNewsFormError("");
  }

  function deleteNews(item: NewsItem) {
    if (!window.confirm(`Delete "${item.title}" from the newsroom?`)) return;
    setManagedNews((current) => current.filter((story) => story.id !== item.id));
  }

  if (!loaded || !newsLoaded) {
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
        {newsError && (
          <p role="alert" className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {newsError}
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

          <section className="rounded-2xl border border-white/10 bg-[#171914] p-5 sm:p-6 lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-start gap-4">
                <span className="pt-0.5 font-mono text-xs text-acid">06</span>
                <div>
                  <h2 className="text-base font-semibold text-ink">Newsroom</h2>
                  <p className="mt-1 text-xs leading-5 text-[#85877e]">
                    Create, edit, and remove stories shown on the news page. Changes save in this browser.
                  </p>
                </div>
              </div>
              <button
                className="rounded-full bg-acid px-3.5 py-2 text-xs font-semibold text-paper transition hover:bg-[#e0ff86]"
                type="button"
                onClick={() => {
                  setNewsDraft(newNewsItem(Math.max(Date.now(), ...managedNews.map((item) => item.id + 1))));
                  setNewsFormError("");
                }}
              >
                + Add story
              </button>
            </div>

            <ul className="space-y-2">
              {managedNews.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#10120f] px-3.5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title || "Untitled story"}</p>
                    <p className="mt-1 truncate text-xs text-[#85877e]">{item.category} · /news/{item.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#c5c6bf] transition hover:border-acid/50 hover:text-acid"
                      type="button"
                      onClick={() => {
                        setNewsDraft({
                          ...item,
                          content: item.content.map((section) => ({
                            ...section,
                            paragraphs: [...section.paragraphs],
                          })),
                        });
                        setNewsFormError("");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#c5c6bf] transition hover:border-red-400/50 hover:text-red-200"
                      type="button"
                      onClick={() => deleteNews(item)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              {managedNews.length === 0 && (
                <li className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-xs text-[#85877e]">
                  No news stories yet. Add one to publish the first story.
                </li>
              )}
            </ul>

            {newsDraft && (
              <form className="mt-4 space-y-4 rounded-xl border border-acid/30 bg-paper p-4" onSubmit={saveNews}>
                <h3 className="text-sm font-semibold">
                  {managedNews.some((item) => item.id === newsDraft.id) ? "Edit story" : "New story"}
                </h3>
                {newsFormError && <p role="alert" className="text-sm text-red-300">{newsFormError}</p>}
                <div className="grid gap-4 sm:grid-cols-2">
                  <ContentField label="Title" value={newsDraft.title} onChange={(value) => setNewsDraft({ ...newsDraft, title: value })} />
                  <ContentField label="URL slug" value={newsDraft.slug} onChange={(value) => setNewsDraft({ ...newsDraft, slug: value })} />
                  <ContentField label="Category" value={newsDraft.category} onChange={(value) => setNewsDraft({ ...newsDraft, category: value })} />
                  <ContentField label="Read time" value={newsDraft.readTime} onChange={(value) => setNewsDraft({ ...newsDraft, readTime: value })} />
                  <ContentField label="Published date" value={newsDraft.publishedAt} onChange={(value) => setNewsDraft({ ...newsDraft, publishedAt: value })} />
                  <ContentField label="Author" value={newsDraft.author} onChange={(value) => setNewsDraft({ ...newsDraft, author: value })} />
                  <ContentField label="Hero image URL" value={newsDraft.heroImage} onChange={(value) => setNewsDraft({ ...newsDraft, heroImage: value })} />
                  <ContentField label="Hero image description" value={newsDraft.heroAlt} onChange={(value) => setNewsDraft({ ...newsDraft, heroAlt: value })} />
                  <div className="sm:col-span-2">
                    <ContentField label="Deck / summary" value={newsDraft.deck} multiline onChange={(value) => setNewsDraft({ ...newsDraft, deck: value })} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a5a69f]">Article sections</h4>
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#c5c6bf] hover:border-acid/50 hover:text-acid"
                      onClick={() => setNewsDraft({
                        ...newsDraft,
                        content: [...newsDraft.content, { heading: "", paragraphs: [""] }],
                      })}
                    >
                      + Add section
                    </button>
                  </div>
                  {newsDraft.content.map((section, index) => (
                    <div key={index} className="rounded-xl border border-white/10 p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-[#85877e]">Section {index + 1}</span>
                        {newsDraft.content.length > 1 && (
                          <button
                            type="button"
                            className="text-xs text-red-200 hover:text-red-100"
                            onClick={() => setNewsDraft({
                              ...newsDraft,
                              content: newsDraft.content.filter((_, sectionIndex) => sectionIndex !== index),
                            })}
                          >
                            Remove section
                          </button>
                        )}
                      </div>
                      <div className="grid gap-4">
                        <ContentField
                          label="Section heading"
                          value={section.heading}
                          onChange={(value) => setNewsDraft({
                            ...newsDraft,
                            content: newsDraft.content.map((part, sectionIndex) =>
                              sectionIndex === index ? { ...part, heading: value } : part,
                            ),
                          })}
                        />
                        <ContentField
                          label="Paragraphs (one paragraph per line)"
                          value={section.paragraphs.join("\n")}
                          multiline
                          onChange={(value) => setNewsDraft({
                            ...newsDraft,
                            content: newsDraft.content.map((part, sectionIndex) =>
                              sectionIndex === index
                                ? { ...part, paragraphs: value.split("\n") }
                                : part,
                            ),
                          })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#c5c6bf] hover:border-white/30" type="button" onClick={() => { setNewsDraft(null); setNewsFormError(""); }}>
                    Cancel
                  </button>
                  <button className="rounded-full bg-acid px-4 py-2 text-xs font-semibold text-paper hover:bg-[#e0ff86]" type="submit">
                    Save story
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

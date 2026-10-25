"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export type ProjectArt = "solstice" | "otherworld" | "soft-forms" | "new-ritual" | "daydream";

export type HomepageProject = {
  id: string;
  name: string;
  category: string;
  art: ProjectArt;
};

export type HomepageContent = {
  brandName: string;
  navWorkLabel: string;
  navStudioLabel: string;
  contactEmail: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroAccent: string;
  heroDescription: string;
  heroCta: string;
  heroScrollText: string;
  heroFootnote: string;
  workEyebrow: string;
  workTitle: string;
  workAccent: string;
  workDescription: string;
  workArtCaption: string;
  studioEyebrow: string;
  studioTextLead: string;
  studioTextMuted: string;
  studioCta: string;
  footerCopyright: string;
  projects: HomepageProject[];
};

export const defaultHomepageContent: HomepageContent = {
  brandName: "FORME",
  navWorkLabel: "Selected work",
  navStudioLabel: "The studio",
  contactEmail: "hello@forme.studio",
  heroEyebrow: "Independent creative studio · Est. 2018",
  heroTitleLine1: "Ideas in",
  heroTitleLine2: "another",
  heroAccent: "dimension.",
  heroDescription:
    "We make the unseen feel real. A design studio shaping distinct identities and digital worlds for what's next.",
  heroCta: "Explore our work",
  heroScrollText: "Scroll to explore",
  heroFootnote: "Independent by nature. Curious by design.",
  workEyebrow: "A few things we've made",
  workTitle: "Selected",
  workAccent: "work",
  workDescription: "Identity, digital, and other good things.\nMade with intention, never by the numbers.",
  workArtCaption: "A study in form & feeling",
  studioEyebrow: "Small studio. Big imagination.",
  studioTextLead: "We partner with people making",
  studioTextMuted: "the future feel a little more human.",
  studioCta: "A project in mind? Say hello",
  footerCopyright: "© FORME STUDIO 2025",
  projects: [
    { id: "solstice", name: "Solstice", category: "Art direction · 2025", art: "solstice" },
    { id: "otherworld", name: "Otherworld", category: "Digital experience · 2025", art: "otherworld" },
    { id: "soft-forms", name: "Soft Forms", category: "Identity · 2024", art: "soft-forms" },
    { id: "new-ritual", name: "New Ritual", category: "Campaign · 2024", art: "new-ritual" },
    { id: "daydream", name: "Daydream", category: "Packaging · 2024", art: "daydream" },
  ],
};

const storageKey = "forme-homepage-content";

function isHomepageContent(value: unknown): value is HomepageContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Record<string, unknown>;
  const textFields = Object.keys(defaultHomepageContent).filter((key) => key !== "projects");
  return (
    textFields.every((key) => typeof content[key] === "string") &&
    Array.isArray(content.projects) &&
    content.projects.every(
      (project: unknown) =>
        !!project &&
        typeof project === "object" &&
        typeof (project as HomepageProject).id === "string" &&
        typeof (project as HomepageProject).name === "string" &&
        typeof (project as HomepageProject).category === "string" &&
        ["solstice", "otherworld", "soft-forms", "new-ritual", "daydream"].includes(
          (project as HomepageProject).art,
        ),
    )
  );
}

export function useHomepageContent() {
  const [content, setHomepageContent] = useState(defaultHomepageContent);
  const [loaded, setLoaded] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedContent = window.localStorage.getItem(storageKey);
      if (savedContent) {
        const parsed: unknown = JSON.parse(savedContent);
        if (!isHomepageContent(parsed)) {
          setError("Saved homepage content is invalid. Changes may not persist until it is replaced.");
        } else {
          setHomepageContent(parsed);
          setStorageReady(true);
        }
      } else {
        setStorageReady(true);
      }
    } catch {
      setError("Could not read saved homepage content from this browser.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || !storageReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(content));
      setError("");
    } catch {
      setError("Could not save homepage content to this browser.");
    }
  }, [content, loaded, storageReady]);

  useEffect(() => {
    function syncFromStorage(event: StorageEvent) {
      if (event.key !== storageKey || !event.newValue) return;
      try {
        const parsed: unknown = JSON.parse(event.newValue);
        if (isHomepageContent(parsed)) setHomepageContent(parsed);
      } catch {
        setError("Could not read homepage content changed in another tab.");
      }
    }

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const setContent: Dispatch<SetStateAction<HomepageContent>> = (nextContent) => {
    setStorageReady(true);
    setHomepageContent(nextContent);
  };

  return { content, setContent, loaded, error };
}

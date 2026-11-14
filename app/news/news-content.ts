"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { newsItems, type NewsItem } from "./news-data";

const storageKey = "future-signals-news";

function isNewsItem(value: unknown): value is NewsItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    Number.isSafeInteger(item.id) &&
    typeof item.slug === "string" &&
    typeof item.title === "string" &&
    typeof item.category === "string" &&
    typeof item.readTime === "string" &&
    typeof item.publishedAt === "string" &&
    typeof item.author === "string" &&
    typeof item.deck === "string" &&
    typeof item.heroImage === "string" &&
    typeof item.heroAlt === "string" &&
    typeof item.accent === "string" &&
    Array.isArray(item.content) &&
    item.content.length > 0 &&
    item.content.every(
      (section: unknown) =>
        !!section &&
        typeof section === "object" &&
        typeof (section as Record<string, unknown>).heading === "string" &&
        Array.isArray((section as Record<string, unknown>).paragraphs) &&
        (section as { paragraphs: unknown[] }).paragraphs.every(
          (paragraph) => typeof paragraph === "string",
        ),
    )
  );
}

function isNewsList(value: unknown): value is NewsItem[] {
  if (!Array.isArray(value) || !value.every(isNewsItem)) return false;
  const slugs = value.map((item) => item.slug);
  const ids = value.map((item) => item.id);
  return new Set(slugs).size === slugs.length && new Set(ids).size === ids.length;
}

export function useNewsContent() {
  const [items, setNewsItems] = useState(newsItems);
  const [loaded, setLoaded] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedItems = window.localStorage.getItem(storageKey);
      if (savedItems) {
        const parsed: unknown = JSON.parse(savedItems);
        if (!isNewsList(parsed)) {
          setError("Saved news content is invalid. Changes may not persist until it is replaced.");
        } else {
          setNewsItems(parsed);
          setStorageReady(true);
        }
      } else {
        setStorageReady(true);
      }
    } catch {
      setError("Could not read saved news content from this browser.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded || !storageReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
      setError("");
    } catch {
      setError("Could not save news content to this browser.");
    }
  }, [items, loaded, storageReady]);

  useEffect(() => {
    function syncFromStorage(event: StorageEvent) {
      if (event.key !== storageKey || !event.newValue) return;
      try {
        const parsed: unknown = JSON.parse(event.newValue);
        if (isNewsList(parsed)) {
          setNewsItems(parsed);
          setStorageReady(true);
          setError("");
        } else {
          setError("News content changed in another tab is invalid.");
        }
      } catch {
        setError("Could not read news content changed in another tab.");
      }
    }

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const setItems: Dispatch<SetStateAction<NewsItem[]>> = (nextItems) => {
    setStorageReady(true);
    setNewsItems(nextItems);
  };

  return { items, setItems, loaded, error };
}

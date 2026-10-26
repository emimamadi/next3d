"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import "./blog.css";

type Category = "All" | "Culture" | "Tech" | "Style" | "Travel";

type Story = {
  category: Exclude<Category, "All">;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  image: string;
  imageAlt: string;
  tone: string;
};

const categories: Category[] = ["All", "Culture", "Tech", "Style", "Travel"];

const stories: Story[] = [
  {
    category: "Culture",
    title: "The art of doing nothing is having a moment",
    excerpt:
      "In a world that never stops scrolling, a new generation is finding beauty in the pause.",
    author: "Maya Ellis",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1300&q=85",
    imageAlt: "Golden morning light spilling across a quiet landscape",
    tone: "sunrise",
  },
  {
    category: "Tech",
    title: "Your next favorite creative tool might be a little more human",
    excerpt:
      "The makers building thoughtful technology are asking a different question: what if it simply felt good to use?",
    author: "Jordan Kim",
    time: "8 min read",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Colorful circuit board details",
    tone: "electric",
  },
  {
    category: "Style",
    title: "Getting dressed like you already know who you are",
    excerpt:
      "Forget the micro-trends. Personal style is less about finding a look and more about trusting your own.",
    author: "Nina Laurent",
    time: "5 min read",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Fashion editorial portrait in warm late-afternoon light",
    tone: "rose",
  },
  {
    category: "Travel",
    title: "A slower kind of summer, somewhere by the sea",
    excerpt:
      "Small coastal towns, long lunches, and the underrated magic of having nowhere else to be.",
    author: "Theo Martin",
    time: "7 min read",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Soft blue ocean waves in the afternoon",
    tone: "ocean",
  },
  {
    category: "Culture",
    title: "Why everybody is making things with their hands again",
    excerpt:
      "From pottery studios to tiny zines, making something tangible feels like its own kind of reset.",
    author: "Avery Brooks",
    time: "4 min read",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Creative desk covered with colorful art supplies",
    tone: "tangerine",
  },
  {
    category: "Tech",
    title: "The little devices making a big case for less screen time",
    excerpt:
      "A wave of delightfully focused gadgets is bringing back the joy of doing one thing at a time.",
    author: "Sam Rivera",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "People collaborating around a laptop at a bright desk",
    tone: "violet",
  },
];

const trendingTopics = [
  { label: "The slow-living reset", query: "nothing" },
  { label: "AI, but make it useful", query: "creative" },
  { label: "A new era of personal style", query: "style" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function StoryCard({
  story,
  index,
  onOpen,
}: {
  story: Story;
  index: number;
  onOpen: (story: Story) => void;
}) {
  return (
    <button className="blog-story-card" onClick={() => onOpen(story)} type="button">
      <span
        className={`blog-story-image blog-tone-${story.tone}`}
        style={{ backgroundImage: `url("${story.image}")` }}
        role="img"
        aria-label={story.imageAlt}
      >
        <span className="blog-image-index">0{index + 1}</span>
        <span className="blog-image-arrow"><ArrowIcon /></span>
      </span>
      <span className="blog-card-copy">
        <span className="blog-card-category">{story.category}</span>
        <span className="blog-card-title">{story.title}</span>
        <span className="blog-card-meta">{story.author} <span>·</span> {story.time}</span>
      </span>
    </button>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesCategory = activeCategory === "All" || story.category === activeCategory;
      const matchesSearch =
        !query ||
        `${story.title} ${story.excerpt} ${story.category} ${story.author}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    if (!selectedStory) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedStory(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedStory]);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <main className="blog-page">
      <div className="blog-utility-bar">
        <span>MONDAY, OCTOBER 26</span>
        <span className="blog-utility-note"><i /> A brighter take on what&apos;s happening</span>
        <a href="#newsletter">Get the daily edit <span aria-hidden="true">↗</span></a>
      </div>

      <header className="blog-header">
        <a className="blog-brand" href="/blog" aria-label="The Daily Edit home">
          <span className="blog-brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>the daily<span>edit</span></span>
        </a>
        <nav className="blog-nav" aria-label="Blog categories">
          {categories.slice(1).map((category) => (
            <button
              className={activeCategory === category ? "is-active" : ""}
              key={category}
              onClick={() => {
                setActiveCategory(category);
                document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
            >
              {category}
            </button>
          ))}
        </nav>
        <label className="blog-search">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            aria-label="Search stories"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search stories"
            value={search}
          />
          <kbd>/</kbd>
        </label>
      </header>

      <section className="blog-welcome" aria-labelledby="blog-title">
        <div className="blog-welcome-copy">
          <span className="blog-kicker"><i /> A little more curious. A lot more you.</span>
          <h1 id="blog-title">A fresh take<br />on <em>what&apos;s next.</em></h1>
          <p>Good stories for wherever your curiosity takes you.</p>
          <a className="blog-primary-link" href="#latest">Explore today&apos;s stories <ArrowIcon /></a>
          <span className="blog-welcome-index">YOUR DAILY DOSE OF DISCOVERY <b>·</b> VOL. 01</span>
        </div>
        <div className="blog-feature-scene" aria-label="Featured story: The art of doing nothing is having a moment">
          <div className="blog-orbit blog-orbit-one" />
          <div className="blog-orbit blog-orbit-two" />
          <button
            className="blog-feature-card"
            onClick={() => setSelectedStory(stories[0])}
            style={{ backgroundImage: `url("${stories[0].image}")` }}
            type="button"
          >
            <span className="blog-feature-label"><i /> TODAY&apos;S BIG READ</span>
            <span className="blog-feature-bottom">
              <span>Culture <b>·</b> 6 min read</span>
              <strong>The art of doing nothing<br />is having a moment</strong>
              <span className="blog-feature-cta">Read the story <ArrowIcon /></span>
            </span>
          </button>
          <span className="blog-float-note">A little room<br />to breathe <b>✳</b></span>
          <span className="blog-scene-caption">FIG. 01 — THE EVERYDAY, REIMAGINED</span>
        </div>
      </section>

      <section className="blog-trending" aria-label="Trending topics">
        <span className="blog-trending-title"><i /> In the conversation</span>
        {trendingTopics.map((topic, index) => (
          <button
            key={topic.label}
            onClick={() => {
              setSearch(topic.query);
              setActiveCategory("All");
              document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
            }}
            type="button"
          >
            <span>0{index + 1}</span>{topic.label}<ArrowIcon />
          </button>
        ))}
      </section>

      <section className="blog-latest" id="latest" aria-labelledby="latest-title">
        <div className="blog-section-heading">
          <div>
            <span className="blog-section-eyebrow">THE GOOD STUFF, RIGHT NOW</span>
            <h2 id="latest-title">Worth your <em>time.</em></h2>
          </div>
          <div className="blog-filter-row" aria-label="Filter stories">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={activeCategory === category ? "is-active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {filteredStories.length ? (
          <div className="blog-story-grid">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.title} story={story} index={index} onOpen={setSelectedStory} />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state">
            <span aria-hidden="true">✳</span>
            <p>No stories found for “{search}”. Try another search.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }} type="button">
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="blog-newsletter" id="newsletter">
        <div className="blog-newsletter-orb" aria-hidden="true" />
        <div>
          <span className="blog-section-eyebrow">A GOOD THING IN YOUR INBOX</span>
          <h2>A little inspiration.<br /><em>Right on time.</em></h2>
          <p>Our favorite reads and fresh perspectives, delivered with your morning coffee.</p>
        </div>
        <form className="blog-newsletter-form" onSubmit={subscribe}>
          <label htmlFor="newsletter-email">Your email address</label>
          <div>
            <input
              autoComplete="email"
              id="newsletter-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
            <button type="submit" aria-label="Subscribe to the newsletter">
              <ArrowIcon />
            </button>
          </div>
          <span aria-live="polite">
            {subscribed
              ? "Thanks for your interest. Newsletter delivery isn't connected yet."
              : "No noise, just the good stuff. Unsubscribe anytime."}
          </span>
        </form>
      </section>

      <footer className="blog-footer">
        <a className="blog-brand" href="/blog">
          <span className="blog-brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>the daily<span>edit</span></span>
        </a>
        <span>STAY CURIOUS. KEEP YOUR OWN PERSPECTIVE.</span>
        <span>© 2026 THE DAILY EDIT</span>
      </footer>

      {selectedStory && (
        <div className="blog-modal-backdrop" onClick={() => setSelectedStory(null)}>
          <section
            aria-labelledby="story-dialog-title"
            aria-modal="true"
            className="blog-story-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close story preview"
              className="blog-dialog-close"
              onClick={() => setSelectedStory(null)}
              type="button"
            >
              ×
            </button>
            <div
              className={`blog-dialog-image blog-tone-${selectedStory.tone}`}
              role="img"
              aria-label={selectedStory.imageAlt}
              style={{ backgroundImage: `url("${selectedStory.image}")` }}
            />
            <div className="blog-dialog-copy">
              <span className="blog-card-category">{selectedStory.category} <b>·</b> {selectedStory.time}</span>
              <h2 id="story-dialog-title">{selectedStory.title}</h2>
              <p>{selectedStory.excerpt}</p>
              <span>Words by {selectedStory.author}</span>
              <div className="blog-dialog-note">You&apos;re all caught up. More good reads are on the way.</div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

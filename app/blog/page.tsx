"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

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
    <button
      className="blog-story-card group w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111827] text-left transition-transform duration-200 hover:-translate-y-1"
      onClick={() => onOpen(story)}
      type="button"
    >
      <span
        className="relative block h-52 overflow-hidden border-b border-white/10 bg-cover bg-center shadow-[0_16px_30px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url("${story.image}")` }}
        role="img"
        aria-label={story.imageAlt}
      >
        <span className="absolute inset-0 bg-gradient-to-t from-[#120f1b]/80 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 z-10 font-mono text-[9px] tracking-[0.12em] text-white/80">0{index + 1}</span>
        <span className="absolute bottom-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm">
          <ArrowIcon />
        </span>
      </span>
      <span className="flex flex-col items-start px-4 pb-4 pt-3">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-violet-300">{story.category}</span>
        <span className="mt-2 text-lg font-semibold tracking-[-0.05em] text-white">{story.title}</span>
        <span className="mt-2 text-[10px] text-slate-300">{story.author} <span className="mx-1 text-slate-500">·</span> {story.time}</span>
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(147,120,255,0.18),transparent_30%),linear-gradient(180deg,#090d18_0%,#0e1324_100%)] text-slate-100">
      <div className="mx-auto flex min-h-[38px] w-[min(1220px,calc(100%-96px))] items-center justify-between border-b border-white/10 font-mono text-[9px] tracking-[0.08em] text-slate-300 md:min-h-[38px] sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)]">
        <span>MONDAY, OCTOBER 26</span>
        <span className="hidden items-center gap-2 md:inline-flex"><span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]" /> A brighter take on what&apos;s happening</span>
        <a href="#newsletter" className="transition-colors hover:text-violet-300">Get the daily edit <span aria-hidden="true">↗</span></a>
      </div>

      <header className="mx-auto flex h-[83px] w-[min(1220px,calc(100%-96px))] items-center justify-between gap-7 sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)]">
        <a className="inline-flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.075em] text-white no-underline" href="/blog" aria-label="The Daily Edit home">
          <span className="flex h-[26px] w-[25px] items-center gap-1 perspective-[70px]" aria-hidden="true">
            <i className="block h-[18px] w-[6px] -skew-y-[28deg] rotate-y-[-25deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600 shadow-[2px_2px_0_rgba(75,48,172,0.17)]" />
            <i className="block h-[25px] w-[6px] skew-y-[28deg] rotate-y-[25deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600 shadow-[2px_2px_0_rgba(75,48,172,0.17)]" />
            <i className="block h-[14px] w-[6px] -skew-y-[28deg] rotate-y-[-25deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600 shadow-[2px_2px_0_rgba(75,48,172,0.17)]" />
          </span>
          <span>the daily<span className="text-violet-300">edit</span></span>
        </a>
        <nav className="ml-auto hidden items-center gap-[clamp(18px,3vw,40px)] md:flex" aria-label="Blog categories">
          {categories.slice(1).map((category) => (
            <button
              className={activeCategory === category ? "text-violet-300" : "text-slate-400 transition-colors hover:text-violet-300"}
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
        <label className="ml-auto flex h-9 w-[205px] items-center gap-2 rounded-lg border border-white/10 bg-slate-950/70 px-2.5 text-slate-300 md:ml-0">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-slate-400">
            <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            aria-label="Search stories"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search stories"
            value={search}
            className="w-full border-0 bg-transparent text-[11px] text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="rounded border border-white/10 bg-slate-900 px-1.5 font-mono text-[9px] text-slate-400">/</kbd>
        </label>
      </header>

      <section className="mx-auto mt-4 grid min-h-113.75 w-[min(1220px,calc(100%-96px))] items-center gap-8 rounded-[26px] border border-violet-500/20 bg-[radial-gradient(circle_at_80%_50%,rgba(143,110,255,0.32),transparent_30%),linear-gradient(120deg,#0b1429_0%,#101c33_50%,#0b1322_100%)] px-[7.2%] py-12 shadow-[0_24px_70px_rgba(14,18,34,0.55)] sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)] md:grid-cols-[0.86fr_1.14fr]" aria-labelledby="blog-title">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-300"><span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]" /> A little more curious. A lot more you.</span>
          <h1 id="blog-title" className="mt-5 text-[clamp(46px,6.1vw,77px)] font-semibold leading-[0.98] tracking-[-0.085em] text-white">A fresh take<br />on <em className="font-serif text-violet-300 not-italic tracking-[-0.08em]">what&apos;s next.</em></h1>
          <p className="mt-4 max-w-[320px] text-sm leading-7 text-slate-300">Good stories for wherever your curiosity takes you.</p>
          <a className="mt-6 inline-flex items-center gap-4 rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-3 text-[11px] font-medium text-white shadow-[0_12px_26px_rgba(133,108,245,0.38)] transition-transform hover:-translate-y-0.5" href="#latest">Explore today&apos;s stories <ArrowIcon /></a>
          <span className="mt-12 block font-mono text-[8px] tracking-[0.1em] text-slate-300">YOUR DAILY DOSE OF DISCOVERY <span className="mx-1 text-violet-300">·</span> VOL. 01</span>
        </div>
        <div className="relative grid min-w-0 place-items-center" aria-label="Featured story: The art of doing nothing is having a moment">
          <div className="absolute h-[72%] w-[90%] rounded-full border border-violet-400/20" />
          <div className="absolute h-[88%] w-[78%] rounded-full border border-violet-400/10" style={{ transform: "rotate(33deg) rotateX(68deg)" }} />
          <button
            className="relative flex h-[315px] w-[min(76%,425px)] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-cover bg-center p-4 text-left text-white shadow-[20px_32px_56px_rgba(12,17,28,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[29px_42px_68px_rgba(12,17,28,0.6)]"
            onClick={() => setSelectedStory(stories[0])}
            style={{ backgroundImage: `url("${stories[0].image}")`, transform: "rotateY(-10deg) rotateX(3deg) rotateZ(-2deg)" }}
            type="button"
          >
            <span className="relative z-10 inline-flex items-center gap-2 self-start rounded-md border border-white/30 bg-slate-900/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(214,240,123,0.8)]" /> TODAY&apos;S BIG READ</span>
            <span className="relative z-10 flex flex-col items-start gap-2">
              <span className="font-mono text-[9px] tracking-[0.04em] text-slate-100">Culture <span className="mx-1 text-lime-300">·</span> 6 min read</span>
              <strong className="text-[clamp(19px,2.4vw,28px)] font-semibold leading-[1.08] tracking-[-0.045em]">The art of doing nothing<br />is having a moment</strong>
              <span className="inline-flex items-center gap-2 text-[10px] text-white">Read the story <ArrowIcon /></span>
            </span>
          </button>
          <span className="absolute right-0 top-[6%] rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-slate-100 backdrop-blur-sm">A little room<br />to breathe <span className="text-violet-300">✳</span></span>
        </div>
      </section>

      <section className="mx-auto mt-10 grid w-[min(1220px,calc(100%-96px))] gap-3 rounded-[20px] border border-white/10 bg-slate-950/40 p-3 text-slate-200 sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)] md:grid-cols-4" aria-label="Trending topics">
        <span className="inline-flex items-center gap-2 px-2 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-300"><span className="h-2 w-2 rounded-full bg-violet-400" /> In the conversation</span>
        {trendingTopics.map((topic, index) => (
          <button
            key={topic.label}
            onClick={() => {
              setSearch(topic.query);
              setActiveCategory("All");
              document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
            }}
            type="button"
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:border-violet-400/40 hover:text-violet-200"
          >
            <span className="font-mono text-[10px] text-slate-400">0{index + 1}</span>
            <span className="flex-1 text-left">{topic.label}</span>
            <ArrowIcon />
          </button>
        ))}
      </section>

      <section className="mx-auto mt-12 w-[min(1220px,calc(100%-96px))] sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)]" id="latest" aria-labelledby="latest-title">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-slate-400">THE GOOD STUFF, RIGHT NOW</span>
            <h2 id="latest-title" className="mt-3 text-[clamp(38px,4.4vw,55px)] font-semibold tracking-[-0.065em] text-white">Worth your <em className="font-serif text-violet-300 not-italic">time.</em></h2>
          </div>
          <div className="flex flex-wrap gap-5" aria-label="Filter stories">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={activeCategory === category ? "text-violet-300 underline decoration-violet-400 underline-offset-4" : "text-slate-400 transition-colors hover:text-violet-300"}
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
          <div className="blog-story-grid grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.title} story={story} index={index} onOpen={setSelectedStory} />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state grid min-h-[230px] place-items-center rounded-2xl border border-dashed border-violet-400/20 bg-slate-950/40 text-center text-slate-300">
            <div>
              <span aria-hidden="true" className="text-3xl text-violet-300">✳</span>
              <p className="mt-3 text-sm">No stories found for “{search}”. Try another search.</p>
              <button className="mt-3 text-sm text-violet-300 underline" onClick={() => { setSearch(""); setActiveCategory("All"); }} type="button">Clear filters</button>
            </div>
          </div>
        )}
      </section>

      <section className="relative mx-auto mt-16 grid min-h-[248px] w-[min(1220px,calc(100%-96px))] items-center gap-8 overflow-hidden rounded-[20px] bg-[linear-gradient(115deg,#211b32_0%,#32244d_63%,#493279_100%)] p-[42px_7%] shadow-[0_22px_50px_rgba(49,37,79,0.17)] text-white sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)] md:grid-cols-[1.1fr_0.9fr]" id="newsletter">
        <div className="absolute left-[42%] top-[-120px] h-[290px] w-[290px] rounded-full border border-violet-200/20 shadow-[0_0_0_23px_rgba(216,202,255,0.035),0_0_0_54px_rgba(216,202,255,0.025)]" style={{ transform: "rotateX(65deg) rotateZ(-25deg)" }} aria-hidden="true" />
        <div className="relative z-10">
          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-violet-200">A GOOD THING IN YOUR INBOX</span>
          <h2 className="mt-3 text-[clamp(34px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.05em] text-white">A little inspiration.<br /><em className="font-serif text-violet-200 not-italic">Right on time.</em></h2>
          <p className="mt-3 max-w-[365px] text-[11px] leading-7 text-slate-300">Our favorite reads and fresh perspectives, delivered with your morning coffee.</p>
        </div>
        <form className="blog-newsletter-form relative z-10" onSubmit={subscribe}>
          <label htmlFor="newsletter-email" className="mb-2 block text-[10px] text-slate-300">Your email address</label>
          <div className="flex h-[46px] rounded-lg border border-white/20 bg-white/5 p-1">
            <input
              autoComplete="email"
              id="newsletter-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              className="w-full border-0 bg-transparent px-2.5 text-[11px] text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button type="submit" aria-label="Subscribe to the newsletter" className="grid h-[38px] w-[38px] place-items-center rounded-md bg-violet-200 text-[#362653] transition-colors hover:bg-white">
              <ArrowIcon />
            </button>
          </div>
          <span aria-live="polite" className="mt-2 block min-h-[14px] text-[9px] text-slate-300">
            {subscribed ? "Thanks for your interest. Newsletter delivery isn't connected yet." : "No noise, just the good stuff. Unsubscribe anytime."}
          </span>
        </form>
      </section>

      <footer className="mx-auto mt-8 flex w-[min(1220px,calc(100%-96px))] min-h-[92px] items-center justify-between gap-5 font-mono text-[8px] uppercase tracking-[0.08em] text-slate-400 sm:w-[calc(100%-48px)] max-[640px]:w-[calc(100%-32px)]">
        <a className="inline-flex items-center gap-2 text-[15px] font-bold tracking-[-0.07em] text-white" href="/blog">
          <span className="flex h-[26px] w-[25px] items-center gap-1" aria-hidden="true">
            <i className="block h-[18px] w-[6px] -skew-y-[28deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600" />
            <i className="block h-[25px] w-[6px] skew-y-[28deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600" />
            <i className="block h-[14px] w-[6px] -skew-y-[28deg] rounded-[2px] bg-gradient-to-b from-violet-300 to-violet-600" />
          </span>
          <span>the daily<span className="text-violet-300">edit</span></span>
        </a>
        <span>STAY CURIOUS. KEEP YOUR OWN PERSPECTIVE.</span>
        <span>© 2026 THE DAILY EDIT</span>
      </footer>

      {selectedStory && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-slate-950/60 p-5 backdrop-blur-sm" onClick={() => setSelectedStory(null)}>
          <section
            aria-labelledby="story-dialog-title"
            aria-modal="true"
            className="blog-story-dialog relative grid w-[min(720px,100%)] overflow-hidden rounded-[18px] border border-violet-500/20 bg-slate-950 text-white shadow-[0_30px_90px_rgba(3,7,16,0.7)] md:grid-cols-[0.9fr_1.1fr]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close story preview"
              className="blog-dialog-close absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-slate-300/20 bg-white/10 text-xl text-white"
              onClick={() => setSelectedStory(null)}
              type="button"
            >
              ×
            </button>
            <div
              className="blog-dialog-image min-h-[190px] bg-cover bg-center md:min-h-[360px]"
              role="img"
              aria-label={selectedStory.imageAlt}
              style={{ backgroundImage: `url("${selectedStory.image}")` }}
            />
            <div className="flex flex-col justify-center p-6 md:p-8">
              <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-violet-300">{selectedStory.category} <span className="mx-1 text-slate-400">·</span> {selectedStory.time}</span>
              <h2 id="story-dialog-title" className="mt-3 text-[clamp(25px,4vw,37px)] font-semibold tracking-[-0.065em] leading-[1.06]">{selectedStory.title}</h2>
              <p className="mt-3 text-[12px] leading-7 text-slate-300">{selectedStory.excerpt}</p>
              <span className="mt-4 text-[10px] uppercase tracking-[0.08em] text-slate-400">Words by {selectedStory.author}</span>
              <div className="mt-7 border-t border-white/10 pt-4 text-[10px] leading-6 text-slate-400">You&apos;re all caught up. More good reads are on the way.</div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

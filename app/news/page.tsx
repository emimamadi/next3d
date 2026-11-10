import Link from "next/link";
import { featuredNews, newsItems } from "./news-data";

export const metadata = {
  title: "News — Future signals",
  description: "A 3D-inspired editorial news page with curated stories and a compact article archive.",
};

export default function NewsPage() {
  const stories = newsItems.slice(1);

  return (
    <main className="news-shell min-h-screen px-5 py-8 text-slate-100 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300/80">
              Signal / Newsroom
            </p>
            <h1 className="text-4xl font-black tracking-[-0.08em] text-white md:text-6xl">
              Future signals
            </h1>
          </div>

          <div className="rounded-full border border-cyan-400/30 bg-cyan-300/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100/80">
            Weekly brief · 24 stories
          </div>
        </header>

        <section className="mb-16 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="news-3d-hero relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 p-3 shadow-[0_30px_80px_rgba(8,12,26,0.72)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_26%)]" />
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-slate-950">
              <div
                className="relative h-[360px] bg-cover bg-center md:h-[430px]"
                style={{ backgroundImage: `url("${featuredNews.heroImage}")` }}
                aria-label={featuredNews.heroAlt}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="mb-4 inline-flex rounded-full border border-white/20 bg-slate-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-sm">
                    {featuredNews.category}
                  </div>
                  <h2 className="max-w-xl text-2xl font-bold tracking-[-0.06em] text-white md:text-4xl">
                    {featuredNews.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm text-slate-200/85 md:text-base">
                    {featuredNews.deck}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                    <span>{featuredNews.author}</span>
                    <span className="opacity-50">•</span>
                    <span>{featuredNews.publishedAt}</span>
                    <span className="opacity-50">•</span>
                    <span>{featuredNews.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="news-3d-card rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-[0_28px_60px_rgba(6,10,18,0.7)]">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200/80">
                Top note
              </p>
              <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-violet-200">
                Live
              </span>
            </div>

            <div className="space-y-5">
              {stories.slice(0, 3).map((story) => (
                <Link
                  key={story.slug}
                  href={`/news/${story.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-300/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/80">
                      {story.category}
                    </p>
                    <span className="text-[10px] text-slate-400">{story.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.05em] text-white transition-colors group-hover:text-cyan-200">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{story.deck}</p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-[-0.06em] text-white md:text-3xl">
              Latest coverage
            </h2>
            <Link href="/news/solar-skyline" className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200 transition-colors hover:text-cyan-100">
              Read the lead
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((story) => (
              <Link
                key={story.slug}
                href={`/news/${story.slug}`}
                className="news-3d-card group block overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70"
              >
                <div className="relative h-56 overflow-hidden border-b border-white/10">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${story.heroImage}")` }}
                    aria-label={story.heroAlt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-900/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-100 backdrop-blur-sm">
                    {story.category}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    <span>{story.publishedAt}</span>
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.06em] text-white transition-colors group-hover:text-cyan-200">
                    {story.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-300">{story.deck}</p>
                  <div className="pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">
                    Read story →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

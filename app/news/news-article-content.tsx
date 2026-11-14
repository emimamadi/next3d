"use client";

import Link from "next/link";
import { useNewsContent } from "./news-content";

export default function NewsArticleContent({ slug }: { slug: string }) {
  const { items, loaded } = useNewsContent();
  const article = items.find((item) => item.slug === slug);

  if (!loaded) {
    return <main className="news-shell min-h-screen px-5 py-8 text-slate-100">Loading story…</main>;
  }

  if (!article) {
    return (
      <main className="news-shell grid min-h-screen place-items-center px-5 py-8 text-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Story not found</h1>
          <Link href="/news" className="mt-4 inline-block text-cyan-200 hover:text-cyan-100">
            ← Back to news
          </Link>
        </div>
      </main>
    );
  }

  const related = items.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="news-shell min-h-screen px-5 py-8 text-slate-100 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-100"
          >
            ← Back to news
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200/70">
            {article.category}
          </div>
        </div>

        <article className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/70 shadow-[0_28px_90px_rgba(12,17,28,0.72)]">
          <div className="relative h-[320px] overflow-hidden md:h-[440px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${article.heroImage}")` }}
              aria-label={article.heroAlt}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.2)_0%,rgba(5,8,16,0.82)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-slate-900/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-sm">
                {article.category}
              </div>
              <h1 className="max-w-4xl text-3xl font-black tracking-[-0.08em] text-white md:text-5xl">
                {article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-200/85 md:text-[12px]">
                <span>{article.author}</span>
                <span className="opacity-50">•</span>
                <span>{article.publishedAt}</span>
                <span className="opacity-50">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-10 px-5 py-8 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-12">
            <div className="space-y-8">
              <p className="max-w-2xl text-lg leading-8 text-slate-200/90">{article.deck}</p>

              {article.content.map((section, index) => (
                <section key={`${section.heading}-${index}`} className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-[-0.06em] text-white">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${paragraphIndex}-${paragraph}`} className="text-base leading-8 text-slate-300">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <aside className="space-y-5 self-start rounded-[24px] border border-white/10 bg-slate-900/80 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200/80">
                More reading
              </p>

              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-300/40"
                >
                  <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/80">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-semibold tracking-[-0.05em] text-white transition-colors group-hover:text-cyan-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.deck}</p>
                </Link>
              ))}
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}

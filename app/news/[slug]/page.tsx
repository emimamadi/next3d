import type { Metadata } from "next";
import { newsItems } from "../news-data";
import NewsArticleContent from "../news-article-content";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);

  return article
    ? {
        title: `${article.title} | Future signals`,
        description: article.deck,
      }
    : {
        title: "News story | Future signals",
        description: "Read the latest story from Future signals.",
      };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticleContent slug={slug} />;
}

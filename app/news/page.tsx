import type { Metadata } from "next";
import NewsListing from "./news-listing";

export const metadata: Metadata = {
  title: "News — Future signals",
  description: "A 3D-inspired editorial news page with curated stories and a compact article archive.",
};

export default function NewsPage() {
  return <NewsListing />;
}

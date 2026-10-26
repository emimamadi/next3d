import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Daily Edit — Blog",
  description:
    "A fresh perspective on culture, technology, style, travel, and the stories shaping your day.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORME — Ideas in another dimension",
  description:
    "An independent creative studio building vivid identities and digital worlds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="m-0 bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}

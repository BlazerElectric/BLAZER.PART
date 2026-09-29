import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blazer Part Finder Chat",
  description: "Embeddable AI chat widget for finding Blazer Electric parts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

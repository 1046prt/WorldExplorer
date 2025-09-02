import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - WorldExplorer",
  description:
    "Learn about WorldExplorer, our mission to make geography and cultural education accessible worldwide. Meet our contributors and discover our technology stack.",
  keywords: [
    "about worldexplorer",
    "geography education",
    "cultural learning",
    "interactive maps",
    "country information",
  ],
  openGraph: {
    title: "About WorldExplorer",
    description:
      "A comprehensive educational platform for exploring countries, cultures, and landmarks worldwide.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

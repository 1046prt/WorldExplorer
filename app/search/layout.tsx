import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Search Countries, Cities & Landmarks - WorldExplorer",
    description:
      "Search and discover countries, cities, landmarks, and educational content worldwide. Find specific information about geography, culture, history, and travel destinations.",
    keywords:
      "search countries, search cities, search landmarks, world search, geography search, travel search, country finder, educational search",
    canonical: "https://theworldexplorer.vercel.app/search",
  }),
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

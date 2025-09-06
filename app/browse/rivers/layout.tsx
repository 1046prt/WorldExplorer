import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Rivers - WorldExplorer",
    description:
      "Explore major rivers and waterways around the world. Discover the geography, ecology, and cultural significance of Earth's most important rivers and their impact on civilizations.",
    keywords:
      "browse rivers, world rivers, major rivers, waterways, river systems, geography, ecology, river explorer, freshwater, world geography",
    canonical: "https://theworldexplorer.vercel.app/browse/rivers",
  }),
};

export default function RiversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

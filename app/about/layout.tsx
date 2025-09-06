import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "About WorldExplorer - Our Mission & Team",
    description:
      "Learn about WorldExplorer, our mission to make world exploration accessible through interactive educational tools. Meet our team and discover our story behind creating this comprehensive geography platform.",
    keywords:
      "about worldexplorer, mission, team, educational platform, world exploration, interactive learning, geography education, about us, our story",
    canonical: "https://theworldexplorer.vercel.app/about",
  }),
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

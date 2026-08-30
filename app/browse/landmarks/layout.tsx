import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Landmarks - WorldExplorer",
    description:
      "Discover famous landmarks and monuments from around the world. Explore historical sites, architectural wonders, and cultural treasures with detailed information and stunning visuals.",
    keywords:
      "browse landmarks, world landmarks, famous monuments, historical sites, architectural wonders, cultural treasures, tourist attractions, world heritage sites",
    canonical: `${SITE_URL}/browse/landmarks`,
  }),
};

export default function LandmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

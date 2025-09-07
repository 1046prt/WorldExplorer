import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Landmarks - WorldExplorer",
    description:
      "Discover famous landmarks and monuments from around the world. Explore historical sites, architectural wonders, and cultural treasures with detailed information and stunning visuals.",
    keywords:
      "browse landmarks, world landmarks, famous monuments, historical sites, architectural wonders, cultural treasures, tourist attractions, world heritage sites",
    canonical: "https://theworldexplorer.vercel.app/browse/landmarks",
  }),
};

export default function LandmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

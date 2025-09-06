import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Countries - WorldExplorer",
    description:
      "Browse and explore countries from around the world. Discover detailed information about capitals, populations, regions, landmarks, and cultures of 195 countries worldwide.",
    keywords:
      "browse countries, world countries, country list, country information, capitals, populations, regions, geography, travel destinations, country explorer",
    canonical: "https://theworldexplorer.vercel.app/browse/countries",
  }),
};

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Cities - WorldExplorer",
    description:
      "Explore major cities around the world. Discover urban centers, cultural hubs, and metropolitan areas with detailed information about demographics, attractions, and significance.",
    keywords:
      "browse cities, world cities, major cities, urban centers, metropolitan areas, city information, city explorer, global cities",
    canonical: `${SITE_URL}/browse/cities`,
  }),
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

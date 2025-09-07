import { Metadata } from "next";
import { generateSEOMetadata } from "@/components/seo/seo-config";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Browse Universities - WorldExplorer",
    description:
      "Explore prestigious universities and educational institutions worldwide. Discover top academic institutions, their histories, achievements, and contributions to global education and research.",
    keywords:
      "browse universities, world universities, educational institutions, higher education, academic institutions, colleges, global education, university explorer",
    canonical: "https://theworldexplorer.vercel.app/browse/universities",
  }),
};

export default function UniversitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

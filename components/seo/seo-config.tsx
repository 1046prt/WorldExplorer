import { Metadata } from "next";
import { Country } from "@/lib/types";

interface SEOConfigOptions {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

const baseUrl = "https://theworldexplorer.vercel.app";
const defaultImage = `${baseUrl}/images/logo/WORLD.svg`;

export function generateSEOMetadata({
  title,
  description,
  keywords = "world explorer, countries, geography, education, travel, culture, landmarks, cities, history, interactive learning, global knowledge, educational platform, prakash raj,1046prt,prakash raj info,nextjs,framework,seo,front end template, template,open source",
  image = defaultImage,
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "WorldExplorer Team",
  section,
  tags = [],
  noindex = false,
}: SEOConfigOptions): Metadata {
  const fullTitle = title.includes("WorldExplorer")
    ? title
    : `${title} | WorldExplorer`;
  const fullUrl = canonical || baseUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: "WorldExplorer",
    robots: {
      index: !noindex,
      follow: !noindex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: "WorldExplorer",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - WorldExplorer`,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@WorldExplorer",
      site: "@WorldExplorer",
      images: [
        {
          url: image,
          alt: `${title} - WorldExplorer`,
        },
      ],
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      "theme-color": "#3B82F6",
      "msapplication-navbutton-color": "#3B82F6",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "geo.region": "GLOBAL",
      "geo.placename": "Worldwide",
    },
  };

  return metadata;
}

// Common structured data generators
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WorldExplorer",
    description:
      "Discover the world's knowledge - Interactive platform for exploring countries, cultures, landmarks, and educational content",
    url: baseUrl,
    logo: `${baseUrl}/images/logo/WORLD.svg`,
    sameAs: ["https://github.com/1046prt/WorldExplorer"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WorldExplorer",
    description:
      "Educational platform for world exploration and cultural learning",
    url: baseUrl,
    logo: `${baseUrl}/images/logo/WORLD.svg`,
    founder: {
      "@type": "Person",
      name: "Prakash Raj",
      email: "1046prt@gmail.com",
    },
    sameAs: ["https://github.com/1046prt/WorldExplorer"],
  };
}

export function generateCountryStructuredData(country: Country) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: country.name,
    description: `Explore ${country.name}: Learn about its capital ${country.capital}, population, culture, landmarks, and history`,
    url: `${baseUrl}/country/${country.iso2?.toLowerCase()}`,
    containedInPlace: {
      "@type": "Place",
      name: "Earth",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Capital",
        value: country.capital,
      },
      {
        "@type": "PropertyValue",
        name: "Population",
        value: country.population?.toLocaleString(),
      },
      {
        "@type": "PropertyValue",
        name: "Area",
        value: country.geography?.area
          ? `${country.geography?.area.toLocaleString()} km²`
          : undefined,
      },
    ].filter(Boolean),
  };
}

export function generateEducationalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "WorldExplorer",
    description:
      "Interactive educational platform for learning about world geography, cultures, and countries",
    url: baseUrl,
    educationalLevel: "All Levels",
    teaches: [
      "Geography",
      "Cultural Studies",
      "World History",
      "International Relations",
      "Travel Education",
    ],
  };
}
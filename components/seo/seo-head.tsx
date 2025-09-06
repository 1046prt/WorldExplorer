"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOHeadProps {
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
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords = "world explorer, countries, geography, education, travel, culture, landmarks, cities, history",
  image = "https://theworldexplorer.vercel.app/images/logo/WORLD.svg",
  canonical,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "WorldExplorer Team",
  section,
  tags = [],
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  const pathname = usePathname();
  const baseUrl = "https://theworldexplorer.vercel.app";
  const fullUrl = canonical || `${baseUrl}${pathname}`;
  const fullTitle = title.includes("WorldExplorer")
    ? title
    : `${title} | WorldExplorer`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${title} - WorldExplorer`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="WorldExplorer" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific Open Graph */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - WorldExplorer`} />
      <meta name="twitter:site" content="@WorldExplorer" />
      <meta name="twitter:creator" content="@WorldExplorer" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-navbutton-color" content="#3B82F6" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Language and Geographic */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="GLOBAL" />
      <meta name="geo.placename" content="Worldwide" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}

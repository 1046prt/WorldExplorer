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
    title: {
      default: fullTitle,
      template: "%s | WorldExplorer",
    },
    description,
    keywords,
    authors: [{ name: author, url: "https://github.com/1046prt" }],
    creator: author,
    publisher: "WorldExplorer",
    applicationName: "WorldExplorer",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    category: "Education",
    classification: "Educational Platform",
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        noimageindex: noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
      alternateLocale: ["en_GB", "en_CA", "en_AU"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - WorldExplorer`,
          type: "image/png",
        },
        {
          url: `${baseUrl}/images/logo/WORLD.svg`,
          width: 800,
          height: 600,
          alt: "WorldExplorer Logo",
          type: "image/svg+xml",
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        expirationTime: undefined,
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
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: fullUrl,
      media: {
        "only screen and (max-width: 600px)": `${fullUrl}?mobile=true`,
      },
      types: {
        "application/rss+xml": [
          {
            url: "feed.xml",
            title: "WorldExplorer RSS Feed",
          },
        ],
      },
    },
    archives: [`${baseUrl}/sitemap.xml`],
    assets: [`${baseUrl}/images`, `${baseUrl}/data`],
    bookmarks: [fullUrl],
    other: {
      "theme-color": "#3B82F6",
      "msapplication-navbutton-color": "#3B82F6",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-capable": "yes",
      "mobile-web-app-capable": "yes",
      "geo.region": "GLOBAL",
      "geo.placename": "Worldwide",
      "geo.position": "0;0",
      ICBM: "0, 0",
      language: "English",
      target: "all",
      audience: "all",
      coverage: "Worldwide",
      distribution: "Global",
      rating: "General",
      HandheldFriendly: "True",
      MobileOptimized: "320",
      "apple-touch-fullscreen": "yes",
    },
  };

  return metadata;
}

// Common structured data generators
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "WorldExplorer",
    alternateName: "World Explorer",
    description:
      "Discover the world's knowledge - Interactive platform for exploring countries, cultures, landmarks, and educational content",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logo/WORLD.svg`,
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logo/WORLD.svg`,
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://github.com/1046prt/WorldExplorer",
      "https://theworldexplorer.vercel.app",
    ],
    publisher: {
      "@type": "Organization",
      name: "WorldExplorer",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/WORLD.svg`,
      },
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: [`${baseUrl}/browse/countries`, `${baseUrl}/browse/landmarks`],
      },
    ],
    mainEntity: {
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Organization",
      name: "WorldExplorer",
    },
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${baseUrl}/#organization`,
    name: "WorldExplorer",
    alternateName: "World Explorer",
    description:
      "Educational platform for world exploration and cultural learning",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logo/WORLD.svg`,
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logo/WORLD.svg`,
      width: 1200,
      height: 630,
    },
    founder: {
      "@type": "Person",
      name: "Prakash Raj",
      email: "1046prt@gmail.com",
      url: "https://github.com/1046prt",
      jobTitle: "Developer & Creator",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Educational Institution",
      },
    },
    sameAs: [
      "https://github.com/1046prt/WorldExplorer",
      "https://theworldexplorer.vercel.app",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "1046prt@gmail.com",
      contactType: "customer service",
      availableLanguage: "English",
    },
    foundingDate: "2024",
    numberOfEmployees: "1-10",
    knowsAbout: [
      "Geography",
      "Education",
      "World Cultures",
      "Travel",
      "History",
      "Interactive Learning",
    ],
    educationalCredentialAwarded: "General Education",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Educational Resources",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Country Information",
            description: "Comprehensive country data and statistics",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interactive Learning Tools",
            description: "Engaging educational tools for world exploration",
          },
        },
      ],
    },
  };
}

export function generateCountryStructuredData(country: Country) {
  return {
    "@context": "https://schema.org",
    "@type": ["Place", "Country"],
    "@id": `${baseUrl}/country/${country.iso2?.toLowerCase()}#country`,
    name: country.name,
    alternateName: country.nativeName || country.name,
    description: `Explore ${country.name}: Learn about its capital ${country.capital}, population, culture, landmarks, and history. Comprehensive guide with interactive maps and detailed information.`,
    url: `${baseUrl}/country/${country.iso2?.toLowerCase()}`,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "ISO2",
        value: country.iso2,
      },
      {
        "@type": "PropertyValue",
        name: "ISO3",
        value: country.iso3,
      },
    ],
    containedInPlace: {
      "@type": "Place",
      name: "Earth",
    },
    containsPlace:
      country.famousCities?.slice(0, 5).map((city) => ({
        "@type": "City",
        name: city.name,
        description: city.description,
      })) || [],
    geo: {
      "@type": "GeoCoordinates",
      latitude: country.coordinates?.lat,
      longitude: country.coordinates?.lng,
    },
    image: country.flag
      ? {
          "@type": "ImageObject",
          url: `${baseUrl}${country.flag}`,
          caption: `${country.name} Flag`,
          width: 320,
          height: 240,
        }
      : undefined,
    hasMap: `${baseUrl}/country/${country.iso2?.toLowerCase()}#map`,
    touristAttraction:
      country.landmarks?.slice(0, 10).map((landmark) => ({
        "@type": "TouristAttraction",
        name: landmark.name,
        description: landmark.description,
        image: landmark.image
          ? {
              "@type": "ImageObject",
              url: landmark.image,
              caption: landmark.name,
            }
          : undefined,
      })) || [],
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
      {
        "@type": "PropertyValue",
        name: "Currency",
        value: country.currency,
      },
      {
        "@type": "PropertyValue",
        name: "Language",
        value: country.languages?.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Region",
        value: country.region,
      },
      {
        "@type": "PropertyValue",
        name: "Subregion",
        value: country.subregion,
      },
    ].filter(Boolean),
    governmentType: country.government?.type,
    currency: country.currency,
    timeZone: country.timezone,
    knowsLanguage: country.languages?.map((lang) => ({
      "@type": "Language",
      name: lang,
    })),
    mainEntity: {
      "@type": "WebPage",
      "@id": `${baseUrl}/country/${country.iso2?.toLowerCase()}#webpage`,
    },
  };
}

export function generateEducationalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "WebSite"],
    "@id": `${baseUrl}/#educational`,
    name: "WorldExplorer",
    alternateName: "World Explorer Educational Platform",
    description:
      "Interactive educational platform for learning about world geography, cultures, and countries. Free comprehensive educational resources for students and educators.",
    url: baseUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": baseUrl,
    },
    educationalLevel: [
      "Elementary",
      "Middle School",
      "High School",
      "University",
      "Adult Education",
    ],
    educationalUse: ["Learning", "Research", "Teaching", "Reference"],
    teaches: [
      "Geography",
      "Cultural Studies",
      "World History",
      "International Relations",
      "Travel Education",
      "Environmental Science",
      "Political Science",
      "Economics",
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: ["student", "teacher", "parent", "researcher"],
    },
    learningResourceType: [
      "Interactive Map",
      "Country Profile",
      "Educational Game",
      "Reference Material",
      "Multimedia Content",
    ],
    educationalAlignment: [
      {
        "@type": "AlignmentObject",
        alignmentType: "teaches",
        educationalFramework: "Geography Standards",
        targetName: "World Geography",
      },
      {
        "@type": "AlignmentObject",
        alignmentType: "teaches",
        educationalFramework: "Social Studies Standards",
        targetName: "Cultural Awareness",
      },
    ],
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    inLanguage: "en-US",
    provider: {
      "@type": "Organization",
      name: "WorldExplorer",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "WorldExplorer",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/WORLD.svg`,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Educational Resources",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "World Geography Explorer",
            description:
              "Interactive exploration of world countries and cultures",
            provider: {
              "@type": "Organization",
              name: "WorldExplorer",
            },
          },
          price: "0",
          priceCurrency: "USD",
        },
      ],
    },
  };
}

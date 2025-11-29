import { Country } from "@/lib/types";

const baseUrl = "https://theworldexplorer.vercel.app";

// FAQ Schema for common questions
export function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is WorldExplorer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WorldExplorer is an interactive educational platform that helps you discover countries, cultures, landmarks, and global knowledge through engaging tools and comprehensive data.",
        },
      },
      {
        "@type": "Question",
        name: "How many countries are featured on WorldExplorer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WorldExplorer features comprehensive information about 195 countries worldwide, including their capitals, populations, landmarks, cultures, and histories.",
        },
      },
      {
        "@type": "Question",
        name: "Is WorldExplorer free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, WorldExplorer is completely free to use. We believe in making world education accessible to everyone.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of educational content does WorldExplorer provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WorldExplorer provides interactive maps, country profiles, cultural information, historical data, landmarks, cities, universities, rivers, and educational tools like quizzes and currency converters.",
        },
      },
    ],
  };
}

// Article Schema for country pages
export function generateArticleStructuredData(country: Country) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${country.name} - Complete Guide & Information`,
    description: `Comprehensive guide to ${country.name} including capital ${country.capital}, population, landmarks, culture, and history.`,
    image: country.flag
      ? `${baseUrl}${country.flag}`
      : `${baseUrl}/images/logo/WORLD.svg`,
    author: {
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
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/country/${country.iso2?.toLowerCase()}`,
    },
    about: {
      "@type": "Country",
      name: country.name,
    },
    articleSection: "Geography",
    wordCount: 1000,
    keywords: [
      country.name,
      country.capital,
      "geography",
      "travel",
      "culture",
      "education",
    ],
    inLanguage: "en-US",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  };
}

// Software Application Schema
export function generateSoftwareApplicationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WorldExplorer",
    alternateName: "World Explorer",
    description:
      "Interactive educational platform for exploring countries, cultures, landmarks, and global knowledge.",
    url: baseUrl,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Modern Web Browser with JavaScript",
    softwareVersion: "1.1.0",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Prakash Raj",
      email: "1046prt@gmail.com",
    },
    publisher: {
      "@type": "Organization",
      name: "WorldExplorer",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Interactive Country Explorer",
      "Comprehensive Country Data",
      "Educational Quizzes",
      "Currency Converter",
      "Interactive Maps",
      "Landmark Information",
      "Cultural Insights",
      "Historical Timeline",
    ],
    screenshot: `${baseUrl}/images/screenshot.png`,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  };
}

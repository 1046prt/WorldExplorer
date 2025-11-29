import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  generateSEOMetadata,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/components/seo/seo-config";

const websiteStructuredData = generateWebsiteStructuredData();
const organizationStructuredData = generateOrganizationStructuredData();

const combinedStructuredData = {
  "@context": "https://schema.org",
  "@graph": [websiteStructuredData, organizationStructuredData],
};

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "WorldExplorer - Discover the World's Knowledge",
    description:
      "Interactive educational platform for exploring countries, cultures, landmarks, and global knowledge. Learn about geography, history, and cultures worldwide through engaging tools and comprehensive data.",
    keywords:
      "world explorer, countries, geography, education, travel, culture, landmarks, cities, history, interactive learning, global knowledge, educational platform",
    canonical: "https://theworldexplorer.vercel.app",
  }),
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://theworldexplorer.vercel.app"),
  alternates: {
    canonical: "https://theworldexplorer.vercel.app",
    languages: {
      "en-US": "/en-US",
      "x-default": "/",
    },
  },
  category: "education",
  classification: "Educational Platform",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  applicationName: "WorldExplorer",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/images/logo/WORLD.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WorldExplorer",
    startupImage: [
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  verification: {
    google: "your-google-verification-code",
  },
  bookmarks: ["https://theworldexplorer.vercel.app"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedStructuredData),
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="WorldExplorer" />
        <meta name="apple-mobile-web-app-title" content="WorldExplorer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Performance Hints */}
        <link
          rel="preload"
          href="/images/logo/WORLD.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

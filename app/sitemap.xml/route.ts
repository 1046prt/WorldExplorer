import { getAllCountries } from "@/lib/data-utils";

const baseUrl = "https://theworldexplorer.vercel.app";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  try {
    const countries = await getAllCountries();

    const staticPages = [
      {
        url: "",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/about",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/browse/countries",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/browse/cities",
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/browse/landmarks",
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/browse/rivers",
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/browse/universities",
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        url: "/search",
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

    // Add static pages
    staticPages.forEach((page) => {
      sitemap += `
  <url>
    <loc>${escapeXml(baseUrl + page.url)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add country pages
    countries.forEach((countryCode: string) => {
      sitemap += `
  <url>
    <loc>${escapeXml(baseUrl + "/country/" + countryCode)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<error>Sitemap generation failed</error>`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
        },
      }
    );
  }
}

import { SITE_URLS } from "@/lib/site";

const sitemapFiles = ["/sitemap-static.xml", "/sitemap-countries.xml"];

export async function GET() {
  const entries = SITE_URLS.flatMap((baseUrl) =>
    sitemapFiles.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
    }))
  );

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((sitemap) => {
    return `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>
  </sitemap>`;
  })
  .join("\n")}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}

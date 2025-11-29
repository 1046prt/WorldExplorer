const baseUrl = "https://theworldexplorer.vercel.app";

export async function GET() {
  const sitemaps = [
    {
      url: "/sitemap-static.xml",
      lastModified: new Date(),
    },
    {
      url: "/sitemap-countries.xml",
      lastModified: new Date(),
    },
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map((sitemap) => {
    return `  <sitemap>
    <loc>${baseUrl}${sitemap.url}</loc>
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

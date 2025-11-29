import { getAllCountries, getCountryData } from "@/lib/data-utils";
import type { Country } from "@/lib/types";

const baseUrl = "https://theworldexplorer.vercel.app";

export async function GET() {
  try {
    const countryList = await getAllCountries();
    const countriesData = await Promise.all(
      countryList.slice(0, 50).map(async (countryCode: string) => {
        try {
          const country = await getCountryData(countryCode);
          return country;
        } catch {
          return null;
        }
      })
    );

    const validCountries = countriesData.filter(Boolean);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${validCountries
  .map((country: Country | null) => {
    if (!country) return "";

    const imageTag = country.flag
      ? `    <image:image>
      <image:loc>${baseUrl}${country.flag}</image:loc>
      <image:caption>${country.name} Flag</image:caption>
    </image:image>`
      : "";

    return `  <url>
    <loc>${baseUrl}/country/${country.iso2?.toLowerCase()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${imageTag}
  </url>`;
  })
  .filter(Boolean)
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Error generating countries sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}

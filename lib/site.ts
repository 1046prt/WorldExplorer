// Central site configuration.
// The canonical site URL is controlled via NEXT_PUBLIC_APP_URL so the app runs
// on both the primary domain and any additional hosts (e.g. Vercel previews).

const DEFAULT_SITE_URL = "https://worldexplorer.prakashraj.me";
const LEGACY_SITE_URL = "https://theworldexplorer.vercel.app";

const normalize = (url: string) => url.replace(/\/+$/, "");

// Primary domain, controlled via NEXT_PUBLIC_APP_URL so the app runs anywhere.
export const SITE_URL = normalize(
  process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL
);

// All live hosts. Sitemaps, robots.txt and structured data list every host;
// each page still uses a single canonical (HTML allows only one).
export const SITE_URLS = [SITE_URL, LEGACY_SITE_URL];

export function siteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
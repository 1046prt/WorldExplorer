import { notFound } from "next/navigation";
import { getCountryData, getAllCountries } from "@/lib/data-utils";
import { GlobalNavigation } from "@/components/global-navigation";
import { CountryHeader } from "@/components/country-header";
import { CountryOverview } from "@/components/country-overview";
import { CountryHistory } from "@/components/country-history";
import { CountryLandmarks } from "@/components/country-landmarks";
import { CountryCities } from "@/components/country-cities";
import { CountryRivers } from "@/components/country-rivers";
import { CountryInstitutions } from "@/components/country-institutions";
import { CountryMap } from "@/components/country-map";
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb";
import { ComprehensiveCountryData } from "@/components/comprehensive-country-data";
import "../../globals.css";
import Footer from "@/components/footer";
import {
  generateSEOMetadata,
  generateCountryStructuredData,
} from "@/components/seo/seo-config";

interface CountryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = await getCountryData(slug);

  if (!country) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Countries", href: "/browse/countries" },
    { label: country.name },
  ];

  // Generate structured data for the country
  const countryStructuredData = generateCountryStructuredData(country);

  return (
    <>
      {/* Country Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(countryStructuredData),
        }}
      />

      <div className="page-wrapper page-background country-page-container">
        <GlobalNavigation
          showBackButton={true}
          backHref="/browse/countries"
          currentPage={country.name}
        />
        <CountryHeader country={country} />

        <div className="page-content">
          <main className="main">
            <NavigationBreadcrumb items={breadcrumbItems} />

            <div className="sections-container">
              <section className="section country-component">
                <CountryOverview country={country} />
              </section>

              <section className="section country-component">
                <ComprehensiveCountryData countryData={country} />
              </section>

              <section className="section country-component">
                <div className="country-card">
                  <CountryMap country={country} />
                </div>
              </section>

              <section className="section country-component">
                <CountryHistory country={country} />
              </section>

              <section className="section country-component">
                <CountryLandmarks country={country} />
              </section>

              <section className="section country-component">
                <div className="country-card">
                  <CountryCities country={country} />
                </div>
              </section>

              <section className="section country-component">
                <CountryRivers country={country} />
              </section>

              <section className="section country-component">
                <CountryInstitutions country={country} />
              </section>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const countries = await getAllCountries();

  return countries.map((countryCode: string) => ({
    slug: countryCode,
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = await getCountryData(slug);

  if (!country) {
    return {
      title: "Country Not Found | WorldExplorer",
      description:
        "The requested country could not be found. Explore other countries on WorldExplorer.",
    };
  }

  const landmarks =
    country.landmarks
      ?.slice(0, 3)
      .map((l) => l.name)
      .join(", ") || "various landmarks";
  const cities =
    country.famousCities
      ?.slice(0, 3)
      .map((c) => c.name)
      .join(", ") || "major cities";

  return generateSEOMetadata({
    title: `${country.name} - Complete Guide & Information`,
    description: `Discover ${country.name}: Learn about its capital ${
      country.capital
    }, population of ${country.population?.toLocaleString()}, famous landmarks including ${landmarks}, major cities like ${cities}, rich history, culture, and geography. Comprehensive country guide with interactive maps and detailed information.`,
    keywords: `${country.name}, ${country.capital}, ${country.name} tourism, ${country.name} travel, ${country.name} landmarks, ${country.name} cities, ${country.name} history, ${country.name} culture, ${country.name} geography, country information, travel guide`,
    canonical: `https://theworldexplorer.vercel.app/country/${slug}`,
    image: country.flag
      ? `https://theworldexplorer.vercel.app${country.flag}`
      : undefined,
    type: "article",
    section: "Geography",
    tags: [country.name, country.capital, "geography", "travel", "culture"],
    modifiedTime: new Date().toISOString(),
  });
}

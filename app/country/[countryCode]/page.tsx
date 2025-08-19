import { notFound } from "next/navigation";
import { getCountryData } from "@/lib/data-utils";
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
import "/styles/globals.css"
import Footer from "@/components/footer";

interface CountryPageProps {
  params: Promise<{
    countryCode: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { countryCode } = await params;
  const country = await getCountryData(countryCode);

  if (!country) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Countries", href: "/browse/countries" },
    { label: country.name },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <CountryHeader country={country} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <NavigationBreadcrumb items={breadcrumbItems} />

        <CountryOverview country={country} />

        <ComprehensiveCountryData countryData={country} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CountryMap country={country} />
          <CountryHistory country={country} />
        </div>

        <CountryLandmarks country={country} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CountryCities country={country} />
          <CountryRivers country={country} />
        </div>

        <CountryInstitutions country={country} />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { countryCode } = await params;
  const country = await getCountryData(countryCode);

  if (!country) {
    return {
      title: "Country Not Found",
    };
  }

  return {
    title: `${country.name} - WorldExplorer`,
    description: `Discover ${country.name}: capital ${
      country.capital
    }, population ${country.population.toLocaleString()}, famous landmarks, history, and more.`,
  };
}

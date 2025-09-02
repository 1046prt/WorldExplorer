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
import "/app/globals.css";
import Footer from "@/components/footer";

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

  return (
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

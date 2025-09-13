"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Users, MapPin } from "lucide-react";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import { useDebounce } from "@/hooks/useDebounce";
import "@/styles/countries-page.css";
import "@/styles/search-bar.css";

interface Country {
  iso2: string;
  iso3: string;
  name: string;
  capital: string;
  population: number;
  region: string;
}

function getCountryFlagEmoji(countryCode: string): string {
  const countryFlagEmojiMap: Record<string, string> = {
    US: "🇺🇸",
    CN: "🇨🇳",
    BR: "🇧🇷",
    JP: "🇯🇵",
    GB: "🇬🇧",
    FR: "🇫🇷",
    CA: "🇨🇦",
    DE: "🇩🇪",
    IT: "🇮🇹",
    IN: "🇮🇳",
    AU: "🇦🇺",
    RU: "🇷🇺",
    MX: "🇲🇽",
    ES: "🇪🇸",
    AR: "🇦🇷",
  };
  return countryFlagEmojiMap[countryCode.toUpperCase()] || "🏳️";
}

function formatPopulation(population: number): string {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`;
  } else if (population >= 1000000) {
    return `${(population / 1000000).toFixed(0)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(0)}K`;
  }
  return population.toString();
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/data/browse/countries.json");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load countries data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchCountries();
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const regions = [
    "All",
    "Asia",
    "Europe",
    "Europe/Asia",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      country.capital.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="countries"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Globe className="page-title-icon" />
                    Countries of the World
                  </h1>
                  <p className="page-description">
                    Explore detailed information about countries around the
                    globe
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="loading-state">
                  <p>Loading countries data...</p>
                </div>
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="countries"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Globe className="page-title-icon" />
                    Countries of the World
                  </h1>
                  <p className="page-description">
                    Explore detailed information about countries around the
                    globe
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="error-state">
                  <p>{error}</p>
                </div>
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper page-background">
      <GlobalNavigation
        showBackButton={true}
        backHref="/"
        currentPage="countries"
      />
      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <section className="section">
              <div className="page-header">
                <h1 className="page-title">
                  <Globe className="page-title-icon" />
                  Countries of the World
                </h1>
                <p className="page-description">
                  Explore detailed information about countries around the globe
                </p>
              </div>
            </section>

            <BrowseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search countries or capitals..."
              filterValue={selectedRegion}
              onFilterChange={setSelectedRegion}
              filterOptions={regions}
              filterLabel="Filter by region"
            />

            <section className="section">
              <div className="countries-grid">
                {filteredCountries.map((country) => (
                  <Link
                    key={country.iso2}
                    href={`/country/${country.iso2.toLowerCase()}`}
                    className="country-card"
                  >
                    <div className="country-card-header">
                      <div className="country-flag-section">
                        <span className="country-flag-emoji">
                          {getCountryFlagEmoji(country.iso2)}
                        </span>
                        {/*}
                      <OptimizedImage
                        src={`/images/flags/${country.iso2.toLowerCase()}.png`}
                        alt={`${country.name} national flag`}
                        width={32}
                        height={24}
                        className="country-flag-image"
                        fallbackSrc={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 24'%3E%3Crect width='32' height='24' fill='%23f3f4f6'/%3E%3Ctext x='16' y='16' text-anchor='middle' font-size='16'%3E${getCountryFlagEmoji(
                          country.iso2
                        )}%3C/text%3E%3C/svg%3E`}
                      />
                      */}
                      </div>
                      <span className="country-code">{country.iso2}</span>
                    </div>
                    <h3 className="country-name">{country.name}</h3>
                    <div className="country-details">
                      <div className="country-detail-item">
                        <MapPin className="country-detail-icon" />
                        <span className="country-detail-text">
                          {country.capital}
                        </span>
                      </div>
                      <div className="country-detail-item">
                        <Users className="country-detail-icon" />
                        <span className="country-detail-text">
                          {formatPopulation(country.population)}
                        </span>
                      </div>
                      <div className="country-region">{country.region}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {filteredCountries.length === 0 && (
              <section className="section">
                <div className="empty-state">
                  <Globe className="empty-state-icon" />
                  <h3 className="empty-state-title">No countries found</h3>
                  <p className="empty-state-description">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

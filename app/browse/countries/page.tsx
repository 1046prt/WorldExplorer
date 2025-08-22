"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Globe, Users, MapPin } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { GlobalNavigation } from "@/components/global-navigation";
import Footer from "@/components/footer";
import "@/styles/countries-page.css";

interface Country {
  iso2: string;
  iso3: string;
  name: string;
  capital: string;
  population: number;
  region: string;
}

// Available countries with data files - only include countries we actually have data for
const availableCountries: Country[] = [
  {
    iso2: "US",
    iso3: "USA",
    name: "United States",
    capital: "Washington, D.C.",
    population: 331900000,
    region: "North America",
  },
  {
    iso2: "FR",
    iso3: "FRA",
    name: "France",
    capital: "Paris",
    population: 67700000,
    region: "Europe",
  },
  {
    iso2: "CN",
    iso3: "CHN",
    name: "China",
    capital: "Beijing",
    population: 1412000000,
    region: "Asia",
  },
  {
    iso2: "GB",
    iso3: "GBR",
    name: "United Kingdom",
    capital: "London",
    population: 67330000,
    region: "Europe",
  },
  {
    iso2: "JP",
    iso3: "JPN",
    name: "Japan",
    capital: "Tokyo",
    population: 125800000,
    region: "Asia",
  },
  {
    iso2: "BR",
    iso3: "BRA",
    name: "Brazil",
    capital: "Brasília",
    population: 215300000,
    region: "South America",
  },
];

function getCountryFlagEmoji(countryCode: string): string {
  const countryFlagEmojiMap: Record<string, string> = {
    US: "🇺🇸",
    CN: "🇨🇳",
    BR: "🇧🇷",
    JP: "🇯🇵",
    GB: "🇬🇧",
    FR: "🇫🇷",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = [
    "All",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredCountries = availableCountries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

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

            <section className="section">
              <div className="countries-filters">
                <div className="filter-input-wrapper">
                  <Search className="filter-input-icon" />
                  <input
                    type="text"
                    placeholder="Search countries or capitals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input filter-input"
                  />
                </div>
                <div className="filter-select-wrapper">
                  <Filter className="filter-select-icon" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="input filter-select"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

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

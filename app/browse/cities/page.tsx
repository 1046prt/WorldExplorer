"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import "@/styles/cities-page.css";
import { Building2, Users, Globe } from "lucide-react";

interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  population: string;
  region: string;
  description: string;
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/data/browse/cities.json");
        if (!response.ok) {
          throw new Error("Failed to fetch cities data");
        }
        const data = await response.json();
        setCities(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cities data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchCities();
  }, []);

  const regions = [
    "All",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="cities"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Building2 className="page-title-icon" />
                    Major Cities of the World
                  </h1>
                  <p className="page-description">
                    Discover the world&apos;s most populous and influential
                    cities
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="loading-state">
                  <p>Loading cities data...</p>
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
          currentPage="cities"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Building2 className="page-title-icon" />
                    Major Cities of the World
                  </h1>
                  <p className="page-description">
                    Discover the world&apos;s most populous and influential
                    cities
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
        currentPage="cities"
      />
      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <section className="section">
              <div className="page-header">
                <h1 className="page-title">
                  <Building2 className="page-title-icon" />
                  Major Cities of the World
                </h1>
                <p className="page-description">
                  Discover the world&apos;s most populous and influential cities
                </p>
              </div>
            </section>

            <BrowseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search cities or countries..."
              filterValue={selectedRegion}
              onFilterChange={setSelectedRegion}
              filterOptions={regions}
              filterLabel="Filter by region"
            />

            <section className="section">
              <div className="cities-grid">
                {filteredCities.map((city) => (
                  <div key={city.id} className="city-card">
                    <div className="city-card-header">
                      <div className="city-country">{city.country}</div>
                      <span className="city-code">{city.countryCode}</span>
                    </div>
                    <h3 className="city-name">{city.name}</h3>
                    <p className="city-description">{city.description}</p>
                    <div className="city-details">
                      <div className="city-detail-item">
                        <Users className="city-detail-icon" />
                        <span className="city-detail-text">
                          {city.population}
                        </span>
                      </div>
                      <div className="city-detail-item">
                        <Globe className="city-detail-icon" />
                        <span className="city-detail-text">{city.region}</span>
                      </div>
                    </div>
                    <Link
                      href={`/country/${city.countryCode.toLowerCase()}`}
                      className="city-link"
                    >
                      View Country →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {filteredCities.length === 0 && (
              <section className="section">
                <div className="empty-state">
                  <Building2 className="empty-state-icon" />
                  <h3 className="empty-state-title">No cities found</h3>
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

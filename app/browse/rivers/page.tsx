"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import { Waves, MapPin, Ruler, Globe } from "lucide-react";
import "@/styles/rivers-page.css";

interface River {
  id: string;
  name: string;
  countries: string[];
  length: string;
  continent: string;
  source: string;
  mouth: string;
  description: string;
  flags: string[];
}

export default function RiversPage() {
  const [rivers, setRivers] = useState<River[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");

  useEffect(() => {
    const fetchRivers = async () => {
      try {
        const response = await fetch("/data/browse/rivers.json");
        if (!response.ok) {
          throw new Error("Failed to fetch rivers data");
        }
        const data = await response.json();
        setRivers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load rivers data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchRivers();
  }, []);

  const continents = [
    "All",
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  const filteredRivers = rivers.filter((river) => {
    const matchesSearch =
      river.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      river.countries.some((country) =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesContinent =
      selectedContinent === "All" || river.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  if (loading) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="rivers"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Waves className="page-title-icon" />
                    Major Rivers of the World
                  </h1>
                  <p className="page-description">
                    Explore the world&apos;s most important river systems and
                    waterways
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="loading-state">
                  <p>Loading rivers data...</p>
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
          currentPage="rivers"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <Waves className="page-title-icon" />
                    Major Rivers of the World
                  </h1>
                  <p className="page-description">
                    Explore the world&apos;s most important river systems and
                    waterways
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
        currentPage="rivers"
      />
      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <section className="section">
              <div className="page-header">
                <h1 className="page-title">
                  <Waves className="page-title-icon" />
                  Major Rivers of the World
                </h1>
                <p className="page-description">
                  Explore the world&apos;s most important river systems and
                  waterways
                </p>
              </div>
            </section>

            <BrowseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search rivers or countries..."
              filterValue={selectedContinent}
              onFilterChange={setSelectedContinent}
              filterOptions={continents}
              filterLabel="Filter by continent"
            />

            <section className="section">
              <div className="rivers-grid">
                {filteredRivers.map((river) => (
                  <div key={river.id} className="river-card">
                    <div className="river-card-header">
                      <div className="river-flags">
                        {river.flags.slice(0, 3).map((flag, index) => (
                          <span key={index} className="river-flag">
                            {flag}
                          </span>
                        ))}
                      </div>
                      <span className="river-continent-badge">
                        {river.continent}
                      </span>
                    </div>

                    <h3 className="river-name">{river.name}</h3>
                    <p className="river-description">{river.description}</p>

                    <div className="river-details">
                      <div className="river-detail-item">
                        <Ruler className="river-detail-icon" />
                        <span className="river-detail-text">
                          {river.length}
                        </span>
                      </div>
                      <div className="river-detail-item">
                        <MapPin className="river-detail-icon" />
                        <span className="river-detail-text">
                          {river.source} → {river.mouth}
                        </span>
                      </div>
                      <div className="river-detail-item">
                        <Globe className="river-detail-icon" />
                        <span className="river-detail-text river-countries">
                          {river.countries.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="river-country-links">
                      {river.countries.slice(0, 2).map((country, index) => (
                        <Link
                          key={index}
                          href={`/search?q=${encodeURIComponent(country)}`}
                          className="river-country-link"
                        >
                          {country}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {filteredRivers.length === 0 && (
              <section className="section">
                <div className="empty-state">
                  <Waves className="empty-state-icon" />
                  <h3 className="empty-state-title">No rivers found</h3>
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

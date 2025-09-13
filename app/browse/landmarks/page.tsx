"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";

import { MapPin, Calendar, Globe, Star } from "lucide-react";
import "@/styles/landmarks-page.css";

interface Landmark {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  type: string;
  built: string;
  description: string;
  significance: string;
  visitors: string;
}

export default function LandmarksPage() {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        const response = await fetch("/data/browse/landmarks.json");
        if (!response.ok) {
          throw new Error("Failed to fetch landmarks data");
        }
        const data = await response.json();
        setLandmarks(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load landmarks data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchLandmarks();
  }, []);

  const types = [
    "All",
    "Historical",
    "Architectural",
    "Monument",
    "Archaeological",
    "Religious",
    "Temple",
    "Castle",
    "Bridge",
    "Mausoleum",
    "Amphitheater",
    "Performing Arts",
    "Clock Tower",
    "Sculpture",
    "Basilica",
  ];

  const filteredLandmarks = landmarks.filter((landmark) => {
    const matchesSearch =
      landmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landmark.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landmark.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" || landmark.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="landmarks"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <MapPin className="page-title-icon" />
                    World Famous Landmarks
                  </h1>
                  <p className="page-description">
                    Discover iconic landmarks and monuments from around the
                    globe
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="loading-state">
                  <p>Loading landmarks data...</p>
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
          currentPage="landmarks"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <MapPin className="page-title-icon" />
                    World Famous Landmarks
                  </h1>
                  <p className="page-description">
                    Discover iconic landmarks and monuments from around the
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
        currentPage="landmarks"
      />
      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <section className="section">
              <div className="page-header">
                <h1 className="page-title">
                  <MapPin className="page-title-icon" />
                  World Famous Landmarks
                </h1>
                <p className="page-description">
                  Discover iconic landmarks and monuments from around the globe
                </p>
              </div>
            </section>

            <BrowseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search landmarks, cities, or countries..."
              filterValue={selectedType}
              onFilterChange={setSelectedType}
              filterOptions={types}
              filterLabel="Filter by type"
            />

            <section className="section">
              <div className="landmarks-grid">
                {filteredLandmarks.map((landmark) => (
                  <div key={landmark.id} className="landmark-card">
                    <div className="landmark-card-header">
                      <span className="landmark-flag">{landmark.flag}</span>
                      <span className="landmark-type-badge">
                        {landmark.type}
                      </span>
                    </div>

                    <h3 className="landmark-name">{landmark.name}</h3>
                    <p className="landmark-description">
                      {landmark.description}
                    </p>

                    <div className="landmark-details">
                      <div className="landmark-detail-item">
                        <MapPin className="landmark-detail-icon" />
                        <span className="landmark-detail-text">
                          {landmark.city}, {landmark.country}
                        </span>
                      </div>
                      <div className="landmark-detail-item">
                        <Calendar className="landmark-detail-icon" />
                        <span className="landmark-detail-text">
                          Built: {landmark.built}
                        </span>
                      </div>
                      <div className="landmark-detail-item">
                        <Star className="landmark-detail-icon" />
                        <span className="landmark-detail-text">
                          {landmark.significance}
                        </span>
                      </div>
                      <div className="landmark-detail-item">
                        <Globe className="landmark-detail-icon" />
                        <span className="landmark-detail-text">
                          {landmark.visitors}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/country/${landmark.countryCode.toLowerCase()}`}
                      className="landmark-link"
                    >
                      View Country →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {filteredLandmarks.length === 0 && (
              <section className="section">
                <div className="empty-state">
                  <MapPin className="empty-state-icon" />
                  <h3 className="empty-state-title">No landmarks found</h3>
                  <p className="empty-state-description">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

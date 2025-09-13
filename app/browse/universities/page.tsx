"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import "@/styles/universities-page.css";
import { GraduationCap, Users, MapPin, Star, Calendar } from "lucide-react";

interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  founded: number;
  students: string;
  ranking: number;
  type: string;
  description: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("/data/browse/universities.json");
        if (!response.ok) {
          throw new Error("Failed to fetch universities data");
        }
        const data = await response.json();
        setUniversities(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load universities data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchUniversities();
  }, []);

  const types = ["All", "Private", "Public"];

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" || university.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="page-wrapper page-background">
        <GlobalNavigation
          showBackButton={true}
          backHref="/"
          currentPage="universities"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <GraduationCap className="page-title-icon" />
                    Top Universities Worldwide
                  </h1>
                  <p className="page-description">
                    Explore the world&apos;s leading institutions of higher
                    education
                  </p>
                </div>
              </section>
              <section className="section">
                <div className="loading-state">
                  <p>Loading universities data...</p>
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
          currentPage="universities"
        />
        <div className="page-content">
          <main className="main">
            <div className="sections-container">
              <section className="section">
                <div className="page-header">
                  <h1 className="page-title">
                    <GraduationCap className="page-title-icon" />
                    Top Universities Worldwide
                  </h1>
                  <p className="page-description">
                    Explore the world&apos;s leading institutions of higher
                    education
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
        currentPage="universities"
      />
      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <section className="section">
              <div className="page-header">
                <h1 className="page-title">
                  <GraduationCap className="page-title-icon" />
                  Top Universities Worldwide
                </h1>
                <p className="page-description">
                  Explore the world&apos;s leading institutions of higher
                  education
                </p>
              </div>
            </section>

            <BrowseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search universities, cities, or countries..."
              filterValue={selectedType}
              onFilterChange={setSelectedType}
              filterOptions={types}
              filterLabel="Filter by type"
            />

            <section className="section">
              <div className="universities-grid">
                {filteredUniversities.map((university) => (
                  <div key={university.id} className="university-card">
                    <div className="university-card-header">
                      <div className="university-flag-section">
                        <span className="university-flag-emoji">
                          {university.flag}
                        </span>
                        <div className="university-ranking">
                          <Star className="university-ranking-icon" />
                          <span className="university-ranking-text">
                            #{university.ranking}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`university-type-badge ${university.type.toLowerCase()}`}
                      >
                        {university.type}
                      </span>
                    </div>

                    <h3 className="university-name">{university.name}</h3>
                    <p className="university-description">
                      {university.description}
                    </p>

                    <div className="university-details">
                      <div className="university-detail-item">
                        <MapPin className="university-detail-icon" />
                        <span className="university-detail-text">
                          {university.city}, {university.country}
                        </span>
                      </div>
                      <div className="university-detail-item">
                        <Users className="university-detail-icon" />
                        <span className="university-detail-text">
                          {university.students} students
                        </span>
                      </div>
                      <div className="university-detail-item">
                        <Calendar className="university-detail-icon" />
                        <span className="university-detail-text">
                          Founded {university.founded}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/country/${university.countryCode.toLowerCase()}`}
                      className="university-link"
                    >
                      View Country
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {filteredUniversities.length === 0 && (
              <section className="section">
                <div className="empty-state">
                  <GraduationCap className="empty-state-icon" />
                  <h3 className="empty-state-title">No universities found</h3>
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

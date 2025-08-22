"use client";

import React, { useState } from "react";
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

const universities: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    city: "Cambridge",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1636,
    students: "23,000",
    ranking: 1,
    type: "Private",
    description: "Oldest institution of higher education in the US",
  },
  {
    id: "mit",
    name: "MIT",
    city: "Cambridge",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1861,
    students: "11,500",
    ranking: 2,
    type: "Private",
    description: "Leading in science and technology",
  },
  {
    id: "stanford",
    name: "Stanford University",
    city: "Stanford",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1885,
    students: "17,000",
    ranking: 3,
    type: "Private",
    description: "Heart of Silicon Valley innovation",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1209,
    students: "24,000",
    ranking: 4,
    type: "Public",
    description: "One of the world's oldest universities",
  },
  {
    id: "oxford",
    name: "University of Oxford",
    city: "Oxford",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1096,
    students: "26,000",
    ranking: 5,
    type: "Public",
    description: "Oldest university in the English-speaking world",
  },
  {
    id: "caltech",
    name: "Caltech",
    city: "Pasadena",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1891,
    students: "2,200",
    ranking: 6,
    type: "Private",
    description: "Premier science and engineering institute",
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich",
    city: "Zurich",
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    founded: 1855,
    students: "22,000",
    ranking: 7,
    type: "Public",
    description: "Leading European technical university",
  },
  {
    id: "ucl",
    name: "University College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1826,
    students: "42,000",
    ranking: 8,
    type: "Public",
    description: "London's global university",
  },
  {
    id: "imperial",
    name: "Imperial College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1907,
    students: "19,000",
    ranking: 9,
    type: "Public",
    description: "Science, engineering, medicine and business",
  },
  {
    id: "chicago",
    name: "University of Chicago",
    city: "Chicago",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1890,
    students: "17,000",
    ranking: 10,
    type: "Private",
    description: "Birthplace of modern economics",
  },
  {
    id: "nus",
    name: "National University of Singapore",
    city: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    flag: "🇸🇬",
    founded: 1905,
    students: "40,000",
    ranking: 11,
    type: "Public",
    description: "Asia's leading global university",
  },
  {
    id: "peking",
    name: "Peking University",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    founded: 1898,
    students: "47,000",
    ranking: 12,
    type: "Public",
    description: "China's first modern national university",
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    founded: 1911,
    students: "50,000",
    ranking: 13,
    type: "Public",
    description: "China's MIT",
  },
  {
    id: "pennsylvania",
    name: "University of Pennsylvania",
    city: "Philadelphia",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1740,
    students: "25,000",
    ranking: 14,
    type: "Private",
    description: "Home of the Wharton School",
  },
  {
    id: "edinburgh",
    name: "University of Edinburgh",
    city: "Edinburgh",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1583,
    students: "47,000",
    ranking: 15,
    type: "Public",
    description: "Scotland's ancient university",
  },
  {
    id: "kings-college",
    name: "King's College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1829,
    students: "33,000",
    ranking: 16,
    type: "Public",
    description: "One of England's oldest universities",
  },
  {
    id: "columbia",
    name: "Columbia University",
    city: "New York",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1754,
    students: "33,000",
    ranking: 17,
    type: "Private",
    description: "Ivy League in Manhattan",
  },
  {
    id: "princeton",
    name: "Princeton University",
    city: "Princeton",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1746,
    students: "5,400",
    ranking: 18,
    type: "Private",
    description: "Elite liberal arts and research",
  },
  {
    id: "yale",
    name: "Yale University",
    city: "New Haven",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1701,
    students: "13,600",
    ranking: 19,
    type: "Private",
    description: "Historic Ivy League institution",
  },
  {
    id: "cornell",
    name: "Cornell University",
    city: "Ithaca",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1865,
    students: "25,000",
    ranking: 20,
    type: "Private",
    description: "Any person, any study",
  },
];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

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
                  Explore the world's leading institutions of higher education
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
                      View Country →
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

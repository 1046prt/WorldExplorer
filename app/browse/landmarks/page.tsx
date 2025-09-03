"use client";

import React, { useState } from "react";
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

const landmarks: Landmark[] = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    type: "Historical",
    built: "7th century BC",
    description: "Ancient fortification system across northern China",
    significance: "UNESCO World Heritage Site",
    visitors: "10M annually",
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    type: "Architectural",
    built: "1889",
    description: "Iron lattice tower and symbol of France",
    significance: "Cultural icon",
    visitors: "7M annually",
  },
  {
    id: "statue-of-liberty",
    name: "Statue of Liberty",
    city: "New York",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Monument",
    built: "1886",
    description: "Symbol of freedom and democracy",
    significance: "UNESCO World Heritage Site",
    visitors: "4M annually",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    city: "Cusco",
    country: "Peru",
    countryCode: "PE",
    flag: "🇵🇪",
    type: "Archaeological",
    built: "1450",
    description: "Ancient Incan citadel in the Andes",
    significance: "UNESCO World Heritage Site",
    visitors: "1.5M annually",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    type: "Mausoleum",
    built: "1653",
    description: "Ivory-white marble mausoleum",
    significance: "UNESCO World Heritage Site",
    visitors: "6M annually",
  },
  {
    id: "colosseum",
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    type: "Amphitheater",
    built: "80 AD",
    description: "Ancient Roman amphitheater",
    significance: "UNESCO World Heritage Site",
    visitors: "6M annually",
  },
  {
    id: "christ-redeemer",
    name: "Christ the Redeemer",
    city: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    flag: "🇧🇷",
    type: "Religious",
    built: "1931",
    description: "Art Deco statue of Jesus Christ",
    significance: "New Seven Wonders",
    visitors: "2M annually",
  },
  {
    id: "petra",
    name: "Petra",
    city: "Ma'an",
    country: "Jordan",
    countryCode: "JO",
    flag: "🇯🇴",
    type: "Archaeological",
    built: "4th century BC",
    description: "Ancient city carved into rock",
    significance: "UNESCO World Heritage Site",
    visitors: "1M annually",
  },
  {
    id: "angkor-wat",
    name: "Angkor Wat",
    city: "Siem Reap",
    country: "Cambodia",
    countryCode: "KH",
    flag: "🇰🇭",
    type: "Temple",
    built: "12th century",
    description: "Largest religious monument in the world",
    significance: "UNESCO World Heritage Site",
    visitors: "2.6M annually",
  },
  {
    id: "sydney-opera",
    name: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    type: "Performing Arts",
    built: "1973",
    description: "Multi-venue performing arts center",
    significance: "UNESCO World Heritage Site",
    visitors: "8.2M annually",
  },
  {
    id: "big-ben",
    name: "Big Ben",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    type: "Clock Tower",
    built: "1859",
    description: "Iconic clock tower of Westminster",
    significance: "Cultural landmark",
    visitors: "15M annually",
  },
  {
    id: "mount-rushmore",
    name: "Mount Rushmore",
    city: "Keystone",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Sculpture",
    built: "1941",
    description: "Presidential faces carved in granite",
    significance: "National memorial",
    visitors: "2M annually",
  },
  {
    id: "neuschwanstein",
    name: "Neuschwanstein Castle",
    city: "Bavaria",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    type: "Castle",
    built: "1886",
    description: "Fairy-tale castle in the Alps",
    significance: "Tourist attraction",
    visitors: "1.4M annually",
  },
  {
    id: "sagrada-familia",
    name: "Sagrada Família",
    city: "Barcelona",
    country: "Spain",
    countryCode: "ES",
    flag: "🇪🇸",
    type: "Basilica",
    built: "1882-ongoing",
    description: "Gaudí's unfinished masterpiece",
    significance: "UNESCO World Heritage Site",
    visitors: "4.7M annually",
  },
  {
    id: "golden-gate",
    name: "Golden Gate Bridge",
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Bridge",
    built: "1937",
    description: "Iconic suspension bridge",
    significance: "Engineering marvel",
    visitors: "15M annually",
  },
];

export default function LandmarksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

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

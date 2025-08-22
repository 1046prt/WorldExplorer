"use client";

import React, { useState } from "react";
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

const rivers: River[] = [
  {
    id: "nile",
    name: "Nile River",
    countries: ["Egypt", "Sudan", "Uganda", "Ethiopia"],
    length: "6,650 km",
    continent: "Africa",
    source: "Lake Victoria",
    mouth: "Mediterranean Sea",
    description: "World's longest river, cradle of ancient civilization",
    flags: ["🇪🇬", "🇸🇩", "🇺🇬", "🇪🇹"],
  },
  {
    id: "amazon",
    name: "Amazon River",
    countries: ["Brazil", "Peru", "Colombia"],
    length: "6,400 km",
    continent: "South America",
    source: "Peruvian Andes",
    mouth: "Atlantic Ocean",
    description: "Largest river by discharge volume, heart of the rainforest",
    flags: ["🇧🇷", "🇵🇪", "🇨🇴"],
  },
  {
    id: "yangtze",
    name: "Yangtze River",
    countries: ["China"],
    length: "6,300 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "East China Sea",
    description: "Longest river in Asia, China's golden waterway",
    flags: ["🇨🇳"],
  },
  {
    id: "mississippi",
    name: "Mississippi River",
    countries: ["United States"],
    length: "3,730 km",
    continent: "North America",
    source: "Lake Itasca",
    mouth: "Gulf of Mexico",
    description: "Major North American river system",
    flags: ["🇺🇸"],
  },
  {
    id: "yenisei",
    name: "Yenisei River",
    countries: ["Russia", "Mongolia"],
    length: "3,487 km",
    continent: "Asia",
    source: "Mongolia",
    mouth: "Kara Sea",
    description: "Central Siberian river system",
    flags: ["🇷🇺", "🇲🇳"],
  },
  {
    id: "yellow",
    name: "Yellow River",
    countries: ["China"],
    length: "5,464 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "Bohai Sea",
    description: "Cradle of Chinese civilization",
    flags: ["🇨🇳"],
  },
  {
    id: "ob",
    name: "Ob River",
    countries: ["Russia"],
    length: "3,650 km",
    continent: "Asia",
    source: "Altai Mountains",
    mouth: "Kara Sea",
    description: "Major Siberian river",
    flags: ["🇷🇺"],
  },
  {
    id: "parana",
    name: "Paraná River",
    countries: ["Brazil", "Paraguay", "Argentina"],
    length: "4,880 km",
    continent: "South America",
    source: "Brazil",
    mouth: "Río de la Plata",
    description: "Second longest river in South America",
    flags: ["🇧🇷", "🇵🇾", "🇦🇷"],
  },
  {
    id: "congo",
    name: "Congo River",
    countries: ["DR Congo", "Central African Republic", "Angola"],
    length: "4,700 km",
    continent: "Africa",
    source: "East African Rift",
    mouth: "Atlantic Ocean",
    description: "Deepest river in the world",
    flags: ["🇨🇩", "🇨🇫", "🇦🇴"],
  },
  {
    id: "amur",
    name: "Amur River",
    countries: ["Russia", "China"],
    length: "2,824 km",
    continent: "Asia",
    source: "Mongolia",
    mouth: "Sea of Okhotsk",
    description: "Border river between Russia and China",
    flags: ["🇷🇺", "🇨🇳"],
  },
  {
    id: "lena",
    name: "Lena River",
    countries: ["Russia"],
    length: "4,400 km",
    continent: "Asia",
    source: "Baikal Mountains",
    mouth: "Laptev Sea",
    description: "Easternmost of the three great Siberian rivers",
    flags: ["🇷🇺"],
  },
  {
    id: "mekong",
    name: "Mekong River",
    countries: ["China", "Myanmar", "Laos", "Thailand", "Cambodia", "Vietnam"],
    length: "4,350 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "South China Sea",
    description: "Lifeline of Southeast Asia",
    flags: ["🇨🇳", "🇲🇲", "🇱🇦", "🇹🇭", "🇰🇭", "🇻🇳"],
  },
  {
    id: "mackenzie",
    name: "Mackenzie River",
    countries: ["Canada"],
    length: "4,241 km",
    continent: "North America",
    source: "Great Slave Lake",
    mouth: "Beaufort Sea",
    description: "Longest river system in Canada",
    flags: ["🇨🇦"],
  },
  {
    id: "niger",
    name: "Niger River",
    countries: ["Guinea", "Mali", "Niger", "Nigeria"],
    length: "4,180 km",
    continent: "Africa",
    source: "Guinea Highlands",
    mouth: "Gulf of Guinea",
    description: "Principal river of western Africa",
    flags: ["🇬🇳", "🇲🇱", "🇳🇪", "🇳🇬"],
  },
  {
    id: "brahmaputra",
    name: "Brahmaputra River",
    countries: ["China", "India", "Bangladesh"],
    length: "3,848 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "Bay of Bengal",
    description: "Trans-boundary river of Asia",
    flags: ["🇨🇳", "🇮🇳", "🇧🇩"],
  },
];

export default function RiversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");

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
                  Explore the world's most important river systems and waterways
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

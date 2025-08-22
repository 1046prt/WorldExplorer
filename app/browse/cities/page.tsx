"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalNavigation } from "@/components/global-navigation";
import Footer from "@/components/footer";
import "@/styles/cities-page.css";
import { Search, Filter, Building2, Users, Globe } from "lucide-react";

interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  population: string;
  region: string;

  description: string;
}

const cities: City[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    population: "37.4M",
    region: "Asia",
    description: "World's largest metropolitan area",
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    countryCode: "IN",
    population: "32.9M",
    region: "Asia",
    description: "Historic capital of India",
  },
  {
    id: "shanghai",
    name: "Shanghai",
    country: "China",
    countryCode: "CN",
    population: "28.5M",
    region: "Asia",
    description: "China's financial hub",
  },
  {
    id: "dhaka",
    name: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
    population: "22.5M",
    region: "Asia",
    description: "Capital of Bangladesh",
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    country: "Brazil",
    countryCode: "BR",
    population: "22.4M",
    region: "South America",
    description: "Brazil's economic powerhouse",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    population: "21.3M",
    region: "Africa",
    description: "City of a thousand minarets",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
    population: "21.9M",
    region: "North America",
    description: "Historic Aztec capital",
  },
  {
    id: "beijing",
    name: "Beijing",
    country: "China",
    countryCode: "CN",
    population: "21.5M",
    region: "Asia",
    description: "China's political center",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    countryCode: "IN",
    population: "20.4M",
    region: "Asia",
    description: "Bollywood capital",
  },
  {
    id: "osaka",
    name: "Osaka",
    country: "Japan",
    countryCode: "JP",
    population: "18.9M",
    region: "Asia",
    description: "Japan's kitchen",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    countryCode: "US",
    population: "18.8M",
    region: "North America",
    description: "The Big Apple",
  },
  {
    id: "karachi",
    name: "Karachi",
    country: "Pakistan",
    countryCode: "PK",
    population: "16.1M",
    region: "Asia",
    description: "Pakistan's largest city",
  },
  {
    id: "chongqing",
    name: "Chongqing",
    country: "China",
    countryCode: "CN",
    population: "15.9M",
    region: "Asia",
    description: "Mountain city",
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    countryCode: "TR",
    population: "15.5M",
    region: "Europe",
    description: "Bridge between continents",
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    population: "15.2M",
    region: "South America",
    description: "Paris of South America",
  },
  {
    id: "kolkata",
    name: "Kolkata",
    country: "India",
    countryCode: "IN",
    population: "14.9M",
    region: "Asia",
    description: "Cultural capital of India",
  },
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
    population: "14.8M",
    region: "Africa",
    description: "Nigeria's commercial hub",
  },
  {
    id: "kinshasa",
    name: "Kinshasa",
    country: "DR Congo",
    countryCode: "CD",
    population: "14.3M",
    region: "Africa",
    description: "Heart of Africa",
  },
  {
    id: "manila",
    name: "Manila",
    country: "Philippines",
    countryCode: "PH",
    population: "13.9M",
    region: "Asia",
    description: "Pearl of the Orient",
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    population: "13.3M",
    region: "South America",
    description: "Marvelous city",
  },
];

export default function CitiesPage() {
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

  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

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
                  Discover the world's most populous and influential cities
                </p>
              </div>
            </section>

            <section className="section">
              <div className="countries-filters">
                <div className="filter-input-wrapper">
                  <Search className="filter-input-icon" />
                  <input
                    type="text"
                    placeholder="Search cities or countries..."
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

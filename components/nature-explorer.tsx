"use client";

import { useState } from "react";
import { Mountain, Waves, TreePine } from "lucide-react";
import "@/styles/nature-explorer.css";

interface NatureWonder {
  name: string;
  type: string;
  country: string;
  height?: string;
  area?: string;
  depth?: string;
  coordinates: string;
}

interface Volcano {
  name: string;
  country: string;
  type: string;
  status: string;
  lastEruption: string;
}

interface Migration {
  species: string;
  route: string;
  distance: string;
  season: string;
}

interface River {
  name: string;
  length: string;
  countries: string;
  outflow: string;
}

interface Climate {
  zone: string;
  temperature: string;
  rainfall: string;
  regions: string;
}

interface Ecosystem {
  name: string;
  biodiversity: string;
  threats: string;
  locations: string;
}
const natureData = {
  wonders: [
    {
      name: "Mount Everest",
      type: "Mountain",
      country: "Nepal/China",
      height: "8,849m",
      coordinates: "27.9881°N, 86.9250°E",
    },
    {
      name: "Great Barrier Reef",
      type: "Reef",
      country: "Australia",
      area: "344,400 km²",
      coordinates: "18.2871°S, 147.6992°E",
    },
    {
      name: "Amazon Rainforest",
      type: "Forest",
      country: "Brazil/Peru/Colombia",
      area: "5.5M km²",
      coordinates: "3.4653°S, 62.2159°W",
    },
    {
      name: "Sahara Desert",
      type: "Desert",
      country: "North Africa",
      area: "9.2M km²",
      coordinates: "23.4162°N, 25.6628°E",
    },
    {
      name: "Grand Canyon",
      type: "Canyon",
      country: "United States",
      depth: "1,857m",
      coordinates: "36.1069°N, 112.1129°W",
    },
    {
      name: "Victoria Falls",
      type: "Waterfall",
      country: "Zambia/Zimbabwe",
      height: "108m",
      coordinates: "17.9243°S, 25.8572°E",
    },
  ],
  volcanoes: [
    {
      name: "Mount Vesuvius",
      country: "Italy",
      lastEruption: "1944",
      type: "Stratovolcano",
      status: "Active",
    },
    {
      name: "Krakatoa",
      country: "Indonesia",
      lastEruption: "2018",
      type: "Caldera",
      status: "Active",
    },
    {
      name: "Yellowstone",
      country: "USA",
      lastEruption: "70,000 years ago",
      type: "Supervolcano",
      status: "Active",
    },
    {
      name: "Mount Fuji",
      country: "Japan",
      lastEruption: "1707",
      type: "Stratovolcano",
      status: "Dormant",
    },
    {
      name: "Mount Etna",
      country: "Italy",
      lastEruption: "2023",
      type: "Stratovolcano",
      status: "Active",
    },
    {
      name: "Kilauea",
      country: "USA (Hawaii)",
      lastEruption: "2023",
      type: "Shield Volcano",
      status: "Active",
    },
  ],
  migrations: [
    {
      species: "Arctic Tern",
      route: "Arctic to Antarctic",
      distance: "71,000 km",
      season: "Annual",
    },
    {
      species: "Monarch Butterfly",
      route: "Canada to Mexico",
      distance: "4,800 km",
      season: "Fall/Spring",
    },
    {
      species: "Wildebeest",
      route: "Serengeti Circuit",
      distance: "1,800 km",
      season: "Year-round",
    },
    {
      species: "Humpback Whale",
      route: "Alaska to Hawaii",
      distance: "8,000 km",
      season: "Winter",
    },
    {
      species: "Gray Whale",
      route: "Alaska to Mexico",
      distance: "20,000 km",
      season: "Winter/Summer",
    },
    {
      species: "Caribou",
      route: "Arctic Tundra",
      distance: "5,000 km",
      season: "Spring/Fall",
    },
  ],
  rivers: [
    {
      name: "Nile",
      length: "6,650 km",
      countries: "Egypt, Sudan, Uganda, Ethiopia",
      outflow: "Mediterranean Sea",
    },
    {
      name: "Amazon River",
      length: "6,400 km",
      countries: "Brazil, Peru, Colombia",
      outflow: "Atlantic Ocean",
    },
    {
      name: "Yangtze",
      length: "6,300 km",
      countries: "China",
      outflow: "East China Sea",
    },
    {
      name: "Mississippi",
      length: "3,734 km",
      countries: "United States",
      outflow: "Gulf of Mexico",
    },
    {
      name: "Ganges",
      length: "2,525 km",
      countries: "India, Bangladesh",
      outflow: "Bay of Bengal",
    },
    {
      name: "Danube",
      length: "2,850 km",
      countries: "Germany, Austria, Hungary, Romania",
      outflow: "Black Sea",
    },
  ],
  climates: [
    {
      zone: "Tropical",
      temperature: "20-30°C",
      rainfall: "Heavy (>2000mm/year)",
      regions: "Amazon, Congo Basin, Southeast Asia",
    },
    {
      zone: "Desert",
      temperature: ">40°C day, <10°C night",
      rainfall: "Minimal (<250mm/year)",
      regions: "Sahara, Arabian Desert, Gobi",
    },
    {
      zone: "Polar",
      temperature: "-40 to 0°C",
      rainfall: "Snow/Ice (<250mm/year)",
      regions: "Antarctica, Arctic Circle",
    },
    {
      zone: "Temperate",
      temperature: "0-20°C",
      rainfall: "Moderate (500-1500mm/year)",
      regions: "Europe, North America, East Asia",
    },
    {
      zone: "Mediterranean",
      temperature: "10-25°C",
      rainfall: "Seasonal (300-900mm/year)",
      regions: "Mediterranean Basin, California, Chile",
    },
    {
      zone: "Monsoon",
      temperature: "20-35°C",
      rainfall: "Seasonal Heavy (1000-3000mm/year)",
      regions: "South Asia, Southeast Asia",
    },
  ],
  ecosystems: [
    {
      name: "Coral Reefs",
      biodiversity: "25% of marine species",
      threats: "Bleaching, pollution, overfishing",
      locations: "Great Barrier Reef, Caribbean, Red Sea",
    },
    {
      name: "Rainforests",
      biodiversity: "50% of terrestrial species",
      threats: "Deforestation, climate change",
      locations: "Amazon, Congo, Southeast Asia",
    },
    {
      name: "Wetlands",
      biodiversity: "40% of species depend on them",
      threats: "Drainage, pollution, development",
      locations: "Everglades, Pantanal, Okavango Delta",
    },
    {
      name: "Grasslands",
      biodiversity: "Large herbivore ecosystems",
      threats: "Agriculture, overgrazing",
      locations: "Serengeti, Great Plains, Pampas",
    },
  ],
};

export function NatureExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("wonders");
  const [search, setSearch] = useState("");

  const filterData = <T extends Record<string, unknown>>(
    items: T[],
    keyFields: string[]
  ): T[] => {
    return items.filter((item) =>
      keyFields.some((key) =>
        String(item[key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title flex gap-sm items-center">
          <TreePine className="icon" />
          Nature & Exploration
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input mt-sm"
        />
      </div>

      <div className="card-content">
        <div className="tabs">
          <div className="tabs-list nature-tabs">
            {[
              "wonders",
              "volcanoes",
              "migrations",
              "rivers",
              "climates",
              "ecosystems",
            ].map((cat) => (
              <button
                key={cat}
                className={`tabs-trigger ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Wonders */}
          {selectedCategory === "wonders" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {filterData(natureData.wonders, ["name", "type", "country"]).map(
                (wonder: NatureWonder, i) => (
                  <div key={i} className="card bordered green">
                    <div className="card-header">
                      <h3 className="card-title flex gap-sm items-center green-text">
                        {wonder.type === "Mountain" && (
                          <Mountain className="icon" />
                        )}
                        {wonder.type === "Reef" && <Waves className="icon" />}
                        {wonder.type === "Forest" && (
                          <TreePine className="icon" />
                        )}
                        {wonder.name}
                      </h3>
                      <span className="badge">{wonder.type}</span>
                    </div>
                    <div className="card-content">
                      <p className="text-sm">
                        <strong>Location:</strong> {wonder.country}
                      </p>
                      <p className="text-sm">
                        <strong>{wonder.height ? "Height" : "Area"}:</strong>{" "}
                        {wonder.height || wonder.area}
                      </p>
                      <p className="text-sm">
                        <strong>Coordinates:</strong> {wonder.coordinates}
                      </p>
                      <button
                        className="btn mt-sm"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/${encodeURIComponent(
                              wonder.coordinates
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        📍 View on Map
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Volcanoes */}
          {selectedCategory === "volcanoes" && (
            <div className="nature-grid">
              {filterData(natureData.volcanoes, [
                "name",
                "country",
                "type",
              ]).map((volcano: Volcano, i) => (
                <div key={i} className="nature-card">
                  <div className="nature-card-header">
                    <h3 className="nature-card-title">🌋 {volcano.name}</h3>
                    <span
                      className={`nature-badge ${(
                        volcano.status as string
                      ).toLowerCase()}`}
                    >
                      {volcano.status}
                    </span>
                  </div>
                  <div className="nature-card-content">
                    <p>
                      <strong>Country:</strong> {volcano.country}
                    </p>
                    <p>
                      <strong>Type:</strong> {volcano.type}
                    </p>
                    <p>
                      <strong>Last Eruption:</strong> {volcano.lastEruption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Migrations */}
          {selectedCategory === "migrations" && (
            <div className="nature-grid">
              {filterData(natureData.migrations, ["species", "route"]).map(
                (migration: Migration, i) => (
                  <div key={i} className="nature-card">
                    <div className="nature-card-header">
                      <h3 className="nature-card-title">
                        🦅 {migration.species}
                      </h3>
                      <span className="nature-badge">{migration.season}</span>
                    </div>
                    <div className="nature-card-content">
                      <p>
                        <strong>Route:</strong> {migration.route}
                      </p>
                      <p>
                        <strong>Distance:</strong> {migration.distance}
                      </p>
                      <p>
                        <strong>Season:</strong> {migration.season}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Rivers */}
          {selectedCategory === "rivers" && (
            <div className="nature-grid">
              {filterData(natureData.rivers, ["name", "countries"]).map(
                (river: River, i) => (
                  <div key={i} className="nature-card">
                    <div className="nature-card-header">
                      <h3 className="nature-card-title">🌊 {river.name}</h3>
                      <span className="nature-badge">{river.length}</span>
                    </div>
                    <div className="nature-card-content">
                      <p>
                        <strong>Length:</strong> {river.length}
                      </p>
                      <p>
                        <strong>Countries:</strong> {river.countries}
                      </p>
                      <p>
                        <strong>Outflow:</strong> {river.outflow}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Climates */}
          {selectedCategory === "climates" && (
            <div className="nature-grid">
              {filterData(natureData.climates, ["zone", "regions"]).map(
                (climate: Climate, i) => (
                  <div key={i} className="nature-card">
                    <div className="nature-card-header">
                      <h3 className="nature-card-title">🌡️ {climate.zone}</h3>
                    </div>
                    <div className="nature-card-content">
                      <p>
                        <strong>Temperature:</strong> {climate.temperature}
                      </p>
                      <p>
                        <strong>Rainfall:</strong> {climate.rainfall}
                      </p>
                      <p>
                        <strong>Regions:</strong> {climate.regions}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Ecosystems */}
          {selectedCategory === "ecosystems" && (
            <div className="nature-grid">
              {filterData(natureData.ecosystems, ["name", "locations"]).map(
                (ecosystem: Ecosystem, i) => (
                  <div key={i} className="nature-card">
                    <div className="nature-card-header">
                      <h3 className="nature-card-title">🌿 {ecosystem.name}</h3>
                    </div>
                    <div className="nature-card-content">
                      <p>
                        <strong>Biodiversity:</strong> {ecosystem.biodiversity}
                      </p>
                      <p>
                        <strong>Threats:</strong> {ecosystem.threats}
                      </p>
                      <p>
                        <strong>Locations:</strong> {ecosystem.locations}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

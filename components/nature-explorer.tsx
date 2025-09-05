"use client";

import { useState, useEffect } from "react";
import {
  Mountain,
  Waves,
  TreePine,
  Sun,
  Landmark,
  Droplet,
} from "lucide-react";
import "@/styles/nature-explorer.css";

interface NatureWonder extends Record<string, unknown> {
  name: string;
  type: string;
  country: string;
  height?: string;
  area?: string;
  depth?: string;
  coordinates: string;
}

interface Volcano extends Record<string, unknown> {
  name: string;
  country: string;
  type: string;
  status: string;
  lastEruption: string;
}

interface Migration extends Record<string, unknown> {
  species: string;
  route: string;
  distance: string;
  season: string;
}

interface River extends Record<string, unknown> {
  name: string;
  length: string;
  countries: string;
  outflow: string;
}

interface Climate extends Record<string, unknown> {
  zone: string;
  temperature: string;
  rainfall: string;
  regions: string;
}

interface Ecosystem extends Record<string, unknown> {
  name: string;
  biodiversity: string;
  threats: string;
  locations: string;
}

interface NatureData {
  wonders: NatureWonder[];
  volcanoes: Volcano[];
  migrations: Migration[];
  rivers: River[];
  climates: Climate[];
  ecosystems: Ecosystem[];
}

export function NatureExplorer() {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof NatureData>("wonders");
  const [search, setSearch] = useState("");
  const [natureData, setNatureData] = useState<NatureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { key: "wonders", label: "Natural Wonders", icon: Mountain },
    { key: "volcanoes", label: "Volcanoes", icon: TreePine },
    { key: "migrations", label: "Migrations", icon: Waves },
    { key: "rivers", label: "Rivers", icon: Droplet },
    { key: "climates", label: "Climate Zones", icon: Sun },
    { key: "ecosystems", label: "Ecosystems", icon: Landmark },
  ];

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/nature.json");
        if (!response.ok) {
          throw new Error("Failed to fetch nature data");
        }
        const data: NatureData = await response.json();
        setNatureData(data);
        setLoading(false);
      } catch (err) {
        setError("Error loading data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey as keyof NatureData);
  };

  if (loading) {
    return (
      <div className="nature-explorer-loading">Loading nature data...</div>
    );
  }

  if (error || !natureData) {
    return (
      <div className="nature-explorer-error">
        {error || "No nature data available"}
      </div>
    );
  }

  return (
    <div className="nature-explorer-container">
      <div className="nature-explorer-header">
        <h2 className="nature-explorer-title">
          <TreePine
            className="nature-title-icon"
            style={{ marginRight: "8px", width: "20px", height: "20px" }}
          />
          Nature & Exploration
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nature-search-input"
        />
      </div>

      <div className="nature-explorer-content">
        {/* Simple Category Selector */}
        <div className="nature-category-section">
          <div className="nature-categories-grid">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.key;

              return (
                <button
                  key={category.key}
                  className={`nature-category-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleCategorySelect(category.key)}
                >
                  <IconComponent size={16} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="nature-content-area">
          {/* Wonders */}
          {selectedCategory === "wonders" && (
            <div className="nature-grid">
              {filterData(natureData.wonders, ["name", "type", "country"]).map(
                (wonder: NatureWonder, i) => (
                  <div key={i} className="nature-card wonder-card">
                    <div className="nature-card-header">
                      <h3 className="nature-card-title">
                        {wonder.type === "Mountain" && (
                          <Mountain
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.type === "Reef" && (
                          <Waves
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.type === "Forest" && (
                          <TreePine
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.type === "Desert" && (
                          <Sun
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.type === "Canyon" && (
                          <Landmark
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.type === "Waterfall" && (
                          <Droplet
                            className="wonder-icon"
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        )}
                        {wonder.name}
                      </h3>
                      <span className="nature-badge wonder-type">
                        {wonder.type}
                      </span>
                    </div>
                    <div className="nature-card-content">
                      <p>
                        <strong>Location:</strong> {wonder.country}
                      </p>
                      <p>
                        <strong>
                          {wonder.height
                            ? "Height"
                            : wonder.depth
                            ? "Depth"
                            : "Area"}
                          :
                        </strong>{" "}
                        {wonder.height || wonder.depth || wonder.area}
                      </p>
                      <p>
                        <strong>Coordinates:</strong> {wonder.coordinates}
                      </p>
                      <button
                        className="nature-map-btn"
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

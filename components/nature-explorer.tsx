"use client";

import { useState } from "react";
import { Mountain, Waves, TreePine } from "lucide-react";
import "@/styles/nature-explorer.css";
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
  ],
  rivers: [
    {
      name: "Nile",
      length: "6,650 km",
      countries: "Egypt, Sudan, Uganda, Ethiopia, more",
      outflow: "Mediterranean Sea",
    },
    {
      name: "Amazon River",
      length: "6,400 km",
      countries: "Brazil, Peru, Colombia, more",
      outflow: "Atlantic Ocean",
    },
    {
      name: "Ganges",
      length: "2,525 km",
      countries: "India, Bangladesh",
      outflow: "Bay of Bengal",
    },
  ],
  climates: [
    {
      zone: "Tropical",
      temperature: "20-30°C",
      rainfall: "Heavy",
      regions: "Amazon, Congo Basin, Southeast Asia",
    },
    {
      zone: "Desert",
      temperature: ">40°C daytime, <10°C night",
      rainfall: "Minimal",
      regions: "Sahara, Arabian Desert, Gobi",
    },
    {
      zone: "Polar",
      temperature: "-40 to 0°C",
      rainfall: "Snow/Ice",
      regions: "Antarctica, Arctic Circle",
    },
  ],
};

export function NatureExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("wonders");
  const [search, setSearch] = useState("");

  const filterData = (items: any[], keyFields: string[]) => {
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
          <div className="tabs-list grid grid-cols-5">
            {["wonders", "volcanoes", "migrations", "rivers", "climates"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`tabs-trigger ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Wonders */}
          {selectedCategory === "wonders" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {filterData(natureData.wonders, ["name", "type", "country"]).map(
                (wonder, i) => (
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
                      <button className="btn mt-sm">📍 View on Map</button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* (Repeat similar structure for volcanoes, migrations, rivers, climates) */}
        </div>
      </div>
    </div>
  );
}

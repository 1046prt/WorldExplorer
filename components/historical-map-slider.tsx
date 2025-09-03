"use client";

import { useState, useEffect } from "react";
import "@/styles/historical-map-slider.css";
import { Clock, Play, Pause } from "lucide-react";
import Image from "next/image";

const historicalData = [
  {
    year: 1800,
    title: "Regency Era",
    description:
      "Britain marked by elegance, social change, and cultural growth",
    mapUrl: "/images/maps/world-1800.png",
  },
  {
    year: 1900,
    title: "Colonial Era",
    description: "European colonial empires at their peak",
    mapUrl: "/images/maps/world-1900.png",
  },
  {
    year: 1930,
    title: "Great Depression Era",
    description: "Worldwide economic crisis with mass unemployment and poverty",
    mapUrl: "/images/maps/world-1930.png",
  },
  {
    year: 1945,
    title: "Post-WWII",
    description: "Global borders redrawn after World War II",
    mapUrl: "/images/maps/world-1945.png",
  },
  {
    year: 1965,
    title: "Cold War Tensions",
    description: "US–Soviet rivalry shaping global politics and conflicts",
    mapUrl: "/images/maps/world-1965.png",
  },
  {
    year: 1991,
    title: "End of Cold War",
    description: "Dissolution of the Soviet Union and rise of new nations",
    mapUrl: "/images/maps/world-1991.png",
  },
  {
    year: 2001,
    title: "Globalization Era",
    description:
      "Increased global interconnectedness and post-9/11 geopolitics",
    mapUrl: "/images/maps/world-2001.png",
  },
  {
    year: 2015,
    title: "Digital Age",
    description: "Rapid technological advances and global connectivity",
    mapUrl: "/images/maps/world-2015.png",
  },
  {
    year: 2025,
    title: "Modern Day",
    description: "Current world borders and contemporary challenges",
    mapUrl: "/images/maps/world-2025.png",
  },
];

export function HistoricalMapSlider() {
  const [currentYear, setCurrentYear] = useState([1800]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % historicalData.length;
        setCurrentYear([historicalData[nextIndex].year]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentData = historicalData[currentIndex];

  return (
    <div className="historical-map-slider-card">
      <div className="card-header">
        <div className="card-title">
          <Clock className="h-6 w-6" />
          Historical Map Timeline
        </div>
      </div>
      <div className="card-content">
        <div className="map-container">
          <div className="map-wrapper">
            <Image
              src={currentData.mapUrl}
              alt={`World map ${currentData.year}`}
              className="map-image"
              width={600}
              height={400}
            />
          </div>
          <div className="hm-badge">{currentData.year}</div>
        </div>

        <div className="text-center">
          <h3 className="historical-map-slider-title">{currentData.title}</h3>
          <p className="description">{currentData.description}</p>
        </div>

        <div className="flex-row" style={{ marginTop: "1rem" }}>
          <span>1800</span>
          <input
            type="range"
            min="1800"
            max="2025"
            step="1"
            value={currentYear[0]}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentYear([val]);
              const idx = historicalData.findIndex((item) => item.year === val);
              if (idx !== -1) setCurrentIndex(idx);
            }}
            style={{ flex: 1 }}
          />
          <span>2025</span>
        </div>

        <div className="flex-center" style={{ margin: "1rem 0" }}>
          <button onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isPlaying ? " Pause" : " Play"} Timeline
          </button>
        </div>

        <div className="grid-buttons">
          {historicalData.map((period, idx) => (
            <button
              key={period.year}
              className={currentYear[0] === period.year ? "active" : ""}
              onClick={() => {
                setCurrentYear([period.year]);
                setCurrentIndex(idx);
              }}
            >
              {period.year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

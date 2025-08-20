"use client";

import { useState, useEffect } from "react";
import "/styles/historical-map-slider.css";
import { Clock, Play, Pause } from "lucide-react";

const historicalData = [
  {
    year: 1900,
    title: "Colonial Era",
    description: "European colonial empires at their peak",
    mapUrl: "/images/maps/world-1900.png",
  },
  {
    year: 1945,
    title: "Post-WWII",
    description: "New borders after World War II",
    mapUrl: "/images/maps/world-1945.png",
  },
  {
    year: 1991,
    title: "End of Cold War",
    description: "Soviet Union dissolution",
    mapUrl: "/images/maps/world-1991.png",
  },
  {
    year: 2025,
    title: "Modern Day",
    description: "Current world borders",
    mapUrl: "/images/maps/world-2024.png",
  },
];

export function HistoricalMapSlider() {
  const [currentYear, setCurrentYear] = useState([1900]);
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
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <Clock className="h-6 w-6" />
          Historical Map Timeline
        </div>
      </div>
      <div className="card-content">
        <div className="map-container">
          <div className="map-wrapper">
            <img
              src={currentData.mapUrl}
              alt={`World map ${currentData.year}`}
              className="map-image"
            />
          </div>
          <div className="badge">{currentData.year}</div>
        </div>

        <div className="text-center">
          <h3 className="title">{currentData.title}</h3>
          <p className="description">{currentData.description}</p>
        </div>

        <div className="flex-row" style={{ marginTop: "1rem" }}>
          <span>1900</span>
          <input
            type="range"
            min="1900"
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

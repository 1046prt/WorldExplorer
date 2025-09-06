"use client";

import { useState, useEffect } from "react";
import "@/styles/historical-map-slider.css";
import { Clock, Play, Pause } from "lucide-react";
import Image from "next/image";

interface HistoricalPeriod {
  year: number;
  title: string;
  description: string;
  mapUrl: string;
}

export function HistoricalMapSlider() {
  const [currentYear, setCurrentYear] = useState([1800]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [historicalData, setHistoricalData] = useState<HistoricalPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load historical data from JSON file
  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/historical-timeline.json");
        if (!response.ok) {
          throw new Error("Failed to load historical data");
        }
        const data: HistoricalPeriod[] = await response.json();
        setHistoricalData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load historical data"
        );
        console.error("Error loading historical data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistoricalData();
  }, []);

  useEffect(() => {
    if (!isPlaying || historicalData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % historicalData.length;
        setCurrentYear([historicalData[nextIndex].year]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, historicalData]);

  // Loading state
  if (loading) {
    return (
      <div className="historical-map-slider-card">
        <div className="card-header">
          <div className="card-title">
            <Clock className="h-6 w-6" />
            Historical Map Timeline
          </div>
        </div>
        <div className="card-content">
          <div className="loading-spinner">
            <Clock className="animate-spin" size={32} />
          </div>
          <p>Loading historical timeline...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="historical-map-slider-card">
        <div className="card-header">
          <div className="card-title">
            <Clock className="h-6 w-6" />
            Historical Map Timeline
          </div>
        </div>
        <div className="card-content">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (historicalData.length === 0) {
    return null;
  }

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

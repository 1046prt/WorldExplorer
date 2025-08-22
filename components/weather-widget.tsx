"use client";

import type React from "react";
import "@/styles/weather-widget.css";
import { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnowIcon as Snow,
  Wind,
  Droplets,
  Eye,
} from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }[];
}

// Mock weather data (in real app, fetch from weather API)
const mockWeatherData: Record<string, WeatherData> = {
  "new york": {
    city: "New York",
    country: "United States",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    icon: "partly-cloudy",
    forecast: [
      {
        day: "Today",
        high: 24,
        low: 18,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
      },
      { day: "Tomorrow", high: 26, low: 20, condition: "Sunny", icon: "sunny" },
      { day: "Wed", high: 23, low: 17, condition: "Rainy", icon: "rainy" },
      { day: "Thu", high: 21, low: 15, condition: "Cloudy", icon: "cloudy" },
      { day: "Fri", high: 25, low: 19, condition: "Sunny", icon: "sunny" },
    ],
  },
  london: {
    city: "London",
    country: "United Kingdom",
    temperature: 15,
    condition: "Rainy",
    humidity: 80,
    windSpeed: 8,
    visibility: 6,
    icon: "rainy",
    forecast: [
      { day: "Today", high: 16, low: 12, condition: "Rainy", icon: "rainy" },
      {
        day: "Tomorrow",
        high: 18,
        low: 14,
        condition: "Cloudy",
        icon: "cloudy",
      },
      {
        day: "Wed",
        high: 17,
        low: 13,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
      },
      { day: "Thu", high: 19, low: 15, condition: "Sunny", icon: "sunny" },
      { day: "Fri", high: 16, low: 12, condition: "Rainy", icon: "rainy" },
    ],
  },
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    temperature: 28,
    condition: "Sunny",
    humidity: 55,
    windSpeed: 6,
    visibility: 15,
    icon: "sunny",
    forecast: [
      { day: "Today", high: 30, low: 24, condition: "Sunny", icon: "sunny" },
      { day: "Tomorrow", high: 32, low: 26, condition: "Sunny", icon: "sunny" },
      {
        day: "Wed",
        high: 29,
        low: 23,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
      },
      { day: "Thu", high: 27, low: 21, condition: "Cloudy", icon: "cloudy" },
      { day: "Fri", high: 31, low: 25, condition: "Sunny", icon: "sunny" },
    ],
  },
};

export function WeatherWidget() {
  const [city, setCity] = useState("new york");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setTimeout(() => {
      const weatherData = mockWeatherData[cityName.toLowerCase()];
      setWeather(weatherData || null);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="icon-large sunny" />;
      case "partly-cloudy":
        return <Cloud className="icon-large partly" />;
      case "cloudy":
        return <Cloud className="icon-large cloudy" />;
      case "rainy":
        return <CloudRain className="icon-large rainy" />;
      case "snowy":
        return <Snow className="icon-large snowy" />;
      default:
        return <Sun className="icon-large sunny" />;
    }
  };

  const getSmallWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="icon-small sunny" />;
      case "partly-cloudy":
        return <Cloud className="icon-small partly" />;
      case "cloudy":
        return <Cloud className="icon-small cloudy" />;
      case "rainy":
        return <CloudRain className="icon-small rainy" />;
      case "snowy":
        return <Snow className="icon-small snowy" />;
      default:
        return <Sun className="icon-small sunny" />;
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <Cloud className="weather-main-icon" />
        <div>
          <h3 className="weather-title">Weather Information</h3>
          <p className="weather-subtitle">Current conditions and forecast</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="weather-input"
        />
        <button type="submit" className="weather-button" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {weather && (
        <div className="weather-body">
          {/* Current Weather */}
          <div className="weather-current">
            <div className="weather-current-header">
              <div>
                <h4>{weather.city}</h4>
                <p>{weather.country}</p>
              </div>
              {getWeatherIcon(weather.icon)}
            </div>

            <div className="weather-temp">
              <div className="temp-value">{weather.temperature}°C</div>
              <div className="temp-condition">{weather.condition}</div>
            </div>

            <div className="weather-details">
              <div className="detail">
                <Droplets className="detail-icon humidity" />
                <span>{weather.humidity}% Humidity</span>
              </div>
              <div className="detail">
                <Wind className="detail-icon wind" />
                <span>{weather.windSpeed} km/h Wind</span>
              </div>
              <div className="detail">
                <Eye className="detail-icon visibility" />
                <span>{weather.visibility} km Visibility</span>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div className="weather-forecast">
            <h5>5-Day Forecast</h5>
            <div className="forecast-grid">
              {weather.forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <div>{day.day}</div>
                  {getSmallWeatherIcon(day.icon)}
                  <div className="high">{day.high}°</div>
                  <div className="low">{day.low}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="weather-empty">
          Enter a city name to get weather information
        </div>
      )}
    </div>
  );
}

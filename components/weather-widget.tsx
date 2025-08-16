"use client";

import type React from "react";

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

    // Simulate API delay
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
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "partly-cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-600" />;
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case "snowy":
        return <Snow className="w-8 h-8 text-blue-300" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getSmallWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case "partly-cloudy":
        return <Cloud className="w-4 h-4 text-gray-500" />;
      case "cloudy":
        return <Cloud className="w-4 h-4 text-gray-600" />;
      case "rainy":
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      case "snowy":
        return <Snow className="w-4 h-4 text-blue-300" />;
      default:
        return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="card weather-widget">
      <div className="weather-widget-header">
        <Cloud className="weather-widget-icon" />
        <div>
          <h3 className="weather-widget-title">Weather Information</h3>
          <p className="weather-widget-subtitle">
            Current conditions and forecast
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="weather-search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="input weather-search-input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {weather && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="weather-current">
            <div className="weather-current-header">
              <div className="weather-current-location">
                <h4>{weather.city}</h4>
                <p>{weather.country}</p>
              </div>
              <div className="weather-current-icon">
                {getWeatherIcon(weather.icon)}
              </div>
            </div>

            <div className="weather-current-temp">
              <div className="weather-temp-value">{weather.temperature}°C</div>
              <div className="weather-temp-condition">{weather.condition}</div>
            </div>

            <div className="weather-details">
              <div className="weather-detail">
                <Droplets className="weather-detail-icon humidity" />
                <span className="weather-detail-text">
                  {weather.humidity}% Humidity
                </span>
              </div>
              <div className="weather-detail">
                <Wind className="weather-detail-icon wind" />
                <span className="weather-detail-text">
                  {weather.windSpeed} km/h Wind
                </span>
              </div>
              <div className="weather-detail">
                <Eye className="weather-detail-icon visibility" />
                <span className="weather-detail-text">
                  {weather.visibility} km Visibility
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="weather-forecast">
            <h5 className="weather-forecast-title">5-Day Forecast</h5>
            <div className="weather-forecast-grid">
              {weather.forecast.map((day, index) => (
                <div key={index} className="weather-forecast-day">
                  <div className="weather-forecast-day-name">{day.day}</div>
                  <div className="weather-forecast-icon">
                    {getSmallWeatherIcon(day.icon)}
                  </div>
                  <div className="weather-forecast-high">{day.high}°</div>
                  <div className="weather-forecast-low">{day.low}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div className="weather-empty-state">
          Enter a city name to get weather information
        </div>
      )}
    </div>
  );
}

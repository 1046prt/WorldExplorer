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
    <div className="card p-6 backdrop-blur">
      <div className="flex items-center gap-3 mb-6">
        <Cloud className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
        <div>
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--color-foreground)" }}
          >
            Weather Information
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Current conditions and forecast
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="input flex-1"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {weather && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div
            className="p-6 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {weather.city}
                </h4>
                <p style={{ color: "var(--color-muted-foreground)" }}>
                  {weather.country}
                </p>
              </div>
              {getWeatherIcon(weather.icon)}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className="text-4xl font-bold"
                style={{ color: "var(--color-foreground)" }}
              >
                {weather.temperature}°C
              </div>
              <div
                className="text-lg"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {weather.condition}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" style={{ color: "#3b82f6" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {weather.humidity}% Humidity
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind
                  className="w-4 h-4"
                  style={{ color: "var(--color-muted-foreground)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {weather.windSpeed} km/h Wind
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" style={{ color: "#10b981" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {weather.visibility} km Visibility
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <h5
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--color-foreground)" }}
            >
              5-Day Forecast
            </h5>
            <div className="grid grid-cols-5 gap-2">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg text-center"
                  style={{ backgroundColor: "var(--color-muted)" }}
                >
                  <div
                    className="text-xs font-medium mb-2"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {day.day}
                  </div>
                  <div className="flex justify-center mb-2">
                    {getSmallWeatherIcon(day.icon)}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {day.high}°
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {day.low}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!weather && !loading && (
        <div
          className="text-center py-8"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          Enter a city name to get weather information
        </div>
      )}
    </div>
  );
}

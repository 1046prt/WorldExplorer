"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "@/styles/environment-dashboard.css";
import {
  Leaf,
  Zap,
  TreePine,
  Wind,
  AlertTriangle,
  Droplets,
  Trash2,
  ThermometerSun,
  Globe2,
  TrendingUp,
  TrendingDown,
  Award,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface EnvironmentDataItem {
  country: string;
  value: number;
  status: string;
  flag: string;
}

interface EnvironmentCategory {
  title: string;
  icon: string;
  unit: string;
  description: string;
  data: EnvironmentDataItem[];
}

interface EnvironmentData {
  categories: Record<string, EnvironmentCategory>;
  insights: Record<string, string>;
}

const getIconComponent = (iconName: string) => {
  const icons = {
    Wind,
    Zap,
    AlertTriangle,
    TreePine,
    Droplets,
    Trash2,
    ThermometerSun,
    Globe2,
  };
  return icons[iconName as keyof typeof icons] || Leaf;
};

const getStatusInfo = (status: string) => {
  const statusMap = {
    excellent: {
      color: "text-foreground",
      bgColor: "bg-accent",
      icon: Award,
      label: "Excellent",
    },
    good: {
      color: "text-foreground",
      bgColor: "bg-muted",
      icon: TrendingUp,
      label: "Good",
    },
    medium: {
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      icon: BarChart3,
      label: "Medium",
    },
    moderate: {
      color: "text-muted-foreground",
      bgColor: "bg-accent",
      icon: BarChart3,
      label: "Moderate",
    },
    high: {
      color: "text-muted-foreground",
      bgColor: "bg-accent",
      icon: TrendingUp,
      label: "High",
    },
    unhealthy: {
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      icon: AlertTriangle,
      label: "Unhealthy",
    },
    critical: {
      color: "text-foreground",
      bgColor: "bg-accent",
      icon: AlertTriangle,
      label: "Critical",
    },
    low: {
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      icon: TrendingDown,
      label: "Low",
    },
  };
  return statusMap[status as keyof typeof statusMap] || statusMap.medium;
};

export function EnvironmentDashboard() {
  const [environmentData, setEnvironmentData] =
    useState<EnvironmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("carbonEmissions");

  // Load environment data from JSON file
  useEffect(() => {
    const loadEnvironmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/environment.json");
        if (!response.ok) {
          throw new Error("Failed to load environment data");
        }
        const data: EnvironmentData = await response.json();
        setEnvironmentData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load environment data"
        );
        console.error("Error loading environment data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEnvironmentData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Card className="environment-card">
        <CardContent className="environment-loading">
          <div className="loading-spinner">
            <Leaf className="animate-spin" size={32} />
          </div>
          <h3 className="loading-title">Loading Environment Data...</h3>
          <p className="loading-subtitle">
            Gathering global sustainability metrics
          </p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="environment-card">
        <CardContent className="environment-error">
          <div className="error-icon">
            <AlertTriangle className="text-muted-foreground" size={32} />
          </div>
          <h3 className="error-title">Environment Data Unavailable</h3>
          <p className="error-subtitle">
            Failed to load environmental metrics: {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="error-retry-btn"
          >
            <RefreshCw size={16} /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!environmentData) return null;

  const currentCategory = environmentData.categories[activeCategory];
  const IconComponent = getIconComponent(currentCategory.icon);
  const insight = environmentData.insights[activeCategory];

  return (
    <div className="environment-dashboard">
      <Card className="environment-card">
        <CardHeader className="environment-header">
          <CardTitle className="environment-title">
            <div className="title-icon">
              <Leaf className="text-primary" size={28} />
            </div>
            <div className="title-content">
              <h2>Environment & Sustainability Dashboard</h2>
              <p className="title-subtitle">
                Global environmental metrics and sustainability indicators
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="environment-content">
          {/* Category Navigation */}
          <div className="category-nav">
            {Object.entries(environmentData.categories).map(
              ([key, category]) => {
                const CategoryIcon = getIconComponent(category.icon);
                return (
                  <Button
                    key={key}
                    variant={activeCategory === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(key)}
                    className={`category-btn ${
                      activeCategory === key
                        ? "category-btn-active"
                        : "category-btn-inactive"
                    }`}
                  >
                    <CategoryIcon size={16} />
                    <span className="category-btn-text">{category.title}</span>
                  </Button>
                );
              }
            )}
          </div>

          {/* Current Category Header */}
          <div className="category-header">
            <div className="category-info">
              <div className="category-icon-large">
                <IconComponent size={24} />
              </div>
              <div className="category-details">
                <h3 className="category-title">{currentCategory.title}</h3>
                <p className="category-description">
                  {currentCategory.description}
                </p>
              </div>
            </div>
          </div>

          {/* Data Grid */}
          <div className="data-grid">
            {currentCategory.data.map((item, index) => {
              const statusInfo = getStatusInfo(item.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div key={index} className={`data-item ${statusInfo.bgColor}`}>
                  <div className="data-item-header">
                    <div className="country-info">
                      <span className="country-flag">{item.flag}</span>
                      <span className="country-name">{item.country}</span>
                    </div>
                    <div className={`status-badge ${statusInfo.color}`}>
                      <StatusIcon size={14} />
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="data-item-content">
                    <div className="value-display">
                      <span className="value-number">{item.value}</span>
                      <span className="value-unit">{currentCategory.unit}</span>
                    </div>

                    {/* Progress bar for percentage values */}
                    {(currentCategory.unit.includes("%") ||
                      currentCategory.unit.includes("Score")) && (
                      <div className="progress-container">
                        <div className="progress-bar" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Insights Section */}
          <div className="insights-section">
            <div className="insights-header">
              <div className="insights-icon">
                <BarChart3 className="text-primary" size={20} />
              </div>
              <h4 className="insights-title">Environmental Insights</h4>
            </div>
            <div className="insights-content">
              <p className="insights-text">{insight}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

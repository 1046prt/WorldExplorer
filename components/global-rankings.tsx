"use client";

import { useState, useEffect } from "react";
import "@/styles/global-ranking.css";
import {
  Trophy,
  Building,
  Mountain,
  Users,
  DollarSign,
  Globe,
  Trees,
  PlaneTakeoff,
  Languages,
  Snowflake,
} from "lucide-react";

// Define the icon mapping
const iconMap = {
  Building,
  Snowflake,
  Users,
  DollarSign,
  Globe,
  Trees,
  Mountain,
  Languages,
  PlaneTakeoff,
};

interface RankingItem {
  name: string;
  country: string;
  value: string;
}

interface RankingCategory {
  title: string;
  icon: string;
  data: RankingItem[];
}

interface RankingData {
  [key: string]: RankingCategory;
}

export default function GlobalRankings() {
  const [activeCategory, setActiveCategory] =
    useState<string>("tallestBuildings");
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/rankings.json');
        if (!response.ok) {
          throw new Error('Failed to load ranking data');
        }
        const data = await response.json();
        setRankingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadRankingData();
  }, []);

  if (loading) {
    return (
      <div className="global-card">
        <div className="card-header">
          <h2 className="card-title">
            <Trophy className="icon-trophy" />
            Global Rankings & Top 10 Lists
          </h2>
        </div>
        <div className="card-content">
          <div className="loading-state">Loading rankings data...</div>
        </div>
      </div>
    );
  }

  if (error || !rankingData) {
    return (
      <div className="global-card">
        <div className="card-header">
          <h2 className="card-title">
            <Trophy className="icon-trophy" />
            Global Rankings & Top 10 Lists
          </h2>
        </div>
        <div className="card-content">
          <div className="error-state">
            {error || 'Failed to load ranking data'}
          </div>
        </div>
      </div>
    );
  }

  const currentData = rankingData[activeCategory];
  const IconComponent = iconMap[currentData.icon as keyof typeof iconMap] || Building;

  return (
    <div className="global-card">
      <div className="card-header">
        <h2 className="card-title">
          <Trophy className="icon-trophy" />
          Global Rankings & Top 10 Lists
        </h2>
      </div>

      <div className="card-content">
        <div className="categories">
          {Object.entries(rankingData).map(([key, category]) => {
            const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] || Building;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`category-btn ${
                  activeCategory === key ? "active" : ""
                }`}
              >
                <CategoryIcon className="icon-small" />
                {category.title}
              </button>
            );
          })}
        </div>

        <div className="ranking-list">
          <h3 className="ranking-title">
            <IconComponent className="icon-medium" />
            {currentData.title}
          </h3>

          {currentData.data.map((item, index) => (
            <div key={index} className="ranking-item">
              <div className="ranking-left">
                <div
                  className={`rank-badge ${index === 0 ? "first" : "other"}`}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-country">{item.country}</div>
                </div>
              </div>
              <div className="item-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

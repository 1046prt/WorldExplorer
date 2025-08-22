"use client";

import React, { useState } from "react";
import {
  Globe,
  MapPin,
  GraduationCap,
  Building2,
  Waves,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import "@/styles/quick-navigation.css";
interface QuickNavItem {
  icon: React.ReactNode;
  label: string;
  count: string;
  href: string;
  color: string;
}

function getCategoryColor(colorClass: string): string {
  const colorMap: Record<string, string> = {
    "text-blue-600": "#2563eb",
    "text-red-600": "#dc2626",
    "text-green-600": "#16a34a",
    "text-purple-600": "#9333ea",
    "text-cyan-600": "#0891b2",
  };
  return colorMap[colorClass] || "#6b7280";
}

export function QuickNavigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: QuickNavItem[] = [
    {
      icon: <Globe className="w-5 h-5" />,
      label: "Countries",
      count: "195",
      href: "/browse/countries",
      color: "text-blue-600",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Landmarks",
      count: "1,200+",
      href: "/browse/landmarks",
      color: "text-red-600",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Cities",
      count: "500+",
      href: "/browse/cities",
      color: "text-green-600",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Universities",
      count: "300+",
      href: "/browse/universities",
      color: "text-purple-600",
    },
    {
      icon: <Waves className="w-5 h-5" />,
      label: "Rivers",
      count: "150+",
      href: "/browse/rivers",
      color: "text-cyan-600",
    },
  ];

  const popularSearches = [
    "United States",
    "France",
    "Japan",
    "China",
    "India",
    "Eiffel Tower",
    "Taj Mahal",
    "Great Wall of China",
  ];

  return (
    <div className="card quick-navigation">
      <div className="quick-navigation-header">
        <TrendingUp className="quick-navigation-icon" />
        <h2 className="quick-navigation-title">Quick Navigation</h2>
      </div>

      <div className="navigation-categories">
        {categories.map((category, index) => (
          <div key={index} className="navigation-category">
            <Link href={category.href} className="navigation-category-button">
              <span className="navigation-category-icon">
                {React.cloneElement(category.icon as React.ReactElement)}
              </span>
              <h3 className="navigation-category-title">{category.label}</h3>
              <span className="badge badge-secondary text-xs">
                {category.count}
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className="popular-searches">
        <h3 className="popular-searches-title">Popular Searches</h3>
        <div className="popular-searches-list">
          {popularSearches.map((search, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(search)}`}
              className="popular-search-tag"
            >
              {search}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

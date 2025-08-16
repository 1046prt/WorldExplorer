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
    "Eiffel Tower",
    "Harvard University",
    "Tokyo",
    "Great Wall of China",
    "Amazon River",
    "London",
  ];

  return (
    <div className="card p-6 backdrop-blur">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5" style={{ color: "#ea580c" }} />
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-foreground)" }}
        >
          Quick Navigation
        </h2>
      </div>

      <div className="grid-layout md:grid-cols-5 gap-4 mb-6">
        {categories.map((category, index) => (
          <Link key={index} href={category.href}>
            <div
              className="card p-4 card-hover cursor-pointer text-center"
              onMouseEnter={() => setActiveCategory(category.label)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="mb-2 flex justify-center">
                {React.cloneElement(category.icon as React.ReactElement, {
                  style: { color: getCategoryColor(category.color) },
                })}
              </div>
              <h3
                className="font-semibold text-sm mb-1"
                style={{ color: "var(--color-foreground)" }}
              >
                {category.label}
              </h3>
              <span className="badge badge-secondary text-xs">
                {category.count}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <h3
          className="font-semibold mb-3"
          style={{ color: "var(--color-foreground)" }}
        >
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Link key={index} href={`/search?q=${encodeURIComponent(search)}`}>
              <button className="btn btn-outline btn-sm text-xs">
                {search}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

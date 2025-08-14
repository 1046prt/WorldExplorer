"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin, GraduationCap, Building2, Waves, TrendingUp } from "lucide-react"
import Link from "next/link"

interface QuickNavItem {
  icon: React.ReactNode
  label: string
  count: string
  href: string
  color: string
}

export function QuickNavigation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
  ]

  const popularSearches = [
    "United States",
    "France",
    "Eiffel Tower",
    "Harvard University",
    "Tokyo",
    "Great Wall of China",
    "Amazon River",
    "London",
  ]

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-orange-600" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Navigation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {categories.map((category, index) => (
          <Link key={index} href={category.href}>
            <Card
              className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
              onMouseEnter={() => setActiveCategory(category.label)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="text-center">
                <div className={`${category.color} mb-2 flex justify-center`}>{category.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{category.label}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Link key={index} href={`/search?q=${encodeURIComponent(search)}`}>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                {search}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  )
}

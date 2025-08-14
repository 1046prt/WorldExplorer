"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Building, Mountain, Users, DollarSign } from "lucide-react"

const rankingCategories = {
  tallestBuildings: {
    title: "Tallest Buildings",
    icon: Building,
    data: [
      { name: "Burj Khalifa", country: "UAE", value: "828m", flag: "🇦🇪" },
      { name: "Merdeka 118", country: "Malaysia", value: "679m", flag: "🇲🇾" },
      { name: "Shanghai Tower", country: "China", value: "632m", flag: "🇨🇳" },
      { name: "Abraj Al-Bait", country: "Saudi Arabia", value: "601m", flag: "🇸🇦" },
      { name: "Ping An Finance", country: "China", value: "599m", flag: "🇨🇳" },
    ],
  },
  longestRivers: {
    title: "Longest Rivers",
    icon: Mountain,
    data: [
      { name: "Nile", country: "Egypt/Sudan", value: "6,650km", flag: "🇪🇬" },
      { name: "Amazon", country: "Brazil/Peru", value: "6,400km", flag: "🇧🇷" },
      { name: "Yangtze", country: "China", value: "6,300km", flag: "🇨🇳" },
      { name: "Mississippi", country: "USA", value: "6,275km", flag: "🇺🇸" },
      { name: "Yenisei", country: "Russia", value: "5,539km", flag: "🇷🇺" },
    ],
  },
  largestCities: {
    title: "Largest Cities by Population",
    icon: Users,
    data: [
      { name: "Tokyo", country: "Japan", value: "37.4M", flag: "🇯🇵" },
      { name: "Delhi", country: "India", value: "32.9M", flag: "🇮🇳" },
      { name: "Shanghai", country: "China", value: "28.5M", flag: "🇨🇳" },
      { name: "Dhaka", country: "Bangladesh", value: "22.5M", flag: "🇧🇩" },
      { name: "São Paulo", country: "Brazil", value: "22.4M", flag: "🇧🇷" },
    ],
  },
  gdpRanking: {
    title: "GDP Rankings",
    icon: DollarSign,
    data: [
      { name: "United States", country: "USA", value: "$26.9T", flag: "🇺🇸" },
      { name: "China", country: "China", value: "$17.7T", flag: "🇨🇳" },
      { name: "Japan", country: "Japan", value: "$4.9T", flag: "🇯🇵" },
      { name: "Germany", country: "Germany", value: "$4.3T", flag: "🇩🇪" },
      { name: "India", country: "India", value: "$3.7T", flag: "🇮🇳" },
    ],
  },
}

export function GlobalRankings() {
  const [activeCategory, setActiveCategory] = useState("tallestBuildings")
  const currentData = rankingCategories[activeCategory as keyof typeof rankingCategories]
  const IconComponent = currentData.icon

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Global Rankings & Top 10 Lists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(rankingCategories).map(([key, category]) => (
            <Button
              key={key}
              variant={activeCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(key)}
              className="flex items-center gap-2"
            >
              <category.icon className="w-4 h-4" />
              {category.title}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            {currentData.title}
          </h3>

          {currentData.data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge
                  variant={index === 0 ? "default" : "secondary"}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                >
                  {index + 1}
                </Badge>
                <span className="text-2xl">{item.flag}</span>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.country}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

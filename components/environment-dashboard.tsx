"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, TreePine, Wind, AlertTriangle } from "lucide-react"

const environmentData = {
  carbonEmissions: {
    title: "Carbon Emissions (CO2)",
    icon: Wind,
    unit: "Mt CO2",
    data: [
      { country: "China", value: 10065, flag: "🇨🇳", status: "high" },
      { country: "United States", value: 5416, flag: "🇺🇸", status: "high" },
      { country: "India", value: 2654, flag: "🇮🇳", status: "medium" },
      { country: "Russia", value: 1711, flag: "🇷🇺", status: "medium" },
      { country: "Japan", value: 1162, flag: "🇯🇵", status: "medium" },
    ],
  },
  renewableEnergy: {
    title: "Renewable Energy Usage",
    icon: Zap,
    unit: "% of total",
    data: [
      { country: "Iceland", value: 86.9, flag: "🇮🇸", status: "excellent" },
      { country: "Norway", value: 71.6, flag: "🇳🇴", status: "excellent" },
      { country: "Brazil", value: 45.3, flag: "🇧🇷", status: "good" },
      { country: "Canada", value: 37.3, flag: "🇨🇦", status: "good" },
      { country: "Germany", value: 19.3, flag: "🇩🇪", status: "medium" },
    ],
  },
  airQuality: {
    title: "Air Quality Index (AQI)",
    icon: AlertTriangle,
    unit: "AQI",
    data: [
      { country: "Bangladesh", value: 164, flag: "🇧🇩", status: "unhealthy" },
      { country: "Pakistan", value: 156, flag: "🇵🇰", status: "unhealthy" },
      { country: "India", value: 144, flag: "🇮🇳", status: "unhealthy" },
      { country: "Mongolia", value: 128, flag: "🇲🇳", status: "moderate" },
      { country: "Afghanistan", value: 122, flag: "🇦🇫", status: "moderate" },
    ],
  },
  forestCover: {
    title: "Forest Coverage",
    icon: TreePine,
    unit: "% of land",
    data: [
      { country: "Suriname", value: 98.3, flag: "🇸🇷", status: "excellent" },
      { country: "Micronesia", value: 91.9, flag: "🇫🇲", status: "excellent" },
      { country: "Gabon", value: 90.0, flag: "🇬🇦", status: "excellent" },
      { country: "Seychelles", value: 88.5, flag: "🇸🇨", status: "excellent" },
      { country: "Palau", value: 87.6, flag: "🇵🇼", status: "excellent" },
    ],
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "unhealthy":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function EnvironmentDashboard() {
  const [activeCategory, setActiveCategory] = useState("carbonEmissions")
  const currentData = environmentData[activeCategory as keyof typeof environmentData]
  const IconComponent = currentData.icon

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-500" />
          Environment & Sustainability Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(environmentData).map(([key, category]) => (
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

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            <h3 className="text-lg font-semibold">{currentData.title}</h3>
          </div>

          <div className="space-y-3">
            {currentData.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <div className="font-medium">{item.country}</div>
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className="text-sm text-gray-500">{currentData.unit}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Environmental Insights</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {activeCategory === "carbonEmissions" &&
                "China and the US account for nearly 50% of global CO2 emissions. Transitioning to renewable energy is crucial for climate goals."}
              {activeCategory === "renewableEnergy" &&
                "Nordic countries lead in renewable energy adoption, with Iceland using almost 87% renewable sources, primarily geothermal and hydroelectric."}
              {activeCategory === "airQuality" &&
                "South Asian countries face severe air pollution challenges. Bangladesh has the world's worst air quality with an AQI of 164."}
              {activeCategory === "forestCover" &&
                "Small island nations and tropical countries maintain the highest forest coverage, with Suriname preserving over 98% of its land as forest."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const environmentData = {
  carbonEmissions: {
    title: "Carbon Emissions (CO2)",
    icon: Wind,
    unit: "Mt CO2",
    data: [
      { country: "China", value: 10065, status: "high" },
      { country: "United States", value: 5416, status: "high" },
      { country: "India", value: 2654, status: "medium" },
      { country: "Russia", value: 1711, status: "medium" },
      { country: "Japan", value: 1162, status: "medium" },
      { country: "Germany", value: 702, status: "medium" },
      { country: "Iran", value: 672, status: "medium" },
      { country: "South Korea", value: 659, status: "medium" },
      { country: "Saudi Arabia", value: 621, status: "medium" },
      { country: "Indonesia", value: 590, status: "medium" },
    ],
  },
  renewableEnergy: {
    title: "Renewable Energy Usage",
    icon: Zap,
    unit: "% of total",
    data: [
      { country: "Iceland", value: 86.9, status: "excellent" },
      { country: "Norway", value: 71.6, status: "excellent" },
      { country: "Brazil", value: 45.3, status: "good" },
      { country: "Canada", value: 37.3, status: "good" },
      { country: "Germany", value: 19.3, status: "medium" },
      { country: "Sweden", value: 54.5, status: "good" },
      { country: "Denmark", value: 50.0, status: "good" },
      { country: "Spain", value: 36.1, status: "good" },
      { country: "United Kingdom", value: 33.0, status: "good" },
      { country: "China", value: 27.4, status: "medium" },
    ],
  },
  airQuality: {
    title: "Air Quality Index (AQI)",
    icon: AlertTriangle,
    unit: "AQI",
    data: [
      { country: "Bangladesh", value: 164, status: "unhealthy" },
      { country: "Pakistan", value: 156, status: "unhealthy" },
      { country: "India", value: 144, status: "unhealthy" },
      { country: "Mongolia", value: 128, status: "moderate" },
      { country: "Afghanistan", value: 122, status: "moderate" },
      { country: "Nepal", value: 110, status: "moderate" },
      { country: "Nigeria", value: 105, status: "moderate" },
      { country: "China", value: 95, status: "moderate" },
      { country: "Egypt", value: 90, status: "moderate" },
      { country: "Thailand", value: 82, status: "moderate" },
    ],
  },
  forestCover: {
    title: "Forest Coverage",
    icon: TreePine,
    unit: "% of land",
    data: [
      { country: "Suriname", value: 98.3, status: "excellent" },
      { country: "Micronesia", value: 91.9, status: "excellent" },
      { country: "Gabon", value: 90.0, status: "excellent" },
      { country: "Seychelles", value: 88.5, status: "excellent" },
      { country: "Palau", value: 87.6, status: "excellent" },
      { country: "Finland", value: 73.7, status: "excellent" },
      { country: "Sweden", value: 69.0, status: "excellent" },
      { country: "Japan", value: 68.5, status: "good" },
      { country: "Malaysia", value: 62.3, status: "good" },
      { country: "Bolivia", value: 53.0, status: "good" },
    ],
  },
  waterStress: {
    title: "Water Stress Levels",
    icon: Droplets,
    unit: "% of resources used",
    data: [
      { country: "Qatar", value: 398, status: "critical" },
      { country: "Israel", value: 287, status: "critical" },
      { country: "Iran", value: 132, status: "high" },
      { country: "India", value: 73, status: "high" },
      { country: "United States", value: 41, status: "medium" },
      { country: "Brazil", value: 25, status: "low" },
    ],
  },
  wasteGeneration: {
    title: "Waste Generation",
    icon: Trash2,
    unit: "kg per capita/day",
    data: [
      { country: "United States", value: 2.6, status: "high" },
      { country: "Canada", value: 2.2, status: "high" },
      { country: "Germany", value: 1.9, status: "medium" },
      { country: "India", value: 0.6, status: "low" },
      { country: "Nigeria", value: 0.5, status: "low" },
      { country: "Brazil", value: 1.1, status: "medium" },
    ],
  },
  temperatureChange: {
    title: "Temperature Change",
    icon: ThermometerSun,
    unit: "°C since 1900",
    data: [
      { country: "Arctic Region", value: 2.3, status: "critical" },
      { country: "Russia", value: 1.6, status: "high" },
      { country: "Canada", value: 1.5, status: "high" },
      { country: "India", value: 1.1, status: "medium" },
      { country: "United States", value: 1.2, status: "medium" },
      { country: "Australia", value: 1.4, status: "high" },
    ],
  },
  biodiversity: {
    title: "Biodiversity Index",
    icon: Globe2,
    unit: "Score (0–100)",
    data: [
      { country: "Brazil", value: 94, status: "excellent" },
      { country: "Indonesia", value: 91, status: "excellent" },
      { country: "Congo", value: 89, status: "excellent" },
      { country: "India", value: 80, status: "good" },
      { country: "Australia", value: 77, status: "good" },
      { country: "United States", value: 70, status: "medium" },
    ],
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "good":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "unhealthy":
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "low":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export function EnvironmentDashboard() {
  const [activeCategory, setActiveCategory] = useState("carbonEmissions");
  const currentData =
    environmentData[activeCategory as keyof typeof environmentData];
  const IconComponent = currentData.icon;

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
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{item.country}</div>
                    <Badge
                      className={getStatusColor(item.status)}
                      variant="secondary"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className="text-sm text-gray-500">
                    {currentData.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Environmental Insights
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {activeCategory === "carbonEmissions" &&
                "China and the US account for nearly 50% of global CO2 emissions. Transitioning to renewable energy is crucial for climate goals."}
              {activeCategory === "renewableEnergy" &&
                "Nordic countries lead in renewable energy adoption, with Iceland using almost 87% renewable sources, primarily geothermal and hydroelectric."}
              {activeCategory === "airQuality" &&
                "South Asian countries face severe air pollution challenges. Bangladesh has the world's worst air quality with an AQI of 164."}
              {activeCategory === "forestCover" &&
                "Small island nations and tropical countries maintain the highest forest coverage, with Suriname preserving over 98% of its land as forest."}
              {activeCategory === "waterStress" &&
                "Middle Eastern countries like Qatar and Israel face extreme water scarcity, with usage far exceeding natural replenishment."}
              {activeCategory === "wasteGeneration" &&
                "High-income countries produce the most waste per capita, with the US generating over 2.5 kg per person daily."}
              {activeCategory === "temperatureChange" &&
                "The Arctic is warming more than twice as fast as the global average, with temperature increases over 2°C since 1900."}
              {activeCategory === "biodiversity" &&
                "Tropical regions like Brazil and Indonesia hold the richest biodiversity, but deforestation threatens these ecosystems."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

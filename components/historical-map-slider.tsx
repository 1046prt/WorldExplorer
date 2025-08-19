"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause } from "lucide-react";

const historicalData = [
  {
    year: 1900,
    title: "Colonial Era",
    description: "European colonial empires at their peak",
    mapUrl: "/images/maps/world-1900.png",
  },
  {
    year: 1945,
    title: "Post-WWII",
    description: "New borders after World War II",
    mapUrl: "/images/maps/world-1945.png",
  },
  {
    year: 1991,
    title: "End of Cold War",
    description: "Soviet Union dissolution",
    mapUrl: "/images/maps/world-1991.png",
  },
  {
    year: 2025,
    title: "Modern Day",
    description: "Current world borders",
    mapUrl: "/images/maps/world-2024.png",
  },
];

export function HistoricalMapSlider() {
  const [currentYear, setCurrentYear] = useState([2024]);
  const [isPlaying, setIsPlaying] = useState(false);

  const getCurrentData = () => {
    const year = currentYear[0];
    return historicalData.reduce((prev, curr) =>
      Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    );
  };

  const currentData = getCurrentData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Historical Map Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={currentData.mapUrl || "/placeholder.svg"}
              alt={`World map ${currentData.year}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "/historical-world-map.png" + currentData.year;
              }}
            />
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {currentData.year}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{currentData.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {currentData.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">1900</span>
              <Slider
                value={currentYear}
                onValueChange={setCurrentYear}
                max={2025}
                min={1900}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium">2025</span>
            </div>

            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isPlaying ? "Pause" : "Play"} Timeline
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {historicalData.map((period) => (
              <Button
                key={period.year}
                variant={currentYear[0] === period.year ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentYear([period.year])}
              >
                {period.year}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain, Waves, TreePine, Zap } from "lucide-react";

const natureData = {
  wonders: [
    {
      name: "Mount Everest",
      type: "Mountain",
      country: "Nepal/China",
      height: "8,849m",
      coordinates: "27.9881°N, 86.9250°E",
    },
    {
      name: "Great Barrier Reef",
      type: "Reef",
      country: "Australia",
      area: "344,400 km²",
      coordinates: "18.2871°S, 147.6992°E",
    },
    {
      name: "Amazon Rainforest",
      type: "Forest",
      country: "Brazil/Peru/Colombia",
      area: "5.5M km²",
      coordinates: "3.4653°S, 62.2159°W",
    },
  ],
  volcanoes: [
    {
      name: "Mount Vesuvius",
      country: "Italy",
      lastEruption: "1944",
      type: "Stratovolcano",
      status: "Active",
    },
    {
      name: "Krakatoa",
      country: "Indonesia",
      lastEruption: "2018",
      type: "Caldera",
      status: "Active",
    },
    {
      name: "Yellowstone",
      country: "USA",
      lastEruption: "70,000 years ago",
      type: "Supervolcano",
      status: "Active",
    },
  ],
  migrations: [
    {
      species: "Arctic Tern",
      route: "Arctic to Antarctic",
      distance: "71,000 km",
      season: "Annual",
    },
    {
      species: "Monarch Butterfly",
      route: "Canada to Mexico",
      distance: "4,800 km",
      season: "Fall/Spring",
    },
    {
      species: "Wildebeest",
      route: "Serengeti Circuit",
      distance: "1,800 km",
      season: "Year-round",
    },
  ],
};

export function NatureExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("wonders");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="h-6 w-6" />
          Nature & Exploration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wonders">Natural Wonders</TabsTrigger>
            <TabsTrigger value="volcanoes">Volcanoes</TabsTrigger>
            <TabsTrigger value="migrations">Animal Migration</TabsTrigger>
          </TabsList>

          <TabsContent value="wonders" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {natureData.wonders.map((wonder, index) => (
                <Card
                  key={index}
                  className="border-green-200 bg-green-50 dark:bg-green-950"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      {wonder.type === "Mountain" && (
                        <Mountain className="h-5 w-5" />
                      )}
                      {wonder.type === "Reef" && <Waves className="h-5 w-5" />}
                      {wonder.type === "Forest" && (
                        <TreePine className="h-5 w-5" />
                      )}
                      {wonder.name}
                    </CardTitle>
                    <Badge variant="secondary">{wonder.type}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Location:</strong> {wonder.country}
                      </p>
                      <p>
                        <strong>{wonder.height ? "Height" : "Area"}:</strong>{" "}
                        {wonder.height || wonder.area}
                      </p>
                      <p>
                        <strong>Coordinates:</strong> {wonder.coordinates}
                      </p>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      📍 View on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volcanoes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {natureData.volcanoes.map((volcano, index) => (
                <Card
                  key={index}
                  className="border-red-200 bg-red-50 dark:bg-red-950"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <Zap className="h-5 w-5" />
                      {volcano.name}
                    </CardTitle>
                    <Badge
                      variant={
                        volcano.status === "Active"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {volcano.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Country:</strong> {volcano.country}
                      </p>
                      <p>
                        <strong>Type:</strong> {volcano.type}
                      </p>
                      <p>
                        <strong>Last Eruption:</strong> {volcano.lastEruption}
                      </p>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      🌋 Eruption History
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="migrations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {natureData.migrations.map((migration, index) => (
                <Card
                  key={index}
                  className="border-blue-200 bg-blue-50 dark:bg-blue-950"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-800 dark:text-blue-200">
                      {migration.species}
                    </CardTitle>
                    <Badge variant="secondary">{migration.season}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Route:</strong> {migration.route}
                      </p>
                      <p>
                        <strong>Distance:</strong> {migration.distance}
                      </p>
                      <p>
                        <strong>Season:</strong> {migration.season}
                      </p>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      🦅 Track Migration
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

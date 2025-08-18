"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Landmark,
  GraduationCap,
  Globe,
  MapPin,
  Building,
  Calendar,
} from "lucide-react";
import type { Country } from "@/lib/types";

interface ComprehensiveCountryDataProps {
  countryData: Country;
}

export function ComprehensiveCountryData({
  countryData,
}: ComprehensiveCountryDataProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs">
            Overview
          </TabsTrigger>
          <TabsTrigger value="landmarks" className="text-xs">
            Landmarks
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs">
            Education
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Basic Information
                </CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Capital:
                    </span>
                    <span className="text-sm font-medium">
                      {countryData.capital}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Region:
                    </span>
                    <span className="text-sm font-medium">
                      {countryData.region}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Population:
                    </span>
                    <span className="text-sm font-medium">
                      {countryData.population.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Currency</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="text-sm font-medium">
                      {countryData.currency.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Code:</span>
                    <span className="text-sm font-medium">
                      {countryData.currency.code}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Symbol:
                    </span>
                    <span className="text-sm font-medium">
                      {countryData.currency.symbol}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Languages</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {countryData.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Famous Cities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryData.famousCities.map((city, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold">{city.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {city.whyFamous}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                Famous Landmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {countryData.landmarks.map((landmark, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold">{landmark.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Located in {landmark.city}
                    </p>
                    <p className="text-sm mt-2">{landmark.whyFamous}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Coordinates: {landmark.coordinates.lat},{" "}
                      {landmark.coordinates.lng}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Educational Institutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {countryData.institutions.map((institution, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold">{institution.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {institution.type} • Founded {institution.founded}
                    </p>
                    <p className="text-sm mt-1">
                      Located in {institution.city}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      Global Rank: #{institution.globalRank}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historical Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryData.history.map((event, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">{event.year}</Badge>
                    </div>
                    <div>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

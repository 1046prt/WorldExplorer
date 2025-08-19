import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";
import { LandmarkModal } from "@/components/landmark-modal";
import type { Country } from "@/lib/types";
import Image from "next/image";

interface CountryLandmarksProps {
  country: Country;
}

export function CountryLandmarks({ country }: CountryLandmarksProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Famous Landmarks
        </h2>
        <Badge variant="secondary">{country.landmarks.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {country.landmarks.map((landmark) => (
          <LandmarkModal
            key={landmark.slug}
            landmark={{
              ...landmark,
              country: country.name,
              countryCode: country.iso2,
            }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={landmark.imagePath || "/placeholder.svg"}
                  alt={landmark.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {landmark.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {landmark.city}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {landmark.whyFamous}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {landmark.coordinates.lat.toFixed(4)},{" "}
                    {landmark.coordinates.lng.toFixed(4)}
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </LandmarkModal>
        ))}
      </div>
    </Card>
  );
}

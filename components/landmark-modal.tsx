"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Globe } from "lucide-react"
import type { Landmark } from "@/lib/types"
import Image from "next/image"

interface LandmarkModalProps {
  landmark: Landmark & { country?: string; countryCode?: string }
  children: React.ReactNode
}

export function LandmarkModal({ landmark, children }: LandmarkModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            {landmark.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image src={landmark.imagePath || "/placeholder.svg"} alt={landmark.name} fill className="object-cover" />
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{landmark.city}</Badge>
            {landmark.country && <Badge variant="secondary">{landmark.country}</Badge>}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why it's famous</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{landmark.whyFamous}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">Coordinates</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {landmark.coordinates.lat.toFixed(4)}, {landmark.coordinates.lng.toFixed(4)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm">Location</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{landmark.city}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = `https://www.google.com/maps?q=${landmark.coordinates.lat},${landmark.coordinates.lng}`
                window.open(url, "_blank")
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Maps
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

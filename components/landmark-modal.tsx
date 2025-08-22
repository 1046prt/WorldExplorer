"use client";

import type React from "react";
import { useState } from "react";
import "@/styles/landmark-modal.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, ExternalLink, Globe } from "lucide-react";
import type { Landmark } from "@/lib/types";
import Image from "next/image";

interface LandmarkModalProps {
  landmark: Landmark & { country?: string; countryCode?: string };
  children: React.ReactNode;
}

export function LandmarkModal({ landmark, children }: LandmarkModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="landmark-dialog">
        <DialogHeader>
          <DialogTitle className="landmark-title">
            <MapPin className="landmark-title-icon" />
            {landmark.name}
          </DialogTitle>
        </DialogHeader>

        <div className="landmark-content">
          <div className="landmark-image">
            <Image
              src={landmark.imagePath || "/placeholder.svg"}
              alt={landmark.name}
              fill
              className="landmark-img"
            />
          </div>

          <div className="landmark-badges">
            <span className="badge-outline">{landmark.city}</span>
            {landmark.country && (
              <span className="badge-secondary">{landmark.country}</span>
            )}
          </div>

          <div>
            <h3 className="landmark-subtitle">Why it's famous</h3>
            <p className="landmark-text">{landmark.whyFamous}</p>
          </div>

          <div className="landmark-info">
            <div>
              <div className="landmark-info-header">
                <Globe className="info-icon globe" />
                <span className="info-label">Coordinates</span>
              </div>
              <p className="info-text">
                {landmark.coordinates.lat.toFixed(4)},{" "}
                {landmark.coordinates.lng.toFixed(4)}
              </p>
            </div>
            <div>
              <div className="landmark-info-header">
                <MapPin className="info-icon location" />
                <span className="info-label">Location</span>
              </div>
              <p className="info-text">{landmark.city}</p>
            </div>
          </div>

          <div className="landmark-actions">
            <button
              className="btn-outline btn-sm"
              onClick={() => {
                const url = `https://www.google.com/maps?q=${landmark.coordinates.lat},${landmark.coordinates.lng}`;
                window.open(url, "_blank");
              }}
            >
              <ExternalLink className="btn-icon" />
              View on Maps
            </button>
            <button
              className="btn-outline btn-sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

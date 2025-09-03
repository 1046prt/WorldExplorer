"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ZoomIn } from "lucide-react";
import "@/styles/image-modal.css";

interface ImageModalProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  triggerClassName?: string;
}

export function ImageModal({
  src,
  alt,
  width = 300,
  height = 200,
  className = "",
  triggerClassName = "",
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`image-modal-trigger ${triggerClassName}`}>
          <OptimizedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`image-modal-thumbnail ${className}`}
          />
          <div className="image-modal-overlay">
            <ZoomIn className="zoom-icon" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="image-modal-content">
        <OptimizedImage
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="image-modal-full"
        />
      </DialogContent>
    </Dialog>
  );
}

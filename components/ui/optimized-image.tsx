"use client";

import Image from "next/image";
import { useState } from "react";
import "@/styles/optimized-image.css";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-size='14' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E",
  sizes,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasImageError(true);
    setIsImageLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  const containerClasses = `optimized-image-container ${className}`;
  const imageClasses = `optimized-image ${
    isImageLoading ? "optimized-image-loading" : "optimized-image-loaded"
  } ${hasImageError ? "optimized-image-error" : ""} ${
    fill ? "optimized-image-fill" : ""
  }`;

  // Removed client-side only rendering to improve performance
  return (
    <div className={containerClasses}>
      {isImageLoading && <div className="optimized-image-placeholder" />}
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={imageClasses}
        onLoad={handleImageLoad}
        onError={handleImageError}
        // Optimized loading settings
        loading={priority ? "eager" : "lazy"}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
      />
    </div>
  );
}

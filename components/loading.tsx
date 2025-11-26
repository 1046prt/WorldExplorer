"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
}

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showSpinner?: boolean;
}

export function LoadingState({
  message = "Loading...",
  size = "md",
  className = "",
  showSpinner = true,
}: LoadingStateProps) {
  return (
    <div className={`loading-state ${className}`}>
      {showSpinner && <LoadingSpinner size={size} />}
      <p className="loading-message">{message}</p>
      <style jsx>{`
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 2rem;
          text-align: center;
        }

        .loading-message {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
}

export function LoadingOverlay({
  isLoading,
  message = "Loading...",
  children,
}: LoadingOverlayProps) {
  return (
    <div className="loading-overlay-container">
      {children}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-overlay-content">
            <LoadingSpinner size="lg" />
            <p className="loading-overlay-message">{message}</p>
          </div>
        </div>
      )}
      <style jsx>{`
        .loading-overlay-container {
          position: relative;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .loading-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background: var(--color-surface);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .loading-overlay-message {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        @media (prefers-color-scheme: dark) {
          .loading-overlay {
            background: rgba(0, 0, 0, 0.8);
          }
        }
      `}</style>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({
  className = "",
  width = "100%",
  height = "1rem",
  variant = "text",
}: SkeletonProps) {
  const variantClasses = {
    text: "skeleton-text",
    rectangular: "skeleton-rect",
    circular: "skeleton-circle",
  };

  return (
    <div
      className={`skeleton ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    >
      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--color-surface) 25%,
            var(--color-border) 50%,
            var(--color-surface) 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }

        .skeleton-text {
          border-radius: 4px;
        }

        .skeleton-rect {
          border-radius: 6px;
        }

        .skeleton-circle {
          border-radius: 50%;
        }

        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}

interface CountryCardSkeletonProps {
  count?: number;
}

export function CountryCardSkeleton({ count = 6 }: CountryCardSkeletonProps) {
  return (
    <div className="countries-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="country-card skeleton-card">
          <div className="country-card-header">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton width={40} height={20} />
          </div>
          <Skeleton width="80%" height={24} className="country-name-skeleton" />
          <div className="country-details">
            <div className="country-detail-item">
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton width={100} height={16} />
            </div>
            <div className="country-detail-item">
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton width={60} height={16} />
            </div>
            <Skeleton width={80} height={16} />
          </div>
        </div>
      ))}
      <style jsx>{`
        .skeleton-card {
          pointer-events: none;
        }

        .country-name-skeleton {
          margin: 0.75rem 0;
        }

        .country-detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

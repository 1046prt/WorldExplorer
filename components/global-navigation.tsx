"use client";

import React from "react";
import Link from "next/link";
import { GlobalSearch } from "@/components/global-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";

interface GlobalNavigationProps {
  showBackButton?: boolean;
  backHref?: string;
  currentPage?: string;
}

export function GlobalNavigation({
  showBackButton = false,
  backHref = "/",
  currentPage,
}: GlobalNavigationProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            {showBackButton && (
              <Link
                href={backHref}
                className="header-back-button"
                aria-label="Go back"
              >
                <ArrowLeft className="header-back-icon" />
              </Link>
            )}
            <Link href="/" className="header-brand-link">
              <div className="header-logo">
                <span className="header-logo-emoji">🌍</span>
              </div>
              <div className="header-brand-text">
                <h1 className="header-title">WorldExplorer</h1>
                <p className="header-subtitle">
                  Discover the world's knowledge
                </p>
              </div>
            </Link>
          </div>

          <div className="header-center">
            <GlobalSearch />
          </div>

          <div className="header-right">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

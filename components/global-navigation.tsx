"use client";

import React from "react";
import Link from "next/link";
import { GlobalSearch } from "@/components/global-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface GlobalNavigationProps {
  showBackButton?: boolean;
  backHref?: string;
  currentPage?: string;
}

export function GlobalNavigation({
  showBackButton = false,
  backHref = "/",
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
                <Image
                  src="/images/logo/WORLD.svg"
                  alt="WorldExplorer Logo"
                  className="header-logo-image"
                  width={40}
                  height={40}
                />
              </div>
              <div className="header-brand-text">
                <h1 className="header-title">WorldExplorer</h1>
                <p className="header-subtitle">
                  Discover the world&apos;s knowledge
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

"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import "../styles/not-found.css";
import Footer from "@/components/footer";
import { GlobalNavigation } from "@/components/global-navigation";
export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div>
      <GlobalNavigation showBackButton={true} backHref="/" />
      <div className="notfound-wrapper">
        <div className="notfound-card">
          <Globe className="notfound-icon" />

          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Page Not Found</h2>
          <p className="notfound-text">
            Oops! Looks like the page you’re searching for doesn’t exist.
          </p>

          <div className="notfound-actions">
            <button onClick={() => router.back()} className="btn btn-secondary">
              Go Back
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn btn-primary"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

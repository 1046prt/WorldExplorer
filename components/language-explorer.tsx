"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, Volume2, X } from "lucide-react";
import "@/styles/language-explorer.css";

interface LanguagePhrase {
  language: string;
  country: string;
  phrase: string;
  translation: string;
  flag: string;
}

interface WritingSystem {
  name: string;
  example: string;
  countries: string;
  type: string;
  image: string;
}

interface LanguageData {
  phrases: {
    title: string;
    data: LanguagePhrase[];
  };
  scripts: {
    title: string;
    data: WritingSystem[];
  };
}

export default function LanguageExplorer() {
  const [activeSection, setActiveSection] = useState("phrases");
  const [selectedScript, setSelectedScript] = useState<WritingSystem | null>(
    null
  );
  const [languageData, setLanguageData] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load language data from JSON file
  useEffect(() => {
    const loadLanguageData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/language-explorer.json");
        if (!response.ok) {
          throw new Error("Failed to load language data");
        }
        const data: LanguageData = await response.json();
        setLanguageData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load language data"
        );
        console.error("Error loading language data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLanguageData();
  }, []);

  // Scroll lock effect
  useEffect(() => {
    if (selectedScript) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => document.body.classList.remove("body-lock");
  }, [selectedScript]);

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardContent className="language-explorer-loading">
          <div className="loading-spinner">
            <Languages className="animate-spin" size={32} />
          </div>
          <h3 className="loading-title">Loading Language Data...</h3>
          <p className="loading-subtitle">
            Gathering global language information
          </p>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardContent className="language-explorer-error">
          <div className="error-icon">
            <X className="text-red-500" size={32} />
          </div>
          <h3 className="error-title">Error Loading Data</h3>
          <p className="error-subtitle">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!languageData) {
    return null;
  }

  const currentData = languageData[activeSection as keyof typeof languageData];
  const IconComponent = activeSection === "phrases" ? Volume2 : Languages;

  const renderPhrases = () => (
    <div className="le-grid">
      {(currentData.data as LanguagePhrase[]).map((item, index) => (
        <div key={index} className="le-card">
          <div className="le-phrase-header">
            <div className="le-phrase-left">
              <span className="le-flag">{item.flag}</span>
              <div>
                <div className="le-lang">{item.language}</div>
                <div className="le-country">{item.country}</div>
              </div>
            </div>
          </div>
          <div className="le-phrase-body">
            <div className="le-phrase">{item.phrase}</div>
            <div className="le-translation">{item.translation}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderScripts = () => (
    <>
      <div className="le-grid">
        {(currentData.data as WritingSystem[]).map((item, index) => (
          <div
            key={index}
            className="le-card"
            onClick={() => setSelectedScript(item)}
          >
            <div className="le-script-header">
              <div className="le-lang">{item.name}</div>
              <div className="le-type">{item.type}</div>
            </div>
            <div className="le-preview-chip">Click to Preview</div>
            <div className="le-script-body">
              <div className="le-example">{item.example}</div>

              <div className="le-countries">{item.countries}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedScript &&
        createPortal(
          <div
            className="le-modal-overlay"
            onClick={() => setSelectedScript(null)}
          >
            <div className="le-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="le-modal-close"
                onClick={() => setSelectedScript(null)}
              >
                <X className="le-icon-small" />
              </button>
              <h2 className="le-modal-title">{selectedScript.name}</h2>
              <div className="le-modal-type">{selectedScript.type}</div>
              <div className="le-modal-example">{selectedScript.example}</div>
              <Image
                src={selectedScript.image}
                alt={selectedScript.name}
                width={500}
                height={300}
                className="le-modal-image"
              />
              <p className="le-modal-countries">{selectedScript.countries}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );

  return (
    <div className="language-explorer">
      <Card>
        <CardHeader>
          <CardTitle className="le-header">
            <Languages className="le-icon" />
            Language & Communication Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="le-tabs">
            {Object.entries(languageData).map(([key, section]) => (
              <button
                key={key}
                className={`le-tab-btn ${
                  activeSection === key ? "active" : ""
                }`}
                onClick={() => setActiveSection(key)}
              >
                {key === "phrases" ? (
                  <Volume2 className="le-icon-small" />
                ) : (
                  <Languages className="le-icon-small" />
                )}
                {section.title}
              </button>
            ))}
          </div>

          <div className="le-section">
            <div className="le-section-header">
              <IconComponent className="le-icon-small" />
              <h3>{currentData.title}</h3>
            </div>

            {activeSection === "phrases" && renderPhrases()}
            {activeSection === "scripts" && renderScripts()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

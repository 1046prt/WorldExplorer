"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

const languageData = {
  phrases: {
    title: "Common Phrases",
    icon: Volume2,
    data: [
      {
        language: "Arabic",
        country: "Saudi Arabia",
        phrase: "مرحبا، كيف حالك؟",
        translation: "Hello, how are you?",
        flag: "🇸🇦",
      },
      {
        language: "English",
        country: "Australia",
        phrase: "G'day, how are you?",
        translation: "Hello, how are you?",
        flag: "🇦🇺",
      },
      {
        language: "Portuguese",
        country: "Brazil",
        phrase: "Olá, como você está?",
        translation: "Hello, how are you?",
        flag: "🇧🇷",
      },
      {
        language: "English",
        country: "Canada",
        phrase: "Hello, how are you?",
        translation: "Hello, how are you?",
        flag: "🇨🇦",
      },
      {
        language: "German",
        country: "Germany",
        phrase: "Hallo, wie geht es dir?",
        translation: "Hello, how are you?",
        flag: "🇩🇪",
      },
      {
        language: "Spanish",
        country: "Spain",
        phrase: "Hola, ¿cómo estás?",
        translation: "Hello, how are you?",
        flag: "🇪🇸",
      },
      {
        language: "French",
        country: "France",
        phrase: "Bonjour, comment allez-vous?",
        translation: "Hello, how are you?",
        flag: "🇫🇷",
      },
      {
        language: "English",
        country: "United Kingdom",
        phrase: "Hello, how are you?",
        translation: "Hello, how are you?",
        flag: "🇬🇧",
      },
      {
        language: "Hindi",
        country: "India",
        phrase: "नमस्ते, आप कैसे हैं?",
        translation: "Hello, how are you?",
        flag: "🇮🇳",
      },
      {
        language: "Italian",
        country: "Italy",
        phrase: "Ciao, come stai?",
        translation: "Hello, how are you?",
        flag: "🇮🇹",
      },
      {
        language: "Japanese",
        country: "Japan",
        phrase: "こんにちは、元気ですか？",
        translation: "Hello, how are you?",
        flag: "🇯🇵",
      },
      {
        language: "Russian",
        country: "Russia",
        phrase: "Привет, как дела?",
        translation: "Hello, how are you?",
        flag: "🇷🇺",
      },
      {
        language: "English",
        country: "United States",
        phrase: "Hey, how are you?",
        translation: "Hello, how are you?",
        flag: "🇺🇸",
      },
    ],
  },
  scripts: {
    title: "Writing Systems",
    icon: Languages,
    data: [
      {
        name: "Arabic",
        example: "مرحبا بالعالم",
        countries: "Saudi Arabia, Middle East, North Africa",
        type: "Abjad",
        image: "/images/writting/arabic.png",
      },
      {
        name: "Latin",
        example: "Hello World",
        countries:
          "Australia, Brazil, Canada, Germany, Spain, France, UK, Italy, US",
        type: "Alphabet",
        image: "/images/writting/latin.png",
      },
      {
        name: "Devanagari",
        example: "नमस्ते संसार",
        countries: "India, Nepal",
        type: "Abugida",
        image: "/images/writting/devanagari.png",
      },
      {
        name: "Kanji & Kana",
        example: "こんにちは世界",
        countries: "Japan",
        type: "Syllabary + Logographic",
        image: "/images/writting/japanese.png",
      },
      {
        name: "Cyrillic",
        example: "Привет мир",
        countries: "Russia, Eastern Europe",
        type: "Alphabet",
        image: "/images/writting/russian.png",
      },
      {
        name: "Chinese Characters",
        example: "你好世界",
        countries: "China, Taiwan, Singapore",
        type: "Logographic",
        image: "/images/writting/chinese.png",
      },
    ],
  },
};

export default function LanguageExplorer() {
  const [activeSection, setActiveSection] = useState("phrases");
  const [selectedScript, setSelectedScript] = useState<WritingSystem | null>(
    null
  );

  const currentData = languageData[activeSection as keyof typeof languageData];
  const IconComponent = currentData.icon;

  // Scroll lock effect
  useEffect(() => {
    if (selectedScript) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => document.body.classList.remove("body-lock");
  }, [selectedScript]);

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
              <img
                src={selectedScript.image}
                alt={selectedScript.name}
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
                <section.icon className="le-icon-small" />
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

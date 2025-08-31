"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages, Volume2 } from "lucide-react";
import "@/styles/language-explorer.css";

interface LanguagePhrase {
  language: string;
  country: string;
  phrase: string;
  translation: string;
  flag: string;
}

interface WritingScript {
  name: string;
  example: string;
  countries: string;
  type: string;
}

const languageData = {
  phrases: {
    title: "Common Phrases",
    icon: Volume2,
    data: [
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
        language: "German",
        country: "Germany",
        phrase: "Hallo, wie geht es dir?",
        translation: "Hello, how are you?",
        flag: "🇩🇪",
      },
      {
        language: "Japanese",
        country: "Japan",
        phrase: "こんにちは、元気ですか？",
        translation: "Hello, how are you?",
        flag: "🇯🇵",
      },
      {
        language: "Arabic",
        country: "Saudi Arabia",
        phrase: "مرحبا، كيف حالك؟",
        translation: "Hello, how are you?",
        flag: "🇸🇦",
      },
    ],
  },
  scripts: {
    title: "Writing Systems",
    icon: Languages,
    data: [
      {
        name: "Latin",
        example: "Hello World",
        countries: "Europe, Americas",
        type: "Alphabet",
      },
      {
        name: "Arabic",
        example: "مرحبا بالعالم",
        countries: "Middle East, North Africa",
        type: "Abjad",
      },
      {
        name: "Chinese",
        example: "你好世界",
        countries: "China, Taiwan",
        type: "Logographic",
      },
      {
        name: "Devanagari",
        example: "नमस्ते संसार",
        countries: "India, Nepal",
        type: "Abugida",
      },
      {
        name: "Cyrillic",
        example: "Привет мир",
        countries: "Russia, Eastern Europe",
        type: "Alphabet",
      },
    ],
  },
};

export function LanguageExplorer() {
  const [activeSection, setActiveSection] = useState("phrases");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const currentData = languageData[activeSection as keyof typeof languageData];
  const IconComponent = currentData.icon;

  const playPhrase = (phrase: string) => {
    setPlayingAudio(phrase);
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  const renderPhrases = () => (
    <div className="le-phrases">
      {(currentData.data as LanguagePhrase[]).map((item, index: number) => (
        <Card key={index} className="le-card">
          <CardContent className="le-card-content">
            <div className="le-phrase-header">
              <div className="le-phrase-left">
                <span className="le-flag">{item.flag}</span>
                <div>
                  <div className="le-lang">{item.language}</div>
                  <div className="le-country">{item.country}</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => playPhrase(item.phrase as string)}
                disabled={playingAudio === item.phrase}
                className="le-listen-btn"
              >
                <Volume2 className="le-icon-small" />
                {playingAudio === item.phrase ? "Playing..." : "Listen"}
              </Button>
            </div>
            <div className="le-phrase-body">
              <div className="le-phrase">{item.phrase}</div>
              <div className="le-translation">{item.translation}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Card className="le-wrapper">
      <CardHeader>
        <CardTitle className="le-title">
          <Languages className="le-icon" />
          Language & Communication Explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="le-tabs">
          {Object.entries(languageData).map(([key, section]) => (
            <Button
              key={key}
              variant={activeSection === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(key)}
              className="le-tab-btn"
            >
              <section.icon className="le-icon-small" />
              {section.title}
            </Button>
          ))}
        </div>

        <div className="le-section">
          <div className="le-section-header">
            <IconComponent className="le-icon-small" />
            <h3 className="le-section-title">{currentData.title}</h3>
          </div>

          {activeSection === "phrases" && renderPhrases()}
        </div>
      </CardContent>
    </Card>
  );
}

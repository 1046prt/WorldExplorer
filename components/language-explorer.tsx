"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Languages, Volume2, BookOpen, GitBranch } from "lucide-react"

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
    icon: BookOpen,
    data: [
      { name: "Latin", example: "Hello World", countries: "Europe, Americas", type: "Alphabet" },
      { name: "Arabic", example: "مرحبا بالعالم", countries: "Middle East, North Africa", type: "Abjad" },
      { name: "Chinese", example: "你好世界", countries: "China, Taiwan", type: "Logographic" },
      { name: "Devanagari", example: "नमस्ते संसार", countries: "India, Nepal", type: "Abugida" },
      { name: "Cyrillic", example: "Привет мир", countries: "Russia, Eastern Europe", type: "Alphabet" },
    ],
  },
  families: {
    title: "Language Families",
    icon: GitBranch,
    data: [
      { family: "Indo-European", languages: ["English", "Spanish", "Hindi", "Russian"], speakers: "3.2B" },
      { family: "Sino-Tibetan", languages: ["Mandarin", "Cantonese", "Tibetan"], speakers: "1.4B" },
      { family: "Niger-Congo", languages: ["Swahili", "Yoruba", "Igbo"], speakers: "700M" },
      { family: "Afroasiatic", languages: ["Arabic", "Hebrew", "Amharic"], speakers: "400M" },
      { family: "Trans-New Guinea", languages: ["Enga", "Melpa", "Huli"], speakers: "300M" },
    ],
  },
}

export function LanguageExplorer() {
  const [activeSection, setActiveSection] = useState("phrases")
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const currentData = languageData[activeSection as keyof typeof languageData]
  const IconComponent = currentData.icon

  const playPhrase = (phrase: string) => {
    setPlayingAudio(phrase)
    // Simulate audio playback
    setTimeout(() => setPlayingAudio(null), 2000)
  }

  const renderPhrases = () => (
    <div className="space-y-4">
      {currentData.data.map((item: any, index: number) => (
        <Card
          key={index}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.flag}</span>
                <div>
                  <div className="font-semibold">{item.language}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.country}</div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => playPhrase(item.phrase)}
                disabled={playingAudio === item.phrase}
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                {playingAudio === item.phrase ? "Playing..." : "Listen"}
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-lg font-medium">{item.phrase}</div>
              <div className="text-gray-600 dark:text-gray-400 italic">{item.translation}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderScripts = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {currentData.data.map((script: any, index: number) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{script.name}</h4>
                <Badge variant="outline">{script.type}</Badge>
              </div>
              <div className="text-2xl font-bold text-center py-4 bg-gray-50 dark:bg-gray-800 rounded">
                {script.example}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Used in: {script.countries}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFamilies = () => (
    <div className="space-y-4">
      {currentData.data.map((family: any, index: number) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lg">{family.family}</h4>
              <Badge variant="secondary">{family.speakers} speakers</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {family.languages.map((lang: string, langIndex: number) => (
                <Badge key={langIndex} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-500" />
          Language & Communication Explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(languageData).map(([key, section]) => (
            <Button
              key={key}
              variant={activeSection === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveSection(key)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.title}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IconComponent className="w-5 h-5" />
            <h3 className="text-lg font-semibold">{currentData.title}</h3>
          </div>

          {activeSection === "phrases" && renderPhrases()}
          {activeSection === "scripts" && renderScripts()}
          {activeSection === "families" && renderFamilies()}
        </div>
      </CardContent>
    </Card>
  )
}

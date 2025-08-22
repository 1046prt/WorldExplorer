"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, RefreshCw } from "lucide-react";
import "/styles/random-fact-generator.css";

interface RandomFact {
  fact: string;
  category: string;
  country?: string;
}

const facts: RandomFact[] = [
  {
    fact: "The Great Wall of China is not visible from space with the naked eye.",
    category: "Geography",
    country: "China",
  },
  {
    fact: "Australia is the only country that is also a continent.",
    category: "Geography",
    country: "Australia",
  },
  {
    fact: "The Amazon rainforest produces about 20% of the world's oxygen.",
    category: "Environment",
    country: "Brazil",
  },
  {
    fact: "Iceland runs almost entirely on renewable energy.",
    category: "Environment",
    country: "Iceland",
  },
  {
    fact: "Japan has more than 6,800 islands.",
    category: "Geography",
    country: "Japan",
  },
  {
    fact: "The Netherlands is the most densely populated country in Europe.",
    category: "Demographics",
    country: "Netherlands",
  },
  {
    fact: "Switzerland has four official languages.",
    category: "Culture",
    country: "Switzerland",
  },
  {
    fact: "Canada has the longest coastline in the world.",
    category: "Geography",
    country: "Canada",
  },
];

export function RandomFactGenerator() {
  const [currentFact, setCurrentFact] = useState<RandomFact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomFact = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setCurrentFact(facts[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    generateRandomFact();
  }, []);

  return (
    <Card className="rf-card">
      <CardHeader>
        <CardTitle className="rf-title">
          <Lightbulb className="rf-icon" />
          Random World Fact
        </CardTitle>
      </CardHeader>
      <CardContent className="rf-content">
        {isLoading ? (
          <div className="rf-loading">
            <div className="spinner spinner-lg"></div>
          </div>
        ) : currentFact ? (
          <div className="rf-fact">
            <p className="rf-fact-text">{currentFact.fact}</p>
            <div className="rf-badges">
              <Badge variant="secondary">{currentFact.category}</Badge>
              {currentFact.country && (
                <Badge variant="outline">{currentFact.country}</Badge>
              )}
            </div>
          </div>
        ) : null}

        <Button
          onClick={generateRandomFact}
          disabled={isLoading}
          className="rf-button"
          variant="outline"
        >
          <RefreshCw className={`rf-refresh ${isLoading ? "spin" : ""}`} />
          {isLoading ? "Loading..." : "New Fact"}
        </Button>
      </CardContent>
    </Card>
  );
}

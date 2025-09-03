"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "@/styles/interactive-games.css";
import {
  Gamepad2,
  Brain,
  Zap,
  Target,
  Clock,
  Star,
  Trophy,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

// --- Game Definitions ---
type GameKey = "memoryMatch" | "reflexChallenge" | "numberHunt";

const games = {
  memoryMatch: {
    title: "Memory Match",
    icon: Brain,
    description: "Remember and match the sequence of colors",
    difficulty: "Medium",
    timeLimit: 90,
  },
  reflexChallenge: {
    title: "Reflex Challenge",
    icon: Zap,
    description: "Click the highlighted target as fast as you can",
    difficulty: "Hard",
    timeLimit: 45,
  },
  numberHunt: {
    title: "Number Hunt",
    icon: Target,
    description: "Find and click numbers in ascending order",
    difficulty: "Easy",
    timeLimit: 60,
  },
} as const;

// Generate random colors for memory game
const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

// Generate random numbers for number hunt
const generateRandomNumbers = (count = 12) => {
  const numbers = Array.from({ length: count }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5);
};

export function InteractiveGames() {
  const [activeGame, setActiveGame] = useState<GameKey>("memoryMatch");
  const [gameState, setGameState] = useState({
    score: 0,
    level: 1,
    lives: 3,
    timeLeft: 60,
    isPlaying: false,
    isPaused: false,
    combo: 0,
    bestScore: 0,
  });

  // Memory Match specific state
  const [memoryState, setMemoryState] = useState({
    sequence: [] as string[],
    playerSequence: [] as string[],
    showSequence: false,
    canClick: false,
    currentStep: 0,
  });

  // Reflex Challenge specific state
  const [reflexState, setReflexState] = useState({
    activeTarget: -1,
    targets: Array(9).fill(false),
    reactionTime: 0,
    startTime: 0,
    waiting: false,
  });

  // Number Hunt specific state
  const [numberState, setNumberState] = useState({
    numbers: generateRandomNumbers(),
    nextNumber: 1,
    foundNumbers: [] as number[],
  });

  // End Game
  const endGame = () => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      bestScore: Math.max(prev.bestScore, prev.score),
    }));
  };

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isPlaying && !gameState.isPaused && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    if (gameState.timeLeft === 0) {
      endGame();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.timeLeft]);

  // Start Game
  const startGame = () => {
    const currentGameConfig = games[activeGame];
    setGameState({
      score: 0,
      level: 1,
      lives: 3,
      timeLeft: currentGameConfig.timeLimit,
      isPlaying: true,
      isPaused: false,
      combo: 0,
      bestScore: Math.max(gameState.bestScore, gameState.score),
    });

    // Initialize game-specific states
    if (activeGame === "memoryMatch") {
      generateSequence(1);
    } else if (activeGame === "reflexChallenge") {
      setReflexState({
        activeTarget: -1,
        targets: Array(9).fill(false),
        reactionTime: 0,
        startTime: 0,
        waiting: false,
      });
      setTimeout(() => activateRandomTarget(), 1000 + Math.random() * 2000);
    } else if (activeGame === "numberHunt") {
      setNumberState({
        numbers: generateRandomNumbers(),
        nextNumber: 1,
        foundNumbers: [] as number[],
      });
    }
  };

  // Pause / Resume
  const togglePause = () => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  // Reset Game
  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      score: 0,
      level: 1,
      lives: 3,
      timeLeft: games[activeGame].timeLimit,
      combo: 0,
    }));
    startGame();
  };

  // Memory Match Logic
  const generateSequence = (level: number) => {
    const newSequence = Array.from(
      { length: level + 2 },
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setMemoryState({
      sequence: newSequence,
      playerSequence: [],
      showSequence: true,
      canClick: false,
      currentStep: 0,
    });

    // Show sequence
    setTimeout(() => {
      setMemoryState((prev) => ({
        ...prev,
        showSequence: false,
        canClick: true,
      }));
    }, (level + 2) * 800 + 500);
  };

  const handleColorClick = (color: string) => {
    if (!memoryState.canClick || gameState.isPaused) return;

    const newPlayerSequence = [...memoryState.playerSequence, color];
    const isCorrect = color === memoryState.sequence[memoryState.currentStep];

    if (isCorrect) {
      if (newPlayerSequence.length === memoryState.sequence.length) {
        // Level completed
        const points = gameState.level * 50 + gameState.combo * 10;
        setGameState((prev) => ({
          ...prev,
          score: prev.score + points,
          level: prev.level + 1,
          combo: prev.combo + 1,
        }));
        setTimeout(() => generateSequence(gameState.level + 1), 1000);
      } else {
        setMemoryState((prev) => ({
          ...prev,
          playerSequence: newPlayerSequence,
          currentStep: prev.currentStep + 1,
        }));
      }
    } else {
      // Wrong answer
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        combo: 0,
      }));

      if (gameState.lives <= 1) {
        endGame();
      } else {
        setTimeout(() => generateSequence(gameState.level), 1000);
      }
    }
  };

  // Reflex Challenge Logic
  const activateRandomTarget = () => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    const randomIndex = Math.floor(Math.random() * 9);
    const newTargets = Array(9).fill(false);
    newTargets[randomIndex] = true;

    setReflexState((prev) => ({
      ...prev,
      activeTarget: randomIndex,
      targets: newTargets,
      startTime: Date.now(),
      waiting: false,
    }));

    // Deactivate after 2 seconds if not clicked
    setTimeout(() => {
      setReflexState((prev) => {
        if (prev.activeTarget === randomIndex) {
          return {
            ...prev,
            activeTarget: -1,
            targets: Array(9).fill(false),
          };
        }
        return prev;
      });
    }, 2000);
  };

  const handleTargetClick = (index: number) => {
    if (
      !gameState.isPlaying ||
      gameState.isPaused ||
      index !== reflexState.activeTarget
    )
      return;

    const reactionTime = Date.now() - reflexState.startTime;
    let points = Math.max(100 - Math.floor(reactionTime / 10), 10);

    if (reactionTime < 300) points += 50; // Bonus for fast reaction

    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      combo: prev.combo + 1,
    }));

    setReflexState((prev) => ({
      ...prev,
      activeTarget: -1,
      targets: Array(9).fill(false),
      reactionTime,
    }));

    // Schedule next target
    setTimeout(() => activateRandomTarget(), 500 + Math.random() * 1500);
  };

  // Number Hunt Logic
  const handleNumberClick = (number: number) => {
    if (!gameState.isPlaying || gameState.isPaused) return;

    if (number === numberState.nextNumber) {
      const points = 20 + gameState.combo * 5;
      setGameState((prev) => ({
        ...prev,
        score: prev.score + points,
        combo: prev.combo + 1,
      }));

      setNumberState((prev) => ({
        ...prev,
        nextNumber: prev.nextNumber + 1,
        foundNumbers: [...prev.foundNumbers, number],
      }));

      if (numberState.nextNumber === 12) {
        // Level completed, generate new numbers
        setNumberState({
          numbers: generateRandomNumbers(),
          nextNumber: 1,
          foundNumbers: [] as number[],
        });
        setGameState((prev) => ({
          ...prev,
          level: prev.level + 1,
          timeLeft: prev.timeLeft + 15, // Bonus time
        }));
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        combo: 0,
      }));

      if (gameState.lives <= 1) {
        endGame();
      }
    }
  };

  // --- Game Renderers ---
  const renderMemoryMatch = () => {
    if (!gameState.isPlaying) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Watch the sequence, then repeat it!
          </p>
          <Button onClick={startGame} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Memory Match
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {memoryState.showSequence
              ? "Watch the sequence..."
              : memoryState.canClick
              ? `Click color ${memoryState.currentStep + 1}`
              : "Get ready..."}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-16 h-16 rounded-lg transition-all duration-200 ${color} 
                ${
                  memoryState.showSequence &&
                  memoryState.sequence[memoryState.currentStep] === color
                    ? "ring-4 ring-white scale-110"
                    : ""
                } 
                ${
                  memoryState.canClick
                    ? "hover:scale-105"
                    : "cursor-not-allowed opacity-70"
                }`}
              onClick={() => handleColorClick(color)}
              disabled={!memoryState.canClick}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderReflexChallenge = () => {
    if (!gameState.isPlaying) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Click the highlighted targets as fast as you can!
          </p>
          <Button onClick={startGame} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Reflex Challenge
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {reflexState.reactionTime > 0
              ? `Last reaction: ${reflexState.reactionTime}ms`
              : "Wait for the target to light up..."}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {reflexState.targets.map((isActive, index) => (
            <button
              key={index}
              className={`w-16 h-16 rounded-full transition-all duration-100
                ${
                  isActive
                    ? "bg-red-500 shadow-lg scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              onClick={() => handleTargetClick(index)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderNumberHunt = () => {
    if (!gameState.isPlaying) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Find numbers 1-12 in ascending order!
          </p>
          <Button onClick={startGame} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start Number Hunt
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Find number: <strong>{numberState.nextNumber}</strong>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          {numberState.numbers.map((number, index) => (
            <button
              key={index}
              className={`w-12 h-12 rounded-lg font-bold transition-all duration-200
                ${
                  numberState.foundNumbers.includes(number)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : number === numberState.nextNumber
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              onClick={() => handleNumberClick(number)}
              disabled={numberState.foundNumbers.includes(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Main render function
  const renderActiveGame = () => {
    if (
      gameState.timeLeft === 0 ||
      (gameState.lives === 0 && gameState.isPlaying)
    ) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h3 className="text-xl font-bold mb-2">Game Over!</h3>
          <p className="text-gray-600 mb-2">
            Final Score: <strong>{gameState.score}</strong>
          </p>
          <p className="text-gray-600 mb-4">
            Level Reached: <strong>{gameState.level}</strong>
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={startGame}>Play Again</Button>
            <Button
              variant="outline"
              onClick={() => setActiveGame("memoryMatch")}
            >
              Choose Game
            </Button>
          </div>
        </div>
      );
    }

    switch (activeGame) {
      case "memoryMatch":
        return renderMemoryMatch();
      case "reflexChallenge":
        return renderReflexChallenge();
      case "numberHunt":
        return renderNumberHunt();
      default:
        return null;
    }
  };

  const currentGame = games[activeGame];
  const IconComponent = currentGame.icon;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-purple-500" />
            Interactive Mini Games
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(games).map(([key, game]) => (
              <Button
                key={key}
                variant={activeGame === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveGame(key as GameKey)}
                className="flex items-center gap-2"
                disabled={gameState.isPlaying}
              >
                <game.icon className="w-4 h-4" />
                {game.title}
              </Button>
            ))}
          </div>

          {/* Game Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">{currentGame.title}</h3>
            </div>
            <Badge variant="outline">{currentGame.difficulty}</Badge>
          </div>

          <p className="text-gray-600">{currentGame.description}</p>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium">{gameState.timeLeft}s</div>
                <div className="text-xs text-gray-500">Time</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">{gameState.score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Target className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">L{gameState.level}</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Trophy className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-sm font-medium">{gameState.bestScore}</div>
                <div className="text-xs text-gray-500">Best</div>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          {gameState.isPlaying && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">Lives:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < gameState.lives ? "bg-red-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {gameState.combo > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    Combo x{gameState.combo}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {gameState.isPaused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                  {gameState.isPaused ? "Resume" : "Pause"}
                </Button>
                <Button variant="outline" size="sm" onClick={resetGame}>
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          )}

          {/* Active Game */}
          <div className="min-h-[300px]">{renderActiveGame()}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InteractiveGames;

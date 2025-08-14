"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, Flag, MapPin, Clock } from "lucide-react"
import Image from "next/image"

interface QuizQuestion {
  id: string
  type: "flag" | "capital" | "landmark"
  question: string
  options: string[]
  correct: number
  image?: string
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    type: "flag",
    question: "Which country does this flag belong to?",
    options: ["France", "Netherlands", "Russia", "Luxembourg"],
    correct: 0,
    image: "/images/flags/france.png",
    explanation: "The French tricolor consists of blue, white, and red vertical stripes.",
  },
  {
    id: "2",
    type: "capital",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
    explanation: "Canberra is the capital city of Australia, located between Sydney and Melbourne.",
  },
  {
    id: "3",
    type: "landmark",
    question: "In which country is Machu Picchu located?",
    options: ["Chile", "Peru", "Bolivia", "Ecuador"],
    correct: 1,
    image: "/images/landmarks/machu-picchu.png",
    explanation: "Machu Picchu is an ancient Incan citadel located in Peru's Andes Mountains.",
  },
  {
    id: "4",
    type: "flag",
    question: "Which country's flag is this?",
    options: ["Japan", "Bangladesh", "Palau", "South Korea"],
    correct: 0,
    image: "/images/flags/japan.png",
    explanation: "Japan's flag features a red circle (representing the sun) on a white background.",
  },
  {
    id: "5",
    type: "capital",
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correct: 3,
    explanation: "Ottawa is the capital city of Canada, located in the province of Ontario.",
  },
]

export function QuizSystem() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // Auto-submit when time runs out
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, showResult])

  const startQuiz = () => {
    setIsActive(true)
    setTimeLeft(30)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setIsActive(false)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
      setIsActive(true)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizComplete(false)
    setTimeLeft(30)
    setIsActive(false)
  }

  const getQuizIcon = (type: string) => {
    switch (type) {
      case "flag":
        return <Flag className="w-5 h-5" />
      case "capital":
        return <MapPin className="w-5 h-5" />
      case "landmark":
        return <Trophy className="w-5 h-5" />
      default:
        return <Trophy className="w-5 h-5" />
    }
  }

  if (quizComplete) {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          <div className="mb-6">
            <Badge
              variant={score >= 4 ? "default" : score >= 2 ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {score >= 4 ? "Excellent!" : score >= 2 ? "Good Job!" : "Keep Learning!"}
            </Badge>
          </div>
          <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {getQuizIcon(question.type)}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Geography Quiz</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>
              {timeLeft}s
            </span>
          </div>
          <Badge variant="outline">Score: {score}</Badge>
        </div>
      </div>

      {!isActive && !showResult && (
        <div className="text-center py-8">
          <Button onClick={startQuiz} className="bg-green-600 hover:bg-green-700">
            Start Quiz
          </Button>
        </div>
      )}

      {isActive && !showResult && (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{question.question}</h4>
            {question.image && (
              <div className="relative w-48 h-32 mx-auto mb-6 rounded-lg overflow-hidden">
                <Image src={question.image || "/placeholder.svg"} alt="Quiz question" fill className="object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index)}
                className="p-4 h-auto text-left justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <span className="font-medium mr-3 text-blue-600 dark:text-blue-400">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className="space-y-6">
          <div className="text-center">
            <div
              className={`text-lg font-bold mb-2 ${
                selectedAnswer === question.correct ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedAnswer === question.correct ? "✅ Correct!" : "❌ Incorrect"}
            </div>
            {selectedAnswer !== question.correct && (
              <p className="text-gray-600 dark:text-gray-400">
                The correct answer was: <strong>{question.options[question.correct]}</strong>
              </p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Did you know?</strong> {question.explanation}
            </p>
          </div>

          <div className="text-center">
            <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

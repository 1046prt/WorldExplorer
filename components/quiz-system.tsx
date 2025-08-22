"use client";

import { useState, useEffect } from "react";
import { Trophy, RefreshCw, Flag, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import "/styles/quiz-system.css";
interface QuizQuestion {
  id: string;
  type: "flag" | "capital" | "landmark";
  question: string;
  options: string[];
  correct: number;
  image?: string;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    type: "flag",
    question: "Which country does this flag belong to?",
    options: ["France", "Netherlands", "Russia", "Luxembourg"],
    correct: 0,
    image: "/images/flags/france.png",
    explanation:
      "The French tricolor consists of blue, white, and red vertical stripes.",
  },
  {
    id: "2",
    type: "capital",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
    explanation:
      "Canberra is the capital city of Australia, located between Sydney and Melbourne.",
  },
  {
    id: "3",
    type: "landmark",
    question: "In which country is Machu Picchu located?",
    options: ["Chile", "Peru", "Bolivia", "Ecuador"],
    correct: 1,
    image: "/images/landmarks/machu-picchu.png",
    explanation:
      "Machu Picchu is an ancient Incan citadel located in Peru's Andes Mountains.",
  },
  {
    id: "4",
    type: "flag",
    question: "Which country's flag is this?",
    options: ["Japan", "Bangladesh", "Palau", "South Korea"],
    correct: 0,
    image: "/images/flags/japan.png",
    explanation:
      "Japan's flag features a red circle (representing the sun) on a white background.",
  },
  {
    id: "5",
    type: "capital",
    question: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correct: 3,
    explanation:
      "Ottawa is the capital city of Canada, located in the province of Ontario.",
  },
];

export function QuizSystem() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult]);

  const startQuiz = () => {
    setIsActive(true);
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setIsActive(false);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
    setTimeLeft(30);
    setIsActive(false);
  };

  const getQuizIcon = (type: string) => {
    switch (type) {
      case "flag":
        return <Flag className="icon" />;
      case "capital":
        return <MapPin className="icon" />;
      case "landmark":
        return <Trophy className="icon" />;
      default:
        return <Trophy className="icon" />;
    }
  };

  if (quizComplete) {
    return (
      <div className="card quiz-card gradient-success">
        <div className="quiz-center">
          <Trophy className="quiz-trophy" />
          <h3 className="quiz-title">Quiz Complete!</h3>
          <p className="quiz-subtitle">
            You scored {score} out of {quizQuestions.length}
          </p>
          <div className="quiz-badge">
            <span
              className={`badge ${
                score >= 4
                  ? "badge-success"
                  : score >= 2
                  ? "badge-neutral"
                  : "badge-danger"
              }`}
            >
              {score >= 4
                ? "Excellent!"
                : score >= 2
                ? "Good Job!"
                : "Keep Learning!"}
            </span>
          </div>
          <button onClick={resetQuiz} className="btn btn-primary">
            <RefreshCw className="icon-sm" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="card quiz-card">
      <div className="quiz-header">
        <div className="quiz-info">
          {getQuizIcon(question.type)}
          <div>
            <h3 className="quiz-heading">Geography Quiz</h3>
            <p className="quiz-progress">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
          </div>
        </div>
        <div className="quiz-status">
          <div className="quiz-timer">
            <Clock className="icon-sm text-warning" />
            <span
              className={`quiz-time ${
                timeLeft <= 10 ? "text-danger" : "text-muted"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
          <span className="badge outline">Score: {score}</span>
        </div>
      </div>

      {!isActive && !showResult && (
        <div className="quiz-center">
          <button onClick={startQuiz} className="btn btn-success">
            Start Quiz
          </button>
        </div>
      )}

      {isActive && !showResult && (
        <div className="quiz-body">
          <div className="quiz-question">
            <h4 className="quiz-question-text">{question.question}</h4>
            {question.image && (
              <div className="quiz-image">
                <Image
                  src={question.image || "/placeholder.svg"}
                  alt="Quiz question"
                  fill
                  className="img-cover"
                />
              </div>
            )}
          </div>

          <div className="quiz-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="btn btn-option"
              >
                <span className="option-label">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className="quiz-body">
          <div className="quiz-result">
            <div
              className={`quiz-feedback ${
                selectedAnswer === question.correct
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {selectedAnswer === question.correct
                ? "✅ Correct!"
                : "❌ Incorrect"}
            </div>
            {selectedAnswer !== question.correct && (
              <p className="quiz-answer">
                The correct answer was:{" "}
                <strong>{question.options[question.correct]}</strong>
              </p>
            )}
          </div>

          <div className="quiz-explanation">
            <p>
              <strong>Did you know?</strong> {question.explanation}
            </p>
          </div>

          <div className="quiz-center">
            <button onClick={nextQuestion} className="btn btn-primary">
              {currentQuestion < quizQuestions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

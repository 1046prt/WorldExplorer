"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  RefreshCw,
  Flag,
  MapPin,
  Clock,
  Pause,
  Play,
  Star,
  Award,
  Target,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import "@/styles/quiz-system.css";
interface QuizQuestion {
  id: string;
  type: "flag" | "capital" | "landmark";
  question: string;
  options: string[];
  correct: number;
  image?: string;
  explanation: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

export function QuizSystem() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Load quiz data from JSON file
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/quiz.json");
        if (!response.ok) {
          throw new Error("Failed to load quiz data");
        }
        const data: QuizData = await response.json();
        setQuizQuestions(data.questions);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load quiz data"
        );
        console.error("Error loading quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  const nextQuestion = React.useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
      setAutoAdvance(false);
      setIsPaused(false);
    } else {
      setQuizComplete(true);
    }
  }, [currentQuestion, quizQuestions.length]);

  const handleAnswer = React.useCallback(
    (answerIndex: number) => {
      setSelectedAnswer(answerIndex);
      setShowResult(true);
      setIsActive(false);

      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }
    },
    [currentQuestion, score, quizQuestions]
  );

  const handleTimeExpired = React.useCallback(() => {
    setSelectedAnswer(-1); // -1 indicates time expired/skipped
    setShowResult(true);
    setIsActive(false);
    setAutoAdvance(true);
    // No score increment for expired time
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResult && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeExpired();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult, isPaused, handleTimeExpired]);

  // Auto-advance to next question when time expires
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (autoAdvance && showResult) {
      timeout = setTimeout(() => {
        nextQuestion();
      }, 2000); // Wait 2 seconds before auto-advancing
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [autoAdvance, showResult, nextQuestion]);

  const startQuiz = () => {
    setIsActive(true);
    setTimeLeft(30);
    setIsPaused(false);
  };

  const pauseQuiz = () => {
    setIsPaused(true);
  };

  const resumeQuiz = () => {
    setIsPaused(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
    setTimeLeft(30);
    setIsActive(false);
    setAutoAdvance(false);
    setIsPaused(false);
  };

  const getQuizIcon = (type: string) => {
    switch (type) {
      case "flag":
        return <Flag className="quiz-system-icon" />;
      case "capital":
        return <MapPin className="quiz-system-icon" />;
      case "landmark":
        return <Trophy className="quiz-system-icon" />;
      default:
        return <Trophy className="quiz-system-icon" />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="card quiz-card">
        <div className="quiz-center">
          <div className="loading-spinner">
            <Clock className="quiz-system-icon animate-spin" />
          </div>
          <h3 className="quiz-heading">Loading Quiz...</h3>
          <p className="quiz-progress">Preparing geography questions for you</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card quiz-card">
        <div className="quiz-center">
          <div className="error-icon">
            <Trophy className="quiz-system-icon text-danger" />
          </div>
          <h3 className="quiz-heading">Quiz Unavailable</h3>
          <p className="quiz-progress">
            Failed to load quiz questions: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            <RefreshCw className="icon-sm" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // No questions available
  if (quizQuestions.length === 0) {
    return (
      <div className="card quiz-card">
        <div className="quiz-center">
          <div className="error-icon">
            <Flag className="quiz-system-icon text-warning" />
          </div>
          <h3 className="quiz-heading">No Questions Available</h3>
          <p className="quiz-progress">No quiz questions found</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const isExcellent = score >= 15;
    const isGood = score >= 10;
    const isAverage = score >= 6;

    return (
      <div className="quiz-completion-container">
        <div className="quiz-completion-card">
          {/* Animated Trophy Section */}
          <div className="completion-header">
            <div className="trophy-animation">
              {isExcellent ? (
                <Trophy className="trophy-gold" />
              ) : isGood ? (
                <Award className="trophy-silver" />
              ) : (
                <Target className="trophy-bronze" />
              )}
            </div>
            <div className="completion-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`star ${
                    i < Math.ceil((score / quizQuestions.length) * 5)
                      ? "star-filled"
                      : "star-empty"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="completion-content">
            <h2 className="completion-title">
              {isExcellent
                ? "🎉 Outstanding!"
                : isGood
                ? "🌟 Well Done!"
                : isAverage
                ? "👍 Good Effort!"
                : "📚 Keep Learning!"}
            </h2>

            <div className="score-display">
              <div className="score-circle">
                <div className="score-number">{score}</div>
                <div className="score-total">/ {quizQuestions.length}</div>
              </div>
              <div className="percentage-badge">
                <span
                  className={`percentage ${
                    isExcellent
                      ? "excellent"
                      : isGood
                      ? "good"
                      : isAverage
                      ? "average"
                      : "poor"
                  }`}
                >
                  {percentage}%
                </span>
              </div>
            </div>

            <div className="achievement-message">
              <CheckCircle className="check-icon" />
              <p>
                {isExcellent
                  ? "Amazing! You're a geography expert! 🌍"
                  : isGood
                  ? "Great job! You know your way around the world! 🗺️"
                  : isAverage
                  ? "Good work! There's still more to explore! 🧭"
                  : "Don't give up! Every expert was once a beginner! 💪"}
              </p>
            </div>

            {/* Performance Breakdown */}
            <div className="performance-stats">
              <div className="stat-item">
                <span className="stat-label">Correct Answers</span>
                <span className="stat-value correct">{score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Incorrect/Skipped</span>
                <span className="stat-value incorrect">
                  {quizQuestions.length - score}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Accuracy</span>
                <span className="stat-value accuracy">{percentage}%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="completion-actions">
              <button onClick={resetQuiz} className="btn btn-primary btn-large">
                <RefreshCw className="icon-sm" />
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/browse/countries")}
                className="btn btn-secondary btn-large"
              >
                <Flag className="icon-sm" />
                Explore Countries
              </button>
            </div>
          </div>
        </div>

        {/* Confetti Effect for High Scores */}
        {isExcellent && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div key={i} className={`confetti confetti-${i % 6}`} />
            ))}
          </div>
        )}
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
            {isActive && !showResult && (
              <button
                onClick={isPaused ? resumeQuiz : pauseQuiz}
                className="btn btn-timer"
                title={isPaused ? "Resume Quiz" : "Pause Quiz"}
              >
                {isPaused ? (
                  <Play className="icon-sm" />
                ) : (
                  <Pause className="icon-sm" />
                )}
              </button>
            )}
          </div>
          <span className="badge outline">Score: {score}</span>
        </div>
      </div>

      {!isActive && !showResult && (
        <div className="quiz-center">
          <button onClick={startQuiz} className="btn btn-success">
            🎯 Begin Challenge
          </button>
        </div>
      )}

      {isActive && !showResult && !isPaused && (
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

      {isPaused && isActive && !showResult && (
        <div className="quiz-body">
          <div className="quiz-pause-screen">
            <div className="pause-icon">
              <Pause className="pause-large" />
            </div>
            <h3 className="pause-title">Quiz Paused</h3>
            <p className="pause-subtitle">
              Take your time! Click resume when you&apos;re ready to continue.
            </p>
            <button onClick={resumeQuiz} className="btn btn-success btn-large">
              <Play className="icon-sm" /> Resume Quiz
            </button>
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
                  : selectedAnswer === -1
                  ? "text-warning"
                  : "text-danger"
              }`}
            >
              {selectedAnswer === question.correct
                ? "✅ Correct!"
                : selectedAnswer === -1
                ? "⏰ Time's Up!"
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
            {autoAdvance ? (
              <div className="text-muted">
                <Clock className="icon-sm" />
                <span>Skipping to next question...</span>
              </div>
            ) : (
              <button onClick={nextQuestion} className="btn btn-primary">
                {currentQuestion < quizQuestions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

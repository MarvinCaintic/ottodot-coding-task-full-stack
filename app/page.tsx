
"use client";

import { useState } from "react";
import { useProblemGenerator } from "./hooks/useProblemGenerator";
import Button from "./components/Button";
import ProblemCard from "./components/ProblemCard";
import FeedbackCard from "./components/FeedbackCard";
import LoadingIndicator from "./components/LoadingIndicator";

export default function Home() {
  const {
    problem,
    feedback,
    isCorrect,
    isLoading,
    generateProblem,
    submitAnswer,
  } = useProblemGenerator();
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitAnswer(Number(userAnswer));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <main className="w-full max-w-md bg-transparent flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Math Problem Generator</h1>
        <Button
          onClick={() => {
            generateProblem();
            setUserAnswer("");
          }}
          isLoading={isLoading}
          color="blue"
        >
          {isLoading ? "⏳ Generating..." : "✨ Generate New Problem"}
        </Button>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          problem && (
            <section className="flex flex-col gap-4">
              <ProblemCard
                problem={problem.problem_text}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
              <FeedbackCard isCorrect={isCorrect} feedback={feedback} />
            </section>
          )
        )}
      </main>
    </div>
  );
}

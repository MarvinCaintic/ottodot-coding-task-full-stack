import { useState } from "react";
import { generateMathProblem, generateFeedback } from "../services/geminiService";
import { saveProblem, saveSubmission } from "../services/supabaseService";


export function useProblemGenerator() {
  const [problem, setProblem] = useState<{ problem_text: string; final_answer: number } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateProblem = async () => {
    setIsLoading(true);
    try {
      const parsed = await generateMathProblem();
      const { data, error } = await saveProblem(parsed.problem_text, parsed.final_answer);
      if (error) throw error;

      setSessionId(data.id);
      setProblem(parsed);
      setFeedback("");
      setIsCorrect(null);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (userAnswer: number) => {
    if (!problem || !sessionId) return;
    setIsLoading(true);

    try {
      const correct = userAnswer === problem.final_answer;
      const feedbackText = await generateFeedback(problem.problem_text, userAnswer, problem.final_answer);

      await saveSubmission(sessionId, userAnswer, correct, feedbackText);

      setFeedback(feedbackText);
      setIsCorrect(correct);
    } finally {
      setIsLoading(false);
    }
  };

  return { problem, feedback, isCorrect, isLoading, generateProblem, submitAnswer };
}

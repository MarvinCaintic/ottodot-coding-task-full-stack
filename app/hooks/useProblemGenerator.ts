import { useState } from "react";

export function useProblemGenerator() {
  const [problem, setProblem] = useState<{ problem_text: string; final_answer: number } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateProblem = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/math-problem', { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.problem) {
        console.error('Failed to generate problem', json);
        return;
      }

      // response shape: { problem: { problem_text, final_answer }, sessionId }
      setProblem(json.problem);
      setSessionId(json.sessionId || null);
      setFeedback("");
      setIsCorrect(null);
    } catch (err) {
      console.error('generateProblem error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (userAnswer: number) => {
    if (!problem || !sessionId) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/math-problem/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userAnswer }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error('Submission failed', json);
        return;
      }

      // response shape: { isCorrect, feedback }
      setFeedback(json.feedback || "");
      setIsCorrect(Boolean(json.isCorrect));
    } catch (err) {
      console.error('submitAnswer error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { problem, feedback, isCorrect, isLoading, generateProblem, submitAnswer };
}

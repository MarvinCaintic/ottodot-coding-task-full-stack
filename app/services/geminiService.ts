import { GoogleGenerativeAI } from "@google/generative-ai";
import attempt from "lodash-es/attempt";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });

export async function generateMathProblem() {
  const prompt = `
    Generate a single math word problem suitable for a Primary 5 student 
    with one correct numeric answer. 
    Return strictly JSON:
    {
      "problem_text": "<string>",
      "final_answer": <number>
    }
  `;

  const result = await model.generateContent(prompt);
  let text = result.response.text();
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return attempt(() => JSON.parse(text)) as { problem_text: string; final_answer: number };
}

export async function generateFeedback(problem: string, userAns: number, correctAns: number) {
  const feedbackPrompt = `
    The student answered ${userAns} for this problem:
    "${problem}"
    The correct answer is ${correctAns}.
    Give helpful, encouraging feedback suitable for a Primary 5 student in 2–3 sentences.
  `;

  const result = await model.generateContent(feedbackPrompt);
  return result.response.text();
}

import { supabase } from "../../lib/supabaseClient";

export async function saveProblem(problem_text: string, final_answer: number) {
  return supabase
    .from("math_problem_sessions")
    .insert({ problem_text, correct_answer: final_answer })
    .select()
    .single();
}

export async function saveSubmission(session_id: string, user_answer: number, is_correct: boolean, feedback_text: string) {
  return supabase
    .from("math_problem_submissions")
    .insert({ session_id, user_answer, is_correct, feedback_text })
    .select()
    .single();
}

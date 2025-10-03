import { NextResponse } from 'next/server';
import { generateMathProblem } from '../../services/geminiService';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const difficulty = body?.difficulty;
    const problemType = body?.problemType;

    const problem = await generateMathProblem({ difficulty, problemType });
    if (!problem) {
      return NextResponse.json({ error: 'Failed to generate problem' }, { status: 500 });
    }

    // save to supabase
    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert({
        problem_text: problem.problem_text,
        correct_answer: problem.final_answer,
        difficulty: difficulty || 'medium',
        problem_type: problemType || 'mixed',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save problem' }, { status: 500 });
    }

    return NextResponse.json({ problem: problem, sessionId: data.id });
  } catch (err) {
    console.error('Generate problem error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { generateMathProblem } from '../../services/geminiService';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const problem = await generateMathProblem();
    if (!problem) {
      return NextResponse.json({ error: 'Failed to generate problem' }, { status: 500 });
    }

    // save to supabase
    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert({ problem_text: problem.problem_text, correct_answer: problem.final_answer })
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

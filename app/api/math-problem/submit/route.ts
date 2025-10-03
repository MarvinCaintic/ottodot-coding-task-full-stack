import { NextResponse } from 'next/server';
import { generateFeedback } from '../../../services/geminiService';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, userAnswer } = body as { sessionId: string; userAnswer: number };

    if (!sessionId || typeof userAnswer !== 'number') {
      return NextResponse.json({ error: 'Missing sessionId or userAnswer' }, { status: 400 });
    }

    // fetch session to get correct answer and problem text
    const { data: session, error: fetchError } = await supabase
      .from('math_problem_sessions')
      .select('id, problem_text, correct_answer')
      .eq('id', sessionId)
      .single();

    if (fetchError || !session) {
      console.error('Supabase fetch session error:', fetchError);
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const isCorrect = Number(session.correct_answer) === Number(userAnswer);

    // generate feedback using AI
    const feedback = await generateFeedback(session.problem_text, Number(userAnswer), Number(session.correct_answer));

    // save submission
    const { error: insertError } = await supabase.from('math_problem_submissions').insert({
      session_id: sessionId,
      user_answer: Number(userAnswer),
      is_correct: isCorrect,
      feedback_text: feedback,
    });

    if (insertError) {
      console.error('Supabase insert submission error:', insertError);
    }

    return NextResponse.json({ isCorrect, feedback });
  } catch (err) {
    console.error('Submit answer error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

interface Props {
  isCorrect: boolean | null;
  feedback: string;
}

export default function FeedbackCard({ isCorrect, feedback }: Props) {
  if (!feedback) return null;

  return (
    <div className={`feedback-card ${isCorrect ? 'feedback-card--correct' : 'feedback-card--incorrect'}`}> 
      <h2 className="feedback-card__title">
        {isCorrect ? "✅ Correct!" : "❌ Try Again"}
      </h2>
      <p className="feedback-card__text">{feedback}</p>
    </div>
  );
}

import Button from "./Button";
import InputField from "./InputField";

interface Props {
  problem: string;
  userAnswer: string;
  setUserAnswer: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ProblemCard({ problem, userAnswer, setUserAnswer, onSubmit, isLoading }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-10 border-2 border-blue-600">
      <h2 className="text-xl font-semibold text-center text-gray-800">Problem</h2>
  <p className="text-lg text-gray-700 indented-justified">{problem}</p>

      <form onSubmit={onSubmit}>
        <InputField
          type="number"
          value={userAnswer}
          label="Your Answer"
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          required
        />
        <Button
          onClick={() => {}}
          isLoading={isLoading}
          color="green"
        >
          {isLoading ? "⏳ Checking..." : "✔️ Submit Answer"}
        </Button>
      </form>
    </div>
  );
}

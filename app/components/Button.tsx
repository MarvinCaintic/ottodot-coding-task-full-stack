interface Props {
  onClick: () => void;
  isLoading: boolean;
  color?: "blue" | "green";
  children?: React.ReactNode;
}

export default function Button({ onClick, isLoading, color = "blue", children }: Props) {
  const colorClass = color === "green" ? "app-btn app-btn--green" : "app-btn app-btn--blue";
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={colorClass}
    >
      {children}
    </button>
  );
}

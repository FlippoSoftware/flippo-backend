type TCountDownCircleProps = {
  time?: number;
  size: number;
  strokeWidth: number;
  onComplete?: () => void;
  strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
  className?: string;
};

export type { TCountDownCircleProps };

type TCountDownCircleProps = {
  duration: number;
  strokeWidth?: number;
  size?: number;
  onComplete?: () => void;
  strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
  className?: string;
  styleEmptyBar?: string;
};

export type { TCountDownCircleProps };

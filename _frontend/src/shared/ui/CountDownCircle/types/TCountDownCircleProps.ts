type TCountDownCircleProps = {
  className?: string;
  classNameEmptyBar?: string;
  duration: number;
  onComplete?: () => void;
  size?: number;
  strokeLinecap?: 'butt' | 'inherit' | 'round' | 'square' | undefined;
  strokeWidth?: number;
};

export type { TCountDownCircleProps };

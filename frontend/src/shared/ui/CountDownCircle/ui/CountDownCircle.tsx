import { useEffect, useState } from "react";
import clsx from "clsx";

import { type TCountDownCircleProps } from "../types/TCountDownCircleProps";

import st from "./CountDownCircle.module.scss";

function CountDownCircle(props: TCountDownCircleProps) {
  const {
    duration = 5000,
    size = 27,
    strokeWidth = 3,
    onComplete,
    strokeLinecap = "round",
    className = ""
  } = props;

  const [startingTime] = useState(Date.now());
  const [countDown, setCountDown] = useState(duration);

  const radius = size / 2;
  const circumference = size * Math.PI;
  const [countDown, setCountDown] = useState(time);

  const second = countDown / 1000 < 0.2 ? 0 : Math.ceil(countDown / 1000).toString();
  const strokeDashoffset = circumference - (countDown / duration) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startingTime;
      const progress = duration - elapsed;

      if (progress > 0) {
        setCountDown(progress);
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [countDown, onComplete, duration, startingTime]);

  return (
    <div className={clsx(st.countDown, className)}>
      <label className={st.counter}>{second}</label>
      <div className={st.circleContainer}>
        <svg width={size} height={size} fill={"none"} xmlns={"http://www.w3.org/2000/svg"}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    </div>
  );
}

export default memo(CountDownCircle);

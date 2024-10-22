import { useEffect, useState } from "react";
import clsx from "clsx";

import { type TCountDownCircleProps } from "../types/TCountDownCircleProps";

import st from "./CountDownCircle.module.scss";

function CountDownCircle(props: TCountDownCircleProps) {
  const {
    time = 5000,
    size,
    strokeWidth = 4,
    onComplete,
    strokeLinecap = "round",
    className = ""
  } = props;

  const radius = size / 2;
  const circumference = size * Math.PI;
  const [countDown, setCountDown] = useState(time);

  const second = Math.ceil(countDown / 1000).toString();
  const strokeDashoffset = circumference - (countDown / time) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 10);
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [countDown, onComplete]);

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

export default CountDownCircle;

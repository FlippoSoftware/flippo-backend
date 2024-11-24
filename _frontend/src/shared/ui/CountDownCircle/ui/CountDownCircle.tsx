import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

import { type TCountDownCircleProps } from '../types/TCountDownCircleProps';
import st from './CountDownCircle.module.scss';

function CountDownCircle(props: TCountDownCircleProps) {
  const {
    className = '',
    classNameEmptyBar = '',
    duration = 5000,
    onComplete,
    size = 27,
    strokeLinecap = 'round',
    strokeWidth = 3
  } = props;

  const [startingTime] = useState(Date.now());
  const [countDown, setCountDown] = useState(duration);

  const radius = size / 2;
  const circumference = size * Math.PI;

  const second = countDown / 1000 < 0.2 ? 0 : Math.ceil(countDown / 1000).toString();
  const strokeDashoffset = circumference - (countDown / duration) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startingTime;
      const progress = duration - elapsed;

      if (progress > 0) {
        setCountDown(progress);
      } else {
        setCountDown(0);
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
        <svg fill={'none'} height={size} width={size} xmlns={'http://www.w3.org/2000/svg'}>
          <circle
            className={classNameEmptyBar ? classNameEmptyBar : st.emptyBar}
            cx={radius}
            cy={radius}
            fill={'none'}
            r={radius}
            strokeDasharray={circumference}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={radius}
            cy={radius}
            fill={'none'}
            r={radius}
            stroke={'currentColor'}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    </div>
  );
}

export default memo(CountDownCircle);

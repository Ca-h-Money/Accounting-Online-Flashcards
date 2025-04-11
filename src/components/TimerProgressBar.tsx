import { useState, useEffect } from "react";

interface TimerProgressBarProps {
  duration: number;
  onTimerCompleted: () => void;
}

const TimerProgressBar = ({ duration, onTimerCompleted }: TimerProgressBarProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setTimeElapsed(0); // Reset timeElapsed when duration changes
  }, [duration]);

  useEffect(() => {
    if (timeElapsed >= duration) {
      setTimeout(() => onTimerCompleted(), 1000); // Ensures UI transition completes
      return;
    }

    const timer = setTimeout(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeElapsed, duration, onTimerCompleted]);

  // update progress
  const progress = (timeElapsed / duration) * 100; 

  return (
    <div className="w-[280px] sm:w-[850px]">
      <div
        className="h-2 bg-green-400 transition-all duration-1000 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TimerProgressBar;

// TimerProvider.js
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isPlayingAtom, timerAtom, totalTimeAtom } from "../../Utils/Store";

// TimerProvider component
const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useAtom(timerAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const totalTimer = useAtomValue(totalTimeAtom);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    console.log("setting timer");
    setTimer(totalTimer);
  }, [totalTimer, setTimer]);

  useEffect(() => {
    let interval;
    console.log(timer);
    if (isPlaying) {
      document.title = `Study Snap | ${formatTime()}`;
      interval = setInterval(() => {
        setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Countdown logic
      }, 1000);
      if (timer == 0) {
        setIsPlaying(false);
        setTimer(totalTimer);
      }
    } else {
      document.title = "Study Snap";
      clearInterval(interval);
    }

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, timer, setTimer]);

  return <>{children}</>;
};

export default TimerProvider;

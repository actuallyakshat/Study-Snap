// TimerProvider.js
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isPlayingAtom, timerAtom, totalTimeAtom } from "../../Utils/Store";

// TimerProvider component
const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useAtom(timerAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const totalTimer = useAtomValue(totalTimeAtom);

  useEffect(() => {
    console.log("setting timer");
    setTimer(totalTimer);
  }, [totalTimer, setTimer]);

  useEffect(() => {
    let interval;
    console.log(timer);
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Countdown logic
      }, 1000);
      if (timer == 0) {
        setIsPlaying(false);
        setTimer(totalTimer);
      }
    } else {
      clearInterval(interval); // Clear interval when not playing
    }

    return () => clearInterval(interval);
  }, [isPlaying, timer, setTimer]);

  return <>{children}</>;
};

export default TimerProvider;

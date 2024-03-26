// TimerProvider.js
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import useSound from "use-sound";
import {
  isPlayingAtom,
  timerAtom,
  totalTimeAtom,
  clientUserAtom,
} from "../../Utils/Store";
import { saveCompletedTimer } from "../../HandleApi/TimerApiHandler";
import timerCompletionSound from "/sounds/timer-completion-sound.mp3";

// TimerProvider component
const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useAtom(timerAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const totalTimer = useAtomValue(totalTimeAtom);
  const [user, setUser] = useAtom(clientUserAtom);
  const [play] = useSound(timerCompletionSound, { volume: 0.8 });

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  function getCurrentDateTimeString() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const date = `${day}/${month}/${year}`;

    let hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    const time = `${hours}:${minutes} ${ampm}`;

    return { date, time };
  }

  useEffect(() => {
    setTimer(totalTimer);
  }, [totalTimer, setTimer]);

  const saveCompletedTimerHandler = async (totalTimer, date, time, user) => {
    try {
      const response = await saveCompletedTimer(totalTimer, date, time, user);
      return response.data.completedTimer;
    } catch (error) {
      console.error("Error saving completed timer:", error);
      return null;
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      document.title = `Study Snap | ${formatTime()}`;
      interval = setInterval(() => {
        setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      if (timer == 0) {
        setIsPlaying(false);
        play();
        if (user) {
          const { date, time } = getCurrentDateTimeString();
          saveCompletedTimerHandler(totalTimer / 60, date, time, user)
            .then((completedTimer) => {
              if (completedTimer) {
                const newUser = user.completedTimers.unshift(completedTimer);
                setUser(newUser);
              } else {
                console.error("Failed to save completed timer.");
              }
            })
            .catch((error) => {
              console.error("Error saving completed timer:", error);
            });
        }
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

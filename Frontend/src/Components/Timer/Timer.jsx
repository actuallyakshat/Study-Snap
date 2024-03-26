import { useAtom } from "jotai";
import { isPlayingAtom, timerAtom, totalTimeAtom } from "../../Utils/Store";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Timer = () => {
  const [time, setTimer] = useAtom(timerAtom);
  const [playing, setPlaying] = useAtom(isPlayingAtom);
  const [totalTime, setTotalTime] = useAtom(totalTimeAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const timerInputRef = useRef(null);

  useEffect(() => {
    console.log(playing);
  }, [playing]);

  const handleStartStop = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  useEffect(() => {
    if (settingsOpen && timerInputRef.current) {
      timerInputRef.current.focus();
    }
  }, [settingsOpen]);

  const handleSetTimer = () => {
    if (timerInputRef.current.value) {
      let inputValue = Math.round(timerInputRef.current.value);
      if (inputValue < 1) {
        toast.error("Set a time of at least 1 minute!");
        return;
      } else if (inputValue > 120) {
        toast.error("Set a time of less than 120 minutes!");
        return;
      }
      setPlaying(false);
      setTotalTime(inputValue * 60);
      setTimer(inputValue * 60);
      setSettingsOpen(false);
    }
  };
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="font-Inter w-full px-4 md:px-6 py-6 flex-[4] h-full justify-center flex flex-col items-center">
      <div
        className={`xl:w-[50%] w-full flex justify-start items-center ${
          settingsOpen ? "justify-center" : "justify-end"
        } mb-6 gap-3`}
      >
        {settingsOpen ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animationDelay: 1 }}
              exit={{ opacity: 0 }}
              className="py-3 flex justify-center items-center gap-2 md:gap-4"
            >
              <input
                className="focus:outline text-black outline-gray-100 rounded-md py-2 px-3"
                type="number"
                max={60}
                ref={timerInputRef}
                placeholder="Set time (in minutes)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSetTimer();
                  }
                }}
              />
              <div className="flex gap-2 py-3">
                <button
                  type="button"
                  onClick={handleSetTimer}
                  className="px-5 py-3 flex items-center w-fit justify-center bg-green-400/20 hover:bg-green-700/20 transition-colors rounded-md text-sm"
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="px-5 py-3  flex tems-center w-fit justify-center bg-red-600/40 hover:bg-red-700/30 transition-colors rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <button
            className="text-sm px-4 py-3 hover:bg-white/10 h-fit flex items-center gap-3 transition-colors bg-white/20 rounded-lg"
            onClick={() => {
              setSettingsOpen(!settingsOpen);
            }}
          >
            <p className="text-sm">Settings</p>
            <FaGear className="text-xl" />
          </button>
        )}
      </div>
      <CircularProgressbar
        value={time}
        maxValue={totalTime}
        text={time ? formatTime() : "Time Up!"}
        styles={buildStyles({
          strokeLinecap: "butt",
          textSize: "15px",
          pathTransitionDuration: 0.5,
          textColor: "#FFF",
          pathColor: "#7f007f",
          trailColor: "#FFF",
        })}
        className="max-w-[30rem]"
      />
      <div className="w-full flex mt-8 gap-2 justify-center items-center">
        {!playing ? (
          <button
            onClick={handleStartStop}
            className="flex items-center gap-2 px-3 py-2 bg-green-500/50 hover:bg-green-500/40 transition-colors rounded-md"
          >
            Play
            <FaPlay />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleStartStop}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-400/60 hover:bg-yellow-400/50 transition-colors rounded-md"
            >
              Pause
              <FaPause />
            </button>
          </div>
        )}
        <button
          onClick={() => {
            setTimer(totalTime);
            setPlaying(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-red-500/50 hover:bg-red-500/40 transition-colors rounded-md"
        >
          Reset
          <FaStop />
        </button>
      </div>
    </div>
  );
};

export default Timer;

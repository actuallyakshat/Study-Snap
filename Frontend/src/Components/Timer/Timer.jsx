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
    <div className="font-Inter flex h-full w-full flex-[4] flex-col items-center justify-center px-4 py-6 md:px-6">
      <div
        className={`flex w-full items-center justify-start xl:w-[50%] ${
          settingsOpen ? "justify-center" : "justify-end"
        } mb-6 gap-3`}
      >
        {settingsOpen ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animationDelay: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-3 md:gap-4"
            >
              <input
                className="rounded-md px-3 py-2 text-black outline-gray-100 focus:outline"
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
                  className="flex w-fit items-center justify-center rounded-md bg-green-400/20 px-5 py-3 text-sm transition-colors hover:bg-green-700/20"
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="tems-center flex  w-fit justify-center rounded-md bg-red-600/40 px-5 py-3 text-sm transition-colors hover:bg-red-700/30"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <button
            className="flex h-fit items-center gap-3 rounded-lg bg-white/20 px-4 py-3 text-sm transition-colors hover:bg-white/10"
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
      <div className="mt-8 flex w-full items-center justify-center gap-2">
        {!playing ? (
          <button
            onClick={handleStartStop}
            className="flex items-center gap-2 rounded-md bg-green-500/50 px-3 py-2 transition-colors hover:bg-green-500/40"
          >
            Play
            <FaPlay />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleStartStop}
              className="flex items-center gap-2 rounded-md bg-yellow-400/60 px-3 py-2 transition-colors hover:bg-yellow-400/50"
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
          className="flex items-center gap-2 rounded-md bg-red-500/50 px-3 py-2 transition-colors hover:bg-red-500/40"
        >
          Reset
          <FaStop />
        </button>
      </div>
    </div>
  );
};

export default Timer;

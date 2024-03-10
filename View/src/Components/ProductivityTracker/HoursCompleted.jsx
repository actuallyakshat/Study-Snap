import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
export const HoursCompleted = () => {
  return (
    <div className="max-w-[400px] border border-gray-400/20 relative px-4 my-4 w-full flex-col bg-gray-800/30 h-[300px] rounded-2xl flex items-center">
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Progress 📈</h1>
        <p className="my-1 text-white/80">17/28 hours completed</p>
      </div>
      <div className="w-[40%] absolute top-1/2 -translate-y-1/4">
        <CircularProgressbar
          value={17}
          maxValue={28}
          text={`${Math.round((17 / 28) * 100)}%`}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "20px",
            pathTransitionDuration: 0.5,
            textColor: "#FFF",
            pathColor: "#7f007f",
            trailColor: "#FFF",
          })}
          // className="max-w-[10rem]"
        />
      </div>
    </div>
  );
};

import React from "react";

export const StreakRecord = ({ cardStyle }) => {
  return (
    <div className={cardStyle}>
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Streak 🔥</h1>
        <p className="text-center my-1 max-w-[30ch] mx-auto text-white/80">
          You have been logging your studying data for:
        </p>
      </div>
      <h3 className="font-bold text-3xl absolute top-1/2">12 Days</h3>
    </div>
  );
};

import React from "react";
import { userAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
export const StreakRecord = ({ cardStyle }) => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div className={cardStyle}>
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Streak 🔥</h1>
        <p className="text-center my-1 max-w-[30ch] mx-auto text-white/80">
          You have been continuously logging your studying data for:
        </p>
      </div>
      <h3 className="font-bold text-3xl absolute top-1/2">
        {user?.streak == 1 ? `${user?.streak} Day` : `${user?.streak} Days`}
      </h3>
    </div>
  );
};

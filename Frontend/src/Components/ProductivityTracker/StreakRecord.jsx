import React from "react";
import { clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
export const StreakRecord = ({ cardStyle }) => {
  const [user, setUser] = useAtom(clientUserAtom);
  return (
    <div className={cardStyle}>
      <div className="mt-8 w-full text-center">
        <h1 className="text-3xl font-semibold">Streak 🔥</h1>
        <p className="mx-auto my-1 max-w-[30ch] text-center text-white/80">
          You have been continuously logging your studying data for:
        </p>
      </div>
      <h3 className="absolute top-1/2 text-3xl font-bold">
        {user?.streak == 1 ? `${user?.streak} Day` : `${user?.streak} Days`}
      </h3>
    </div>
  );
};

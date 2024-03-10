import { useState, useEffect } from "react";
import { userAtom } from "../../Utils/Store";
import { HistoryCard } from "./HistoryCard";
import { useAtomValue } from "jotai";

export const TimerHistory = () => {
  const user = useAtomValue(userAtom);
  const [completedTimers, setCompletedTimers] = useState([]);

  useEffect(() => {
    if (user && user.completedTimers) {
      setCompletedTimers(user.completedTimers);
    }
  }, [user]);

  return (
    <div className="flex-[3] h-full w-full">
      <div className="mx-auto w-full h-full">
        <h1 className="font-bold text-center text-3xl pt-10">
          Completed Sessions Log
        </h1>
        <p className="text-center mx-auto text-white/80 my-2 max-w-[60ch]">
          Work along with the timer for{" "}
          <span className="text-white font-bold">at least twenty minutes</span>{" "}
          and we will keep a record of it for better productivity tracking!
        </p>
        <div className="space-y-2 my-10">
          {completedTimers &&
            completedTimers.map((item) => (
              <HistoryCard key={item._id} item={item} />
            ))}
          {completedTimers.length == 0 && (
            <p className="font-semibold text-lg text-center">
              You have no completed sessions...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

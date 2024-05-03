import { useState, useEffect } from "react";
import { clientUserAtom } from "../../Utils/Store";
import { HistoryCard } from "./HistoryCard";
import { useAtomValue } from "jotai";

export const TimerHistory = () => {
  const user = useAtomValue(clientUserAtom);
  const [completedTimers, setCompletedTimers] = useState([]);

  useEffect(() => {
    if (user && user.completedTimers) {
      setCompletedTimers(user.completedTimers);
    }
  }, [user]);

  return (
    <div className="h-full w-full flex-[3] px-4 xl:px-2">
      <div className="mx-auto h-full w-full py-8">
        <h1 className="pt-10 text-center text-3xl font-bold">
          Completed Sessions Log
        </h1>
        <p className="mx-auto my-2 max-w-[60ch] text-center text-white/80">
          Work along with the timer for{" "}
          <span className="font-bold text-white">at least twenty minutes</span>{" "}
          and we will keep a record of it for better productivity tracking!
        </p>
        <div className="my-10 space-y-2">
          {completedTimers &&
            completedTimers.map((item) => (
              <HistoryCard key={item._id} item={item} />
            ))}
          {completedTimers.length == 0 && (
            <p className="text-center text-lg font-semibold">
              You have no completed sessions...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

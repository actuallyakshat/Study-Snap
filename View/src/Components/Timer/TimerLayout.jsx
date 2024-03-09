import Timer from "./Timer";
import { TimerHistory } from "./TimerHistory";

export const TimerLayout = () => {
  return (
    <div className="w-full h-full flex items-center">
      <Timer />
      <div className="h-full bg-white/40 w-[1px]"></div>
      <TimerHistory />
    </div>
  );
};

import Timer from "./Timer";
import { TimerHistory } from "./TimerHistory";

export const TimerLayout = () => {
  return (
    <div className="flex h-full w-full flex-col items-center xl:flex-row">
      <Timer />
      <div className="h-[1px] w-full bg-white/40 xl:h-full xl:w-[1px]"></div>
      <TimerHistory />
    </div>
  );
};

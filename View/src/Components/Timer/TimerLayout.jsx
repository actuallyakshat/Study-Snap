import Timer from "./Timer";
import { TimerHistory } from "./TimerHistory";

export const TimerLayout = () => {
  return (
    <div className="w-full h-full flex items-center xl:flex-row flex-col">
      <Timer />
      <div className="xl:h-full w-full h-[1px] bg-white/40 xl:w-[1px]"></div>
      <TimerHistory />
    </div>
  );
};

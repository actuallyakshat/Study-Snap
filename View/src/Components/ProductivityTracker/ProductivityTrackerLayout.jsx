import { userAtom } from "../../Utils/Store";
import { HoursCompleted } from "./HoursCompleted";
import { LogStudyHours } from "./LogStudyHours";
import { LogStudyTarget } from "./LogStudyTarget";
import { StreakRecord } from "./StreakRecord";
import { StudyTracker } from "./StudyTracker";
import { useAtomValue } from "jotai";

export const ProductivityTrackerLayout = () => {
  const cardStyle =
    "max-w-[350px] border border-gray-400/20 relative px-4 w-full flex-col bg-gray-800/30 h-[300px] rounded-2xl flex items-center";
  const user = useAtomValue(userAtom);
  return (
    <div className="w-full h-full flex-1 py-8">
      <div className="mx-auto h-full px-3 md:max-w-[80%] w-full">
        <h1 className="font-bold p-4 text-3xl md:text-5xl">
          Hey {user?.name?.split(" ")[0]}, Let&apos;s Keep Going!
        </h1>
        <StudyTracker />
        <div className="w-full justify-center flex flex-wrap md:flex-row gap-3">
          <LogStudyHours cardStyle={cardStyle} />
          <StreakRecord cardStyle={cardStyle} />
          <LogStudyTarget cardStyle={cardStyle} />
          <HoursCompleted cardStyle={cardStyle} />
          {/* <LogStudyHours />
          <LogStudyHours /> */}
        </div>
      </div>
    </div>
  );
};

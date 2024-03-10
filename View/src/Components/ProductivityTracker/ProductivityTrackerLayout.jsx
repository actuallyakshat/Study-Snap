import { userAtom } from "../../Utils/Store";
import { HoursCompleted } from "./HoursCompleted";
import { LogStudyHours } from "./LogStudyHours";
import { LogStudyTarget } from "./LogStudyTarget";
import { StreakRecord } from "./StreakRecord";
import { StudyTracker } from "./StudyTracker";
import { useAtomValue } from "jotai";

export const ProductivityTracker = () => {
  const user = useAtomValue(userAtom);
  return (
    <div className="w-full h-full flex-1 py-8">
      <div className="mx-auto h-full max-w-[80%] w-full">
        <h1 className="font-bold p-4 text-5xl">
          Hey {user?.given_name}, Let&apos;s Keep Going!
        </h1>
        <StudyTracker />
        <div className="w-full flex gap-4">
          <LogStudyHours />
          <StreakRecord />
          <LogStudyTarget />
          <HoursCompleted />
          {/* <LogStudyHours />
          <LogStudyHours /> */}
        </div>
      </div>
    </div>
  );
};

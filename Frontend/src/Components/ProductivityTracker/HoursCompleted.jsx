import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
export const HoursCompleted = ({ cardStyle }) => {
  const [user] = useAtom(clientUserAtom);
  const [completedHours, setCompletedHours] = useState(0);
  useEffect(() => {
    if (user) {
      let tempHoursCompleted = 0;
      user?.productivityData?.Weekly?.map(
        (item) => (tempHoursCompleted += item.hours),
      );
      setCompletedHours(tempHoursCompleted);
    }
  }, [user, setCompletedHours]);
  return (
    <div className={cardStyle}>
      <div className="mt-8 w-full text-center">
        <h1 className="text-3xl font-semibold">Progress 📈</h1>
        <p className="my-1 text-white/80">
          {completedHours}/{user?.studyTarget * 7} hours completed
        </p>
      </div>
      <div className="absolute top-1/2 w-[40%] -translate-y-1/4">
        <CircularProgressbar
          value={completedHours}
          maxValue={user?.studyTarget ? user.studyTarget * 7 : 1}
          text={`${Math.round(
            (completedHours / (user?.studyTarget * 7 || 1)) * 100,
          )}%`}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "20px",
            pathTransitionDuration: 0.5,
            textColor: "#FFF",
            pathColor: "#7f007f",
            trailColor: "#FFF",
          })}
        />
      </div>
    </div>
  );
};

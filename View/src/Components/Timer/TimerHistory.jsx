import { HistoryCard } from "./HistoryCard";
const history = [
  {
    id: 1,
    duration: "50 minutes",
    date: "09/03/2024",
    time: "2:03pm",
  },
  {
    id: 2,
    duration: "25 minutes",
    date: "07/03/2024",
    time: "7:10pm",
  },
  {
    id: 3,
    duration: "40 minutes",
    date: "08/03/2024",
    time: "9:25am",
  },
  {
    id: 4,
    duration: "55 minutes",
    date: "10/03/2024",
    time: "4:45pm",
  },
  {
    id: 5,
    duration: "30 minutes",
    date: "11/03/2024",
    time: "1:20pm",
  },
  {
    id: 6,
    duration: "45 minutes",
    date: "12/03/2024",
    time: "10:15am",
  },
  {
    id: 7,
    duration: "20 minutes",
    date: "13/03/2024",
    time: "6:30pm",
  },
  {
    id: 8,
    duration: "35 minutes",
    date: "14/03/2024",
    time: "8:00am",
  },
  {
    id: 9,
    duration: "60 minutes",
    date: "15/03/2024",
    time: "3:55pm",
  },
  {
    id: 10,
    duration: "15 minutes",
    date: "16/03/2024",
    time: "11:10am",
  },
];

const totalRecordedTime = {
  time: "340",
};
const getTotalRecordedTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalTimeCompleted = `${hours} hours and ${minutes} minutes`;
  return totalTimeCompleted;
};

export const TimerHistory = () => {
  return (
    <div className="flex-[3] w-full">
      <div className="mx-auto w-full h-full">
        <h1 className="font-bold text-center text-3xl mt-5">
          Completed Sessions Log
        </h1>
        <p className="text-center mx-auto text-white/80 my-2 max-w-[60ch]">
          Work along with the timer for atleast twnety minutes and we will keep
          a record of your it for better productivity tracking!
        </p>
        <div className="space-y-2 my-10">
          {history.map((item) => {
            return <HistoryCard key={item.id} item={item} />;
          })}
        </div>
        <div className="text-center font-semibold text-gray-200">
          <p>
            You have worked for {getTotalRecordedTime(totalRecordedTime.time)}{" "}
            at StudySnap
          </p>
        </div>
      </div>
    </div>
  );
};

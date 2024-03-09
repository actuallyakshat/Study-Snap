import { HistoryCard } from "./HistoryCard";
const history = [
  {
    id: 1,
    duration: "50m",
    date: "09/03/2024",
    time: "2:03pm",
  },
  {
    id: 2,
    duration: "25m",
    date: "07/03/2024",
    time: "7:10pm",
  },
  {
    id: 3,
    duration: "40m",
    date: "08/03/2024",
    time: "9:25am",
  },
  {
    id: 4,
    duration: "55m",
    date: "10/03/2024",
    time: "4:45pm",
  },
  {
    id: 5,
    duration: "30m",
    date: "11/03/2024",
    time: "1:20pm",
  },
  {
    id: 6,
    duration: "45m",
    date: "12/03/2024",
    time: "10:15am",
  },
  {
    id: 7,
    duration: "20m",
    date: "13/03/2024",
    time: "6:30pm",
  },
  {
    id: 8,
    duration: "35m",
    date: "14/03/2024",
    time: "8:00am",
  },
  {
    id: 9,
    duration: "60m",
    date: "15/03/2024",
    time: "3:55pm",
  },
  {
    id: 10,
    duration: "15m",
    date: "16/03/2024",
    time: "11:10am",
  },
  {
    id: 11,
    duration: "50m",
    date: "17/03/2024",
    time: "7:40pm",
  },
  {
    id: 12,
    duration: "25m",
    date: "18/03/2024",
    time: "9:15am",
  },
];
export const TimerHistory = () => {
  return (
    <div className="flex-[3] w-full">
      <div className="mx-auto w-full h-full">
        <h1 className="font-bold text-center text-3xl mt-8">
          Completed Sessions Log
        </h1>
        <p className="text-center mx-auto text-white/80 my-2 max-w-[60ch]">
          Work along with the timer for atleast twnety minutes and we will keep
          a record of your it for better productivity tracking!
        </p>
        <div className="space-y-2 my-8">
          {history.map((item) => {
            return <HistoryCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

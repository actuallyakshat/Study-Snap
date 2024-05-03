import { clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { addProductivityData } from "../../HandleApi/ProductivityDataApiHandler";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

export const LogStudyHours = ({ cardStyle }) => {
  const [user, setUser] = useAtom(clientUserAtom);
  const [studiedUptoNow, setStudiedUptoNow] = useState(0);
  const [hoursStudied, setHoursStudied] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const today = new Date().toLocaleString("en-IN", { weekday: "long" });
      const todaySchedule = user.productivityData.Weekly.find(
        (item) => item.day === today,
      );
      // Get the hours value
      setStudiedUptoNow(todaySchedule.hours);
      setHoursStudied(todaySchedule.hours);
    }
  }, [user]);

  function isEntryForTodayExists() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.toLocaleString("en-IN", {
      weekday: "long",
    });

    const exists = user.productivityData.Weekly.some((day) => {
      return day.day === currentDayOfWeek && day.hours !== 0;
    });

    return exists;
  }

  const setStudiedHoursHandler = async () => {
    if (hoursStudied == 0) {
      toast.error("Go study a little, champ!");
      return;
    }
    setLoading(true);
    const response = await addProductivityData(user.email, hoursStudied);
    if (response.success) {
      const newEntryFlag = isEntryForTodayExists();
      toast.success("Data added successfully!");

      // Update client-side data
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
      });
      const currentDayOfWeek = currentDate.toLocaleString("en-US", {
        weekday: "long",
      });

      // Update Weekly data
      const updatedWeeklyData = user.productivityData.Weekly.map((day) => {
        if (day.day === currentDayOfWeek) {
          day.hours = hoursStudied;
        }
        return day;
      });

      // Update Monthly data
      const updatedMonthlyData = user.productivityData.Monthly.map((day) => {
        if (day.day === currentDate.getDate()) {
          day.hours = hoursStudied;
        }
        return day;
      });

      // Update Yearly data
      const updatedYearlyData = user.productivityData.Yearly.map((month) => {
        if (month.month === currentMonth) {
          month.hours -= studiedUptoNow;
          month.hours += hoursStudied;
        }
        return month;
      });

      setUser((prevUser) => ({
        ...prevUser,
        weekly: updatedWeeklyData,
        monthly: updatedMonthlyData,
        yearly: updatedYearlyData,
        streak: newEntryFlag ? prevUser.streak : prevUser.streak + 1,
      }));
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    if (hoursStudied == 24) {
      toast.error("There are only 24 hours in a day!");
      return;
    }
    setHoursStudied(hoursStudied + 1);
  };
  const handleDecrement = () => {
    if (hoursStudied == 0) {
      toast.error("Woah there! Set hours in positive");
      return;
    }
    setHoursStudied(hoursStudied - 1);
  };

  return (
    <div className={cardStyle}>
      <div className="mt-8 w-full text-center">
        <h1 className="text-3xl font-semibold">Log Hours ⏲</h1>
        <p className="mx-auto my-1 max-w-[30ch] text-center text-white/80">
          How many hours did you study for today?
        </p>
      </div>
      {loading ? (
        <div className="flex flex-1 items-center pb-12">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 items-center text-4xl">
            <button onClick={handleDecrement}>-</button>
            <input
              type="text"
              readOnly
              value={`${
                hoursStudied
                  ? hoursStudied === 1
                    ? `${hoursStudied} Hour`
                    : `${hoursStudied} Hours`
                  : "0 Hours"
              }`}
              placeholder="Enter Hours"
              className="studyhours max-w-[200px] bg-transparent text-3xl font-bold focus:outline-none"
            />
            <button onClick={handleIncrement}>+</button>
          </div>
          {studiedUptoNow != hoursStudied && (
            <div className="absolute bottom-3 right-5">
              <button
                className="rounded-md p-1 hover:bg-white/10"
                onClick={() => {
                  setHoursStudied(studiedUptoNow);
                }}
              >
                <IoClose className="text-2xl" />
              </button>
              <button
                className="rounded-md p-1 hover:bg-white/10"
                onClick={setStudiedHoursHandler}
              >
                <IoCheckmark className="text-2xl" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

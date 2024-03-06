import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTodo } from "../../HandleApi/TodoApiHandler";
export const Inputbar = ({ user, items, setItems, updating, setUpdating }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = weekdays[currentDateTime.getDay()];
  const dayOfMonth = currentDateTime.getDate();
  const daySuffix =
    dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31
      ? "st"
      : dayOfMonth === 2 || dayOfMonth === 22
      ? "nd"
      : dayOfMonth === 3 || dayOfMonth === 23
      ? "rd"
      : "th";
  const formattedDay = dayOfMonth + daySuffix;
  const month = months[currentDateTime.getMonth()];
  let hours = currentDateTime.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutes = currentDateTime.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedDate = `${dayOfWeek}, ${formattedDay} ${month}. `;
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //TODO: Create a Todo if in create mode or update if in update mode.
    if (updating) {
      console.log("updating now!!");
    } else {
      const response = await createTodo(data.task, user);
      const updatedItems = [
        ...items,
        { _id: response.data.todo._id, task: data.task, isCompleted: false },
      ];
      setItems(updatedItems);
      console.log("response in input bar: ", response);
    }
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-2 mx-auto w-full text-black mb-8">
      <div className="w-full flex items-center justify-between text-white">
        <h3 className="font-medium text-xl">{formattedDate}</h3>
        <h3 className="font-medium text-xl">{formattedTime}</h3>
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex gap-3"
      >
        <input
          type="text"
          {...register("task")}
          className="px-2 py-2 text-sm h-10 flex-1 rounded-lg bg-gray-200 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 font-semibold text-md rounded-md bg-[#651b80] hover:bg-[#651b90]/70 transition-colors text-white"
        >
          {updating ? "Update" : "Add"}
        </button>
        {updating && (
          <button
            onClick={() => setUpdating(false)}
            type="button"
            className="px-4  py-2 font-semibold text-md rounded-md bg-red-700 hover:bg-red-800 transition-colors text-white"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

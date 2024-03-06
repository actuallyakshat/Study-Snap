import { useEffect, useState, useMemo } from "react";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formattedDate = useMemo(() => {
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
    return `${dayOfWeek}, ${formattedDay} ${month}. `;
  }, [currentDateTime]);

  const formattedTime = useMemo(() => {
    let hours = currentDateTime.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = currentDateTime.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }, [currentDateTime]);

  return (
    <div className="w-full flex items-center justify-between text-white">
      <h3 className="font-medium text-xl">{formattedDate}</h3>
      <h3 className="font-medium text-xl">{formattedTime}</h3>
    </div>
  );
};

export default DateTimeDisplay;

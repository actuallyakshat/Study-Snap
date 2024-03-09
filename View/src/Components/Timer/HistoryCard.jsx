import React from "react";

export const HistoryCard = ({ item }) => {
  return (
    <div className="w-[70%] border border-gray-200/20 mx-auto bg-white/20 p-3 rounded-lg">
      <p>{`Completed ${item.duration} on ${item.date} at ${item.time} `}</p>
    </div>
  );
};

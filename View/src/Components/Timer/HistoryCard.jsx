export const HistoryCard = ({ item }) => {
  return (
    <div className="w-[65%] border border-gray-200/20 mx-auto bg-white/20 p-3 rounded-lg">
      <p>
        Completed <span className="font-bold">{item.duration} minutes</span> on{" "}
        {item.date} at {item.time}
      </p>
    </div>
  );
};

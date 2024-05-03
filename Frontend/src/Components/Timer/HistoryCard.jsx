export const HistoryCard = ({ item }) => {
  return (
    <div className="mx-auto w-[65%] rounded-lg border border-gray-200/20 bg-white/20 p-3">
      <p>
        Completed <span className="font-bold">{item.duration} minutes</span> on{" "}
        {item.date} at {item.time}
      </p>
    </div>
  );
};

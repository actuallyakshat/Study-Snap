export const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="font-Inter rounded-xl border border-gray-300/40 bg-white px-4 py-2 text-black">
        <p className="inline font-medium">{`${label}: `}</p>
        {payload.map((data, index) => (
          <p
            key={index}
            className="inline font-semibold"
          >{`${data.value} hours`}</p>
        ))}
      </div>
    );
  }

  return null;
};

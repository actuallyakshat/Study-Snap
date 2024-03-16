export const CustomTooltip = ({ active, payload, label }) => {

  if (active) {

    return (
      <div className="bg-white border border-gray-300/40 font-Inter text-black px-4 py-2 rounded-xl">
        <p className="font-medium inline">{`${label}: `}</p>
        {payload.map((data, index) => (
          <p
            key={index}
            className="font-semibold inline"
          >{`${data.value} hours`}</p>
        ))}
      </div>
    );
  }

  return null;
};

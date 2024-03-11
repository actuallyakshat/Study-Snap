export const LogStudyTarget = ({cardStyle}) => {
  return (
    <div className={cardStyle}>
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Set Target 🎯</h1>
        <p className="text-center max-w-[35ch] my-1 mx-auto text-white/80">
          How many hours do you wish to study everyday?
        </p>
      </div>
      {/* <h3 className="font-bold text-3xl absolute top-1/2">12 Days</h3> */}
      <input
        type="number"
        placeholder="Enter Hours"
        className="studyhours max-w-[350px] absolute top-1/2 bg-transparent text-3xl left-1/2 -translate-x-1/2 focus:outline-none font-bold"
      />
    </div>
  );
};

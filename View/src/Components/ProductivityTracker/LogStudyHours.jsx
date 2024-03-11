export const LogStudyHours = ({ cardStyle }) => {
  return (
    <div className={cardStyle}>
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Log Hours ⏲</h1>
        <p className="text-center max-w-[30ch] my-1 mx-auto text-white/80">
          How many hours did you study for today?
        </p>
      </div>
      <input
        type="number"
        placeholder="Enter Hours"
        className="studyhours max-w-[350px] absolute top-1/2 bg-transparent text-3xl left-1/2 -translate-x-1/2 focus:outline-none font-bold"
      />
    </div>
  );
};

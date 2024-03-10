export const HomeLayout = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-[calc(100vh-64px)] w-full">
        <div className="h-full mx-auto pt-28 w-[75%]">
          <div className="w-full">
            <h1 className="font-bold mx-auto text-6xl max-w-[25ch] text-center">
              A No Bullsh*t Productivity Tracking Website for Students
            </h1>
            <h4 className="font-medium mx-auto my-4 text-gray-300/90 text-xl text-center max-w-[70ch]">
              Track your study hours, set goals, and boost your productivity
              with our straightforward student-focused platform. No fluff, just
              results.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

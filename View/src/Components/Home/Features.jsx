export const Features = () => {
  const cardStyle =
    "bg-spaceBlack max-w-[35rem] border border-gray-700/80 min-h-[20rem] relative flex flex-col items-center justify-center rounded-lg p-4";
  const titleStyle = "text-4xl font-bold text-gray-100 mb-2";
  const descStyle = "text-gray-300 lg:px-6 text-center";

  return (
    <div className="min-h-screen h-full w-full py-8 features text-center">
      <div className="max-w-[80rem] px-6 w-full h-full mx-auto">
        <h1 className="font-semibold text-4xl lg:text-5xl text-center pt-12">
          Packed With All the Productivity Essentials
        </h1>
        <p className="text-md text-gray-300 mx-auto max-w-[100ch]">
          Unlock peak productivity with our all-in-one powerhouse: a dynamic
          productivity tracking app boasting a to-do list, Pomodoro timer, notes
          tool, and daily study logging tools.
        </p>
        <div className="mt-8 justify-center flex flex-wrap gap-3">
          <div className={cardStyle}>
            <h1 className={titleStyle}>Productivity Tracker 📆</h1>
            <p className={descStyle}>
              Monitor study habits and track progress over time. By logging
              daily study sessions and academic achievements, you can gain
              valuable insights into your learning patterns, identify areas for
              improvement, and maintain motivation to consistently strive for
              academic excellence.
            </p>
          </div>
          <div className={cardStyle}>
            <h1 className={titleStyle}>To-Do List ✅</h1>
            <p className={descStyle}>
              Keep track of assignments, deadlines, and tasks with ease.
              Organize your workload, prioritize tasks, and ensure nothing slips
              through the cracks, helping you stay on top of your academic
              responsibilities.
            </p>
          </div>
          <div className={cardStyle}>
            <h1 className={titleStyle}>Notes ✍🏻</h1>
            <p className={descStyle}>
              Capture notes, brainstorm ideas, and jot down important
              information effortlessly. Study Snap provided a rich text editor
              which you can use to consolidate your study materials in one
              convenient location, facilitating revision and aiding
              comprehension of course materials.
            </p>
          </div>
          <div className={cardStyle}>
            <h1 className={titleStyle}>Pomodoro Timer ⏰</h1>
            <p className={descStyle}>
              Keep track of assignments, deadlines, and tasks with ease.
              Organize your workload, prioritize tasks, and ensure nothing slips
              through the cracks, helping you stay on top of your academic
              responsibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

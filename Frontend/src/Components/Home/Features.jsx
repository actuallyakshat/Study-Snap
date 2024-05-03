import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Features = ({ scrollRef }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const animationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const animationTransition = { duration: 0.5 };

  const cardStyle =
    "bg-spaceBlack max-w-[35rem] border border-gray-700/80 min-h-[20rem] relative flex flex-col items-center justify-center rounded-lg p-4";
  const titleStyle = "text-4xl font-bold text-gray-100 mb-2";
  const descStyle = "text-gray-300 lg:px-6 text-center";

  return (
    <div
      ref={scrollRef}
      className="features h-full min-h-screen w-full py-8 text-center"
    >
      <div ref={ref} className="mx-auto h-full w-full max-w-[80rem] px-6">
        <motion.h1
          variants={animationVariants}
          initial="hidden"
          animate={mainControls}
          transition={{ ...animationTransition, delay: 0.1 }}
          className="pt-12 text-center text-4xl font-semibold lg:text-5xl"
        >
          Packed With All the Productivity Essentials
        </motion.h1>
        <motion.p
          ref={ref}
          variants={animationVariants}
          initial="hidden"
          animate={mainControls}
          transition={{ ...animationTransition, delay: 0.4 }}
          className="text-md mx-auto max-w-[100ch] text-gray-300"
        >
          Unlock peak productivity with our all-in-one powerhouse: a dynamic
          productivity tracking app boasting a to-do list, Pomodoro timer, notes
          tool, and daily study logging tools.
        </motion.p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.6 }}
            className={cardStyle}
          >
            <h1 className={titleStyle}>Productivity Tracker 📆</h1>
            <p className={descStyle}>
              Monitor study habits and track progress over time. By logging
              daily study sessions and academic achievements, you can gain
              valuable insights into your learning patterns, identify areas for
              improvement, and maintain motivation to consistently strive for
              academic excellence.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.7 }}
            className={cardStyle}
          >
            <h1 className={titleStyle}>To-Do List ✅</h1>
            <p className={descStyle}>
              Keep track of assignments, deadlines, and tasks with ease.
              Organize your workload, prioritize tasks, and ensure nothing slips
              through the cracks, helping you stay on top of your academic
              responsibilities.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.8 }}
            className={cardStyle}
          >
            <h1 className={titleStyle}>Notes ✍🏻</h1>
            <p className={descStyle}>
              Capture notes, brainstorm ideas, and jot down important
              information effortlessly. Study Snap provided a rich text editor
              which you can use to consolidate your study materials in one
              convenient location, facilitating revision and aiding
              comprehension of course materials.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.9 }}
            className={cardStyle}
          >
            <h1 className={titleStyle}>Pomodoro Timer ⏰</h1>
            <p className={descStyle}>
              Enhance productivity by breaking work into focused intervals,
              usually 25 minutes long, interspersed with short breaks. Boost
              concentration, manage time effectively, and optimize workflow,
              fostering a balance between productivity and rejuvenation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

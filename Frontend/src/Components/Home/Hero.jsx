import { FaGithub } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
export const Hero = ({ scrollToFeatures }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
  return (
    <div className="herobg flex h-full min-h-[calc(100vh-64px)] w-full items-center">
      <div className="mx-auto flex h-full w-full items-center justify-center px-8 lg:max-w-[75%]">
        <div className="flex w-full flex-col items-center justify-center">
          <motion.h1
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.25 }}
            className="mx-auto max-w-[25ch] text-center text-4xl font-bold lg:text-6xl"
          >
            A No Bullsh*t Productivity Tracking Website for Students
          </motion.h1>
          <motion.h4
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.4 }}
            className="text-md mx-auto my-2 max-w-[70ch] text-center font-medium text-gray-300/90 lg:text-xl"
          >
            Track your study hours, set goals, and boost your productivity with
            our straightforward student-focused platform. No fluff, just
            results.
          </motion.h4>
          <motion.div
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.5 }}
            className="mt-10 flex space-x-4 px-4"
          >
            <button
              onClick={scrollToFeatures}
              className="bg-primaryPurple hover:bg-primaryPurple/80 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              Features
            </button>

            <a
              href="https://github.com/actuallyakshat/Study-Snap"
              target="_blank"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-600 px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <p>Github</p>
              <FaGithub className="text-xl" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

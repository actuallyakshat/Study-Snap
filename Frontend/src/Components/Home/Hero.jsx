import { FaGithub } from "react-icons/fa6";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
export const Hero = () => {
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
    <div className="h-full min-h-[calc(100vh-64px)] flex items-center herobg w-full">
      <div className="h-full mx-auto flex items-center justify-center px-8 w-full lg:max-w-[75%]">
        <div className="w-full flex flex-col justify-center items-center">
          <motion.h1
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.25 }}
            className="font-bold text-4xl mx-auto lg:text-6xl max-w-[25ch] text-center"
          >
            A No Bullsh*t Productivity Tracking Website for Students
          </motion.h1>
          <motion.h4
            ref={ref}
            variants={animationVariants}
            initial="hidden"
            animate={mainControls}
            transition={{ ...animationTransition, delay: 0.4 }}
            className="font-medium mx-auto my-2 text-gray-300/90 text-md lg:text-xl text-center max-w-[70ch]"
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
            className="flex px-4 space-x-4 mt-10"
          >
            <button
              className="px-6 bg-primaryPurple hover:bg-primaryPurple/80 transition-colors font-medium rounded-lg text-sm py-3"
            >
              Get Started
            </button>
            <a
              href="https://github.com/actuallyakshat/Study-Snap"
              target="_blank"
              className="px-6 flex py-3 items-center hover:text-black gap-3 border text-sm hover:bg-white transition-colors duration-300 font-medium border-gray-600 rounded-lg cursor-pointer"
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

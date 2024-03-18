import { data } from "./TestimonialData";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();
  const [[testimonialIndex, direction], setTestimonialIndex] = useState([0, 0]);
  // const [direction, setDirection] = useState(0);

  const swipeToImage = (swipeDirection) => {
    const newIndex =
      (testimonialIndex + swipeDirection + data.length) % data.length;
    setTestimonialIndex([newIndex, swipeDirection]);
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const animationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const sliderVariants = {
    incoming: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.8,
      position: "absolute",
    }),
  };

  const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  const animationTransition = { duration: 1 };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center testimonial px-4 py-12">
      <motion.h1
        ref={ref}
        variants={animationVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ ...animationTransition, delay: 0.4 }}
        className="text-center text-3xl font-light pb-8"
      >
        Discover What Our Community Has to Say
      </motion.h1>
      <motion.div
        ref={ref}
        variants={animationVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ ...animationTransition, delay: 0.6 }}
        className="max-w-[70rem] w-full border-2 p-3 border-gray-600/70 rounded-xl h-full bg-black/50 relative overflow-hidden"
      >
        <div className="flex flex-col bg-primaryPurple/20 overflow-hidden rounded-b-xl w-full h-full items-center rounded-t-xl">
          <div className="flex justify-between bg-spaceBlack/80 w-full py-7 rounded-t-xl px-8">
            <div className="flex items-center gap-3">
              <div className="size-4 bg-red-600 rounded-full"></div>
              <div className="size-4 bg-yellow-600 rounded-full"></div>
              <div className="size-4 bg-green-600 rounded-full"></div>
            </div>
            <h1 className="text-lg text-medium">Testimonials</h1>
          </div>
          <div className="flex-1 relative w-full flex flex-col pt-8 items-center">
            <button
              onClick={() => swipeToImage(-1)}
              className="absolute hidden md:block z-[10] top-1/2 -translate-y-1/2 left-5"
            >
              <IoIosArrowDropleftCircle className="size-7 text-gray-100/90 hover:text-gray-300/80 transition-colors" />
            </button>
            <button
              onClick={() => swipeToImage(1)}
              className="absolute hidden md:block z-[10] top-1/2 -translate-y-1/2 right-5"
            >
              <IoIosArrowDroprightCircle className="size-7 text-gray-100/90 hover:text-gray-300/80 transition-colors" />
            </button>
            <AnimatePresence custom={direction}>
              <motion.div
                key={testimonialIndex}
                custom={direction}
                variants={sliderVariants}
                initial="incoming"
                animate="active"
                exit="exit"
                transition={sliderTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                className="flex flex-col items-center pb-8"
              >
                <img
                  src={data[testimonialIndex]?.image}
                  alt="profile pic"
                  loading="lazy"
                  className="rounded-full object-cover object-center my-4 size-40"
                />
                <h1 className="text-lg font-semibold">
                  {data[testimonialIndex].name}
                </h1>
                <h4 className="text-sm font-medium text-gray-300">
                  {data[testimonialIndex].course}
                </h4>
                <div className="max-w-[90%] mt-6 mb-8 h-full flex justify-center items-center">
                  <p className="text-center font-light text-gray-200">
                    {data[testimonialIndex].review}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

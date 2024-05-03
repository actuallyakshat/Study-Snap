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
    <div className="testimonial flex h-full w-full flex-col items-center justify-center px-4 py-12">
      <motion.h1
        ref={ref}
        variants={animationVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ ...animationTransition, delay: 0.4 }}
        className="pb-8 text-center text-3xl font-light"
      >
        Discover What Our Community Has to Say
      </motion.h1>
      <motion.div
        ref={ref}
        variants={animationVariants}
        initial="hidden"
        animate={mainControls}
        transition={{ ...animationTransition, delay: 0.6 }}
        className="relative h-full w-full max-w-[70rem] overflow-hidden rounded-xl border-2 border-gray-600/70 bg-black/50 p-3"
      >
        <div className="bg-primaryPurple/20 flex h-full w-full flex-col items-center overflow-hidden rounded-b-xl rounded-t-xl">
          <div className="bg-spaceBlack/80 flex w-full justify-between rounded-t-xl px-8 py-7">
            <div className="flex items-center gap-3">
              <div className="size-4 rounded-full bg-red-600"></div>
              <div className="size-4 rounded-full bg-yellow-600"></div>
              <div className="size-4 rounded-full bg-green-600"></div>
            </div>
            <h1 className="text-medium text-lg">Testimonials</h1>
          </div>
          <div className="relative flex w-full flex-1 flex-col items-center pt-8">
            <button
              onClick={() => swipeToImage(-1)}
              className="absolute left-5 top-1/2 z-[10] hidden -translate-y-1/2 md:block"
            >
              <IoIosArrowDropleftCircle className="size-7 text-gray-100/90 transition-colors hover:text-gray-300/80" />
            </button>
            <button
              onClick={() => swipeToImage(1)}
              className="absolute right-5 top-1/2 z-[10] hidden -translate-y-1/2 md:block"
            >
              <IoIosArrowDroprightCircle className="size-7 text-gray-100/90 transition-colors hover:text-gray-300/80" />
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
                  className="my-4 size-40 rounded-full object-cover object-center"
                />
                <h1 className="text-lg font-semibold">
                  {data[testimonialIndex].name}
                </h1>
                <h4 className="text-sm font-medium text-gray-300">
                  {data[testimonialIndex].course}
                </h4>
                <div className="mb-8 mt-6 flex h-full max-w-[90%] items-center justify-center">
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

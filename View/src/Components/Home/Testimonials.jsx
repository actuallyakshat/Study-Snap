const data = [
  {
    name: "Akshat Dubey",
    course: "BTECH CSE",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat illo asperiores neque corporis illum! Assumenda accusamus magnam sit consequatur fugiat fugit nemo corporis suscipit. Ipsa eum beatae labore quas maiores modi minima sapiente quia eius soluta? Nostrum, doloribus dolorem. Saepe nam itaque maiores, quam modi at ut maxime libero a quia expedita? Ullam consequuntur at ab totam nihil, veritatis blanditiis harum possimus recusandae fugiat. Possimus nihil, dignissimos odio earum amet inventore voluptatum quia quod eos itaque sunt fugit alias! Officia quo",
    image: "https://i.scdn.co/image/ab67616100005174a11b2a6b38822c822f2fdf40",
  },
  {
    name: "John Doe",
    course: "BCOM ECO",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat illo asperiores neque corporis illum! Assumenda accusamus magnam sit consequatur fugiat fugit nemo corporis suscipit. Ipsa eum beatae labore quas maiores modi minima sapiente quia eius soluta? Nostrum, doloribus dolorem. Saepe nam itaque maiores, quam modi at ut maxime libero a quia expedita? Ullam consequuntur at ab totam nihil, veritatis blanditiis harum possimus recusandae fugiat. Possimus nihil, dignissimos odio earum amet inventore voluptatum quia quod eos itaque sunt fugit alias! Officia quo",
    image: "https://i.scdn.co/image/ab67706c0000da84128bd99168f8746e126d7b46",
  },
  {
    name: "Nehal Aggarwal",
    course: "BTECH CSE",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat illo asperiores neque corporis illum! Assumenda accusamus magnam sit consequatur fugiat fugit nemo corporis suscipit. Ipsa eum beatae labore quas maiores modi minima sapiente quia eius soluta? Nostrum, doloribus dolorem. Saepe nam itaque maiores, quam modi at ut maxime libero a quia expedita? Ullam consequuntur at ab totam nihil, veritatis blanditiis harum possimus recusandae fugiat. Possimus nihil, dignissimos odio earum amet inventore voluptatum quia quod eos itaque sunt fugit alias! Officia quo",
    image: "https://i.scdn.co/image/ab67616100005174a11b2a6b38822c822f2fdf40",
  },
  {
    name: "Dhruv Kaushik",
    course: "BCOM ECO",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat illo asperiores neque corporis illum! Assumenda accusamus magnam sit consequatur fugiat fugit nemo corporis suscipit. Ipsa eum beatae labore quas maiores modi minima sapiente quia eius soluta? Nostrum, doloribus dolorem. Saepe nam itaque maiores, quam modi at ut maxime libero a quia expedita? Ullam consequuntur at ab totam nihil, veritatis blanditiis harum possimus recusandae fugiat. Possimus nihil, dignissimos odio earum amet inventore voluptatum quia quod eos itaque sunt fugit alias! Officia quo",
    image: "https://i.scdn.co/image/ab67706c0000da84128bd99168f8746e126d7b46",
  },
];
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
  console.log(data[testimonialIndex]);

  const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
  };

  const animationTransition = { duration: 1 };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center testimonial py-12">
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
        className="max-w-[70rem] w-full border-2 border-gray-600/70 rounded-xl h-full bg-black/50 relative overflow-hidden"
      >
        <div className="flex flex-col bg-primaryPurple/20 w-full h-full items-center rounded-t-xl">
          <div className="flex justify-between bg-spaceBlack/80 w-full py-7 rounded-t-xl px-8">
            <div className="flex items-center gap-3">
              <div className="size-3 bg-red-600 rounded-full"></div>
              <div className="size-3 bg-yellow-600 rounded-full"></div>
              <div className="size-3 bg-green-600 rounded-full"></div>
            </div>
            <h1 className="text-lg text-medium">Testimonials</h1>
          </div>
          <div className="flex-1 relative w-full flex flex-col pt-8 items-center">
            <button
              onClick={() => swipeToImage(-1)}
              className="absolute top-1/2 -translate-y-1/2 left-5"
            >
              <IoIosArrowDropleftCircle className="size-7 text-gray-100/90 hover:text-gray-300/80 transition-colors" />
            </button>
            <button
              onClick={() => swipeToImage(1)}
              className="absolute top-1/2 -translate-y-1/2 right-5"
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
                className="flex flex-col items-center pb-8"
              >
                <img
                  src={data[testimonialIndex]?.image}
                  alt=""
                  className="rounded-full object-cover object-center my-4 size-40"
                />
                <h1 className="text-lg font-semibold">
                  {data[testimonialIndex].name}
                </h1>
                <h4 className="text-sm font-medium text-gray-300">
                  {data[testimonialIndex].course}
                </h4>
                <div className="max-w-[90ch] mt-6 mb-8 h-full flex justify-center items-center">
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

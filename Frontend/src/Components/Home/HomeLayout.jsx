import { useRef } from "react";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { GetStarted } from "./GetStarted";
import { Hero } from "./Hero";
import { Testimonials } from "./Testimonials";

export const HomeLayout = () => {
  const featuresRef = useRef(null);
  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Hero scrollToFeatures={scrollToFeatures} />
      <Features scrollRef={featuresRef} />
      <Testimonials />
      <GetStarted />
      <Footer />
    </div>
  );
};

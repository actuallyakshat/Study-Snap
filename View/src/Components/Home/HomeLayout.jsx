import { Features } from "./Features";
import { Footer } from "./Footer";
import { GetStarted } from "./GetStarted";
import { Hero } from "./Hero";
import { Testimonials } from "./Testimonials";

export const HomeLayout = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Testimonials />
      <GetStarted />
      <Footer />
    </div>
  );
};

import { FaGithub } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
export const Hero = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <div className="h-full mx-auto pt-28 px-8 w-full lg:max-w-[75%]">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl mx-auto lg:text-6xl max-w-[25ch] text-center">
            A No Bullsh*t Productivity Tracking Website for Students
          </h1>
          <h4 className="font-medium mx-auto my-2 text-gray-300/90 text-md lg:text-xl text-center max-w-[70ch]">
            Track your study hours, set goals, and boost your productivity with
            our straightforward student-focused platform. No fluff, just
            results.
          </h4>
          <div className="flex px-4 space-x-4 mt-10">
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              className="px-6 bg-primaryPurple hover:bg-primaryPurple/80 transition-colors font-medium rounded-lg text-sm py-3"
            >
              Get Started
            </button>
            <a
              href="https://github.com/actuallyakshat/Study-Snap"
              target="_blank"
              className="px-6 flex py-3 items-center  gap-3 border text-sm hover:bg-gray-800 transition-colors font-medium border-gray-600 rounded-lg cursor-pointer"
            >
              <p>Github</p>
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

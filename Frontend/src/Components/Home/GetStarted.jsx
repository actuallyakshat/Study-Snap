import { useAuth0 } from "@auth0/auth0-react";
export const GetStarted = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="h-full flex w-full min-h-[15rem] items-center justify-center getStarted">
      <div className="w-[80%] h-full flex items-center justify-around">
        <h1 className="text-3xl tracking-wide font-semibold">
          So, Ready To Get Started with Study Snap?
        </h1>
        <button
          onClick={() => loginWithRedirect()}
          className="px-5 py-3 bg-primaryPurple rounded-lg text-sm font-medium"
        >
          Join Study Snap
        </button>
      </div>
    </div>
  );
};

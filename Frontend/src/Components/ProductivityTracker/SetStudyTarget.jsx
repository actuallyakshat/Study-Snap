import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { setStudyTarget } from "../../HandleApi/ProductivityDataApiHandler";
export const SetStudyTarget = ({ cardStyle, user, setUser }) => {
  const targetInput = useRef(null);
  const [newTarget, setNewTarget] = useState(user ? user.studyTarget : 0);

  useEffect(() => {
    if (user?.studyTarget) {
      setNewTarget(user.studyTarget);
    }
  }, [user]);

  const handleIncrement = () => {
    if (newTarget == 12) {
      toast.error("You're not a machine buddy! Set lesser than 12 hours");
      return;
    }
    setNewTarget(newTarget + 1);
  };
  const handleDecrement = () => {
    if (newTarget == 0) {
      toast.error("Woah there! Set hours in positive");
      return;
    }
    setNewTarget(newTarget - 1);
  };

  const setTargetHandler = async () => {
    const response = await setStudyTarget(user.email, newTarget, user.token);
    if (response.success) {
      toast.success("Target Set Successfully!");
      const newUser = { ...user };
      newUser.studyTarget = newTarget;
      setUser(newUser);
    }
  };
  return (
    <div className={cardStyle}>
      <div className="w-full text-center mt-8">
        <h1 className="font-semibold text-3xl">Set Target 🎯</h1>
        <p className="text-center max-w-[35ch] my-1 mx-auto text-white/80">
          What is your desired daily study goal for this week?
        </p>
      </div>
      <div className="flex items-center justify-center absolute top-1/2 text-4xl left-1/2 -translate-x-1/2 ">
        <button onClick={handleDecrement}>-</button>
        <input
          type="text"
          readOnly
          placeholder="Enter Hours"
          value={`${
            newTarget
              ? `${newTarget == 1 ? `${newTarget} Hour` : `${newTarget} Hours`}`
              : ""
          }`}
          ref={targetInput}
          className="studyhours max-w-[220px] text-3xl bg-transparent focus:outline-none font-bold"
        />
        <button onClick={handleIncrement}>+</button>
      </div>

      {user?.studyTarget != newTarget && (
        <div className="absolute bottom-3 right-5">
          <button
            className="hover:bg-white/10 p-1 rounded-md"
            onClick={() => {
              setNewTarget(0);
              setNewTarget(
                `${
                  user.studyTarget
                    ? `${
                        user.studyTarget == 1
                          ? `${user.studyTarget}`
                          : `${user.studyTarget}`
                      }`
                    : ""
                }`
              );
            }}
          >
            <IoClose className="text-2xl" />
          </button>
          <button
            className="hover:bg-white/10 p-1 rounded-md"
            onClick={setTargetHandler}
          >
            <IoCheckmark className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

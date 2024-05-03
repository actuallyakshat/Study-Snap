import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { setStudyTarget } from "../../HandleApi/ProductivityDataApiHandler";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const SetStudyTarget = ({ cardStyle, user, setUser }) => {
  const targetInput = useRef(null);
  const [newTarget, setNewTarget] = useState(user ? user.studyTarget : 0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const response = await setStudyTarget(user.email, newTarget);
    setLoading(false);
    if (response.success) {
      toast.success("Target Set Successfully!");
      const newUser = { ...user };
      newUser.studyTarget = newTarget;
      setUser(newUser);
    }
  };
  return (
    <div className={cardStyle}>
      <div className="mt-8 w-full text-center">
        <h1 className="text-3xl font-semibold">Set Target 🎯</h1>
        <p className="mx-auto my-1 max-w-[35ch] text-center text-white/80">
          What is your desired daily study goal for this week?
        </p>
      </div>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 items-center justify-center text-4xl ">
        {loading ? (
          <div className="pt-4">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <button onClick={handleDecrement}>-</button>
            <input
              type="text"
              readOnly
              placeholder="Enter Hours"
              value={`${
                newTarget
                  ? `${
                      newTarget == 1
                        ? `${newTarget} Hour`
                        : `${newTarget} Hours`
                    }`
                  : ""
              }`}
              ref={targetInput}
              className="studyhours max-w-[220px] bg-transparent text-3xl font-bold focus:outline-none"
            />
            <button onClick={handleIncrement}>+</button>
          </>
        )}
      </div>

      {user?.studyTarget != newTarget && (
        <div className="absolute bottom-3 right-5">
          <button
            className="rounded-md p-1 hover:bg-white/10"
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
                }`,
              );
            }}
          >
            <IoClose className="text-2xl" />
          </button>
          <button
            className="rounded-md p-1 hover:bg-white/10"
            onClick={setTargetHandler}
          >
            <IoCheckmark className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

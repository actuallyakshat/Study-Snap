import { useState } from "react";
import toast from "react-hot-toast";
import { setProfileUsername } from "../../HandleApi/AuthApiHandler";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";

function WizardPage() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  const handleFinish = async () => {
    setLoading(true);
    const cleanedUsername = username.trim();
    const containsSpaces = /\s/.test(cleanedUsername);
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(cleanedUsername);
    const minLength = 4;
    const maxLength = 20; // Maximum length for the username

    if (cleanedUsername.length < minLength) {
      toast.error(`Username must be at least ${minLength} characters long.`);
    } else if (cleanedUsername.length > maxLength) {
      toast.error(`Username cannot be more than ${maxLength} characters long.`);
    } else if (containsSpaces) {
      toast.error("Username cannot contain spaces.");
    } else if (containsSpecialChars) {
      toast.error("Username cannot contain special characters.");
    } else {
      console.log(cleanedUsername);
      const response = await setProfileUsername(user.email, cleanedUsername);
      if (response.success) {
        setUser((prevUser) => ({
          ...prevUser,
          username: response.data,
        }));
        toast.success("Username set successfully");
      } else {
        toast.error(response.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div>
        <h1 className="font-bold text-3xl text-center">
          Complete your profile
        </h1>
        <h4 className="text-gray-300">
          Set a username so that your friends can find you
        </h4>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleFinish();
            }
          }}
          onChange={(e) => handleInput(e)}
          className="px-3 mt-5 py-2 h-10 w-full flex-1 bg-slate-800 rounded-lg text-white focus:outline-none"
          placeholder="Some cool username"
        />
        <div className="w-full flex justify-end">
          <button
            disabled={loading}
            onClick={handleFinish}
            className="bg-white px-4 py-1.5 rounded-lg mt-4 text-black text-sm font-medium hover:opacity-90 transition-all duration-200"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default WizardPage;

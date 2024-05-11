import { useState } from "react";
import toast from "react-hot-toast";
import { completeProfile } from "../../HandleApi/AuthApiHandler";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";

function WizardPage() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [username, setUsername] = useState(user?.username);
  const [age, setAge] = useState(user?.age);
  const [bio, setBio] = useState(user?.bio);
  const [loading, setLoading] = useState(false);
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
      if (!bio || !age) {
        toast.error("Please fill all the fields");
      }
      const response = await completeProfile(
        user.email,
        cleanedUsername,
        age,
        bio,
      );
      if (response.success) {
        setUser((prevUser) => ({
          ...prevUser,
          username: response.data.username,
          age: response.data.age,
          bio: response.data.bio,
        }));
        toast.success("Username set successfully");
      } else {
        toast.error(response.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="max-w-lg">
        <h1 className="text-center text-3xl font-bold">
          Complete your profile
        </h1>
        <h4 className="text-center font-medium text-gray-300">
          Prepare your profile before heading out in the wild
        </h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-5 h-10 w-full flex-1 rounded-lg bg-slate-800 px-3 py-2 text-white focus:outline-none"
            placeholder="Username"
          />
          <input
            defaultValue={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            className="mt-5 h-10 w-full flex-1 rounded-lg bg-slate-800 px-3 py-2 text-white focus:outline-none"
            placeholder="Age"
          />
          <input
            defaultValue={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-5 h-10 w-full flex-1 rounded-lg bg-slate-800 px-3 py-2 text-white focus:outline-none"
            placeholder="Profile Bio"
          />
          <div className="flex w-full justify-end">
            <button
              disabled={loading}
              onClick={handleFinish}
              className="mt-4 rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black transition-all duration-200 hover:opacity-90"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WizardPage;

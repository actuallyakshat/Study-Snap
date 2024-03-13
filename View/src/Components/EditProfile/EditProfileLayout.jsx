import { useAtom } from "jotai";
import { userAtom } from "../../Utils/Store";
import { useState } from "react";
import { updateUser } from "../../HandleApi/AuthApiHandler";
import toast from "react-hot-toast";
import { DeleteAccountModal } from "./DeleteAccountModal";
export const EditProfileLayout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const submitHandler = async () => {
    const response = await updateUser(user, newName);
    if (response.success) {
      toast.success("Changes saved successfully!", {
        style: {
          fontWeight: "bold",
        },
      });
    }
    const newUser = { ...user, name: newName };
    setUser(newUser);
    console.log("Finally", user);
  };

  const deleteAccountHandler = async () => {
    setShowModal(true);
  };

  return (
    <div className="w-full bg-EditProfileBg bg-cover bg-center h-full flex items-center justify-center ">
      <div className="flex bg-gray-900/70 shadow-lg shadow-gray-800/50 border border-gray-400/20 py-12 rounded-lg top-0  flex-col items-center justify-center w-full max-w-[30rem] px-7">
        <div className="w-full">
          <h1 className="font-bold text-4xl text-center">Edit Profile</h1>
          <form
            className="mt-4 w-full space-y-4"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <div>
              <label htmlFor="name" className="font-medium block my-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                defaultValue={user?.name}
                onChange={(e) => setNewName(e.target.value)}
                className="rounded-lg text-black bg-white px-2 py-1 w-full focus:outline-0 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {user?.email && (
              <div>
                <label htmlFor="email" className="font-medium block my-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  defaultValue={user?.email}
                  disabled
                  className="rounded-lg text-black cursor-not-allowed bg-white px-2 py-1 w-full focus:outline-0 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
            <div className="w-full pt-1 flex justify-between items-center">
              <button
                onClick={deleteAccountHandler}
                type="button"
                className="bg-red-600 hover:bg-red-600/80 transition-colors px-3 py-2 text-sm rounded-md"
              >
                Delete Account
              </button>
              <DeleteAccountModal
                user={user}
                setUser={setUser}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              <button
                type="submit"
                className="bg-primaryPurple hover:bg-primaryPurple/80 transition-colors px-4 py-2 text-sm rounded-md"
                onClick={submitHandler}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

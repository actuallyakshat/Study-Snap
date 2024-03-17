import { useAtom } from "jotai";
import { userAtom } from "../../Utils/Store";
import { useState } from "react";
import { DeleteAccountModal } from "./DeleteAccountModal";

export const AccountSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const [showModal, setShowModal] = useState(false);

  const deleteAccountHandler = async () => {
    setShowModal(true);
  };

  return (
    <div className="w-full editProfile bg-center px-4 h-full flex items-center justify-center ">
      <div className="flex bg-spaceBlack/80 border-2 border-gray-600/80 py-12 rounded-lg top-0 flex-col items-center justify-center w-full max-w-[35rem] px-7">
        <DeleteAccountModal
          user={user}
          setUser={setUser}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <div className="w-full">
          <h1 className="font-bold text-3xl md:text-4xl text-center">
            Details
          </h1>
          <div className="flex flex-wrap items-center mt-4">
            <p className="font-light text-md md:text-lg mr-3">Name: </p>
            <p className="font-medium text-md md:text-lg">{user?.name}</p>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="font-light text-md md:text-lg mr-3">Email: </p>
            <p className="font-medium text-md md:text-lg">{user?.email}</p>
          </div>
          <div className="max-w-[60%] h-[1px] my-4 mx-auto bg-white/40"></div>
          <h1 className="text-3xl font-bold mx-auto text-center hover:text-red-600 transition-colors w-fit">
            Danger Zone
          </h1>
          <div className="w-full flex items-center pt-4 justify-center">
            <button
              onClick={deleteAccountHandler}
              className="mx- w-fit px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

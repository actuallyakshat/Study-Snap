import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { useState } from "react";
import { DeleteAccountModal } from "./DeleteAccountModal";

export const AccountSettings = () => {
  const [user, setUser] = useAtom(clientUserAtom);
  const [showModal, setShowModal] = useState(false);

  const deleteAccountHandler = async () => {
    setShowModal(true);
  };

  return (
    <div className="editProfile flex h-full w-full items-center justify-center bg-center px-4 ">
      <div className="bg-spaceBlack/80 top-0 flex w-full max-w-[35rem] flex-col items-center justify-center rounded-lg border-2 border-gray-600/80 px-7 py-12">
        <DeleteAccountModal
          user={user}
          setUser={setUser}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <div className="w-full">
          <h1 className="text-center text-3xl font-bold md:text-4xl">
            Details
          </h1>
          <div className="mt-4 flex flex-wrap items-center">
            <p className="text-md mr-3 font-light md:text-lg">Name: </p>
            <p className="text-md font-medium md:text-lg">{user?.name}</p>
          </div>
          <div className="flex flex-wrap items-center">
            <p className="text-md mr-3 font-light md:text-lg">Email: </p>
            <p className="text-md font-medium md:text-lg">{user?.email}</p>
          </div>
          <div className="mx-auto my-4 h-[1px] max-w-[60%] bg-white/40"></div>
          <h1 className="mx-auto w-fit text-center text-3xl font-bold">
            Danger Zone
          </h1>
          <div className="flex w-full items-center justify-center pt-4">
            <button
              onClick={deleteAccountHandler}
              className="mx- w-fit rounded-lg bg-red-600 px-4 py-3 text-sm font-medium transition-colors hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

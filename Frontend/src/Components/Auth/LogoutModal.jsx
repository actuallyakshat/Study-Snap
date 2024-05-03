import { useSetAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
export const LogoutModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const setUser = useSetAtom(clientUserAtom);
  const { signOut } = useClerk();
  const logoutHandler = async () => {
    toast.success("Logged out!");
    setUser(null);
    signOut();
    navigate("/");
  };

  return (
    <div>
      {showModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="popup-overlay fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="popup-content animate-fadeIn animate-slideIn relative left-1/2 top-1/2 max-h-full w-[90%] max-w-[30em] -translate-x-1/2 -translate-y-1/2 p-4 md:w-full">
            <div className="relative rounded-lg bg-white shadow">
              <button
                type="button"
                className="absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                data-modal-hide="popup-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 text-center md:p-5">
                <svg
                  className="mx-auto mb-4 h-12 w-12 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="text-md mb-5 font-normal text-gray-500">
                  Are you sure you wish to logout?
                </h3>
                <div className="space-x-3">
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="hover:text-primaryPurple ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={logoutHandler}
                    className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

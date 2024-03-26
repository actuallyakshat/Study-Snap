import { useState } from "react";
import { deleteUserAccount } from "../../HandleApi/AuthApiHandler";
import "../Auth/ModalAnimation.css";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
export const DeleteAccountModal = ({
  user,
  setUser,
  showModal,
  setShowModal,
}) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const deleteAccountHandler = async () => {
    setLoading(true);
    const response = await deleteUserAccount(user);
    setLoading(false);

    if (response.success) {
      toast.success("Account deleted successfully!");
      setUser(null);
      signOut();
      navigate("/");
    }
  };
  return (
    <div>
      {showModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="overflow-y-auto popup-overlay overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
        >
          <div className="relative popup-content top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full animate-fadeIn animate-slideIn">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
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
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
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
                <h3 className="mb-5 text-md font-normal text-gray-500">
                  Are you sure you wish to delete your account? This is a
                  permananent change and it cannot be reversed.
                </h3>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-x-3">
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primaryPurple"
                    >
                      Cancel
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={deleteAccountHandler}
                      className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

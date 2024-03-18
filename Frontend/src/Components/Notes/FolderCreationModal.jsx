import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userAtom } from "../../Utils/Store";
import { addFolder } from "../../HandleApi/NotesApiHandler";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const FolderCreationModal = ({ addFolderModal, setAddFolderModal }) => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await addFolder(data.title, user.email, user.token);
    if (response.success) {
      const updatedUser = {
        ...user,
        folders: [...user.folders, response.folder],
      };
      setUser(updatedUser);
    }
    setLoading(false);
    setAddFolderModal(false);
    reset();
  };
  useEffect(() => {
    if (addFolderModal) {
      const titleInput = document.getElementById("title");
      if (titleInput) {
        titleInput.focus();
      }
    }
  }, [addFolderModal]);
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      reset();
      setAddFolderModal(false);
    }
  };

  return (
    <>
      {addFolderModal && (
        <div
          onClick={() => setAddFolderModal(false)}
          onKeyDown={handleKeyDown}
          className="popup-overlay w-full h-full z-[11] top-0 backdrop-blur-sm absolute"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content w-[90%] max-w-[30em] md:w-full px-4 py-10 rounded-lg border border-gray-500/40 absolute bg-[#0d1117] shadow-lg shadow-gray-800/20 z-[11] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-3xl mb-4 font-bold text-center">
              Add New Folder
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto space-y-3 max-w-[80%]"
            >
              <div className="space-y-1">
                <label htmlFor="title" className="block font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full rounded-lg py-1 text-black px-2 font-medium focus:ring-2 focus:outline-none focus:ring-blue-600"
                />
              </div>
              {loading ? (
                <div className="w-full flex items-center justify-center pt-3">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="max-w-[80%] w-fit ml-auto gap-2 mt-6 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAddFolderModal(false);
                      reset();
                    }}
                    className="bg-red-600 hover:bg-red-600/80 transition-colors px-3 py-2 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-900/80  hover:bg-blue-900/60 transition-colors px-3 py-2 rounded-md text-sm"
                  >
                    Add Folder
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

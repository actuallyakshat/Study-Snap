import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { addFolder } from "../../HandleApi/NotesApiHandler";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const FolderCreationModal = ({ addFolderModal, setAddFolderModal }) => {
  const [user, setUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await addFolder(data.title, user.email);
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
          className="popup-overlay absolute top-0 z-[11] h-full w-full backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content absolute left-1/2 top-1/2 z-[11] w-[90%] max-w-[30em] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-500/40 bg-[#0d1117] px-4 py-10 shadow-lg shadow-gray-800/20 md:w-full"
          >
            <h1 className="mb-4 text-center text-3xl font-bold">
              Add New Folder
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-[80%] space-y-3"
            >
              <div className="space-y-1">
                <label htmlFor="title" className="block font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full rounded-lg px-2 py-1 font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              {loading ? (
                <div className="flex w-full items-center justify-center pt-3">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="ml-auto mt-6 flex w-fit max-w-[80%] items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddFolderModal(false);
                      reset();
                    }}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-600/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md  bg-blue-900/80 px-3 py-2 text-sm transition-colors hover:bg-blue-900/60"
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

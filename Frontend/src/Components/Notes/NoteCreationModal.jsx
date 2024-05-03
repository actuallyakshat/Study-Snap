import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { addNote } from "../../HandleApi/NotesApiHandler";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

export const NoteCreationModal = ({
  setSelectedNoteId,
  setAddNoteModel,
  setSidebarOpen,
  addNoteModel,
  selectedFolderId,
}) => {
  const [user, setUser] = useAtom(clientUserAtom);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [folderSelected, setFolderSelected] = useState(selectedFolderId);

  const defaultContent = "Content goes here...";
  useEffect(() => {
    if (addNoteModel) {
      setFolderSelected(selectedFolderId);
      const titleInput = document.getElementById("title");
      if (titleInput) {
        titleInput.focus();
      }
    }
  }, [addNoteModel]);
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await addNote(
      data.title,
      defaultContent,
      data.folder,
      user.email,
    );
    if (response.success) {
      setSelectedNoteId(response.note._id);
      setSidebarOpen(false);
      const updatedUserFolders = user.folders.map((folder) => {
        if (folder._id === data.folder) {
          return {
            ...folder,
            notes: [...folder.notes, response.note],
          };
        } else {
          return folder;
        }
      });
      setUser({ ...user, folders: updatedUserFolders });
    }
    setLoading(false);
    setAddNoteModel(false);
    reset();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      reset();
      setAddNoteModel(false);
    }
  };
  return (
    <>
      {addNoteModel && (
        <div
          onClick={() => setAddNoteModel(false)}
          onKeyDown={handleKeyDown}
          className="popup-overlay absolute top-0 z-[11] h-full w-full backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content absolute left-1/2 top-1/2 z-[11] w-[90%] max-w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-500/40 bg-[#0d1117] px-4 py-10 shadow-lg shadow-gray-800/20 md:w-full"
          >
            <h1 className="mb-4 text-center text-3xl font-bold">
              Add New Note
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
              <div className="space-y-1">
                <label htmlFor="folder" className="block font-medium">
                  Choose a folder:
                </label>
                <select
                  {...register("folder")}
                  id="folder"
                  className="w-full rounded-lg px-1 py-1 font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {user?.folders.map((folder) => {
                    return (
                      <option
                        key={folder._id}
                        value={folder._id}
                        selected={
                          folderSelected
                            ? folder._id === folderSelected
                            : folder.name === "unorganized"
                        }
                        className="font-medium text-black"
                      >
                        {folder.name === "unorganized" ? "None" : folder.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {loading ? (
                <div className="flex w-full items-center justify-center pt-3">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddNoteModel(false);
                      reset();
                    }}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primaryPurple hover:bg-primaryPurple/80 rounded-md px-3 py-2 text-sm transition-colors"
                  >
                    Add Note
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

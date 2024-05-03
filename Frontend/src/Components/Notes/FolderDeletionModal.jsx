import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { deleteFolder } from "../../HandleApi/NotesApiHandler";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const FolderDeletionModal = ({
  deleteFolderModal,
  setDeleteFolderModal,
  setSelectedNoteId,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const [user, setUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useState(false);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    if (deleteFolderModal) {
      deleteButtonRef?.current?.focus();
    }
  }, [deleteFolderModal]);

  const deleteFolderHandler = async () => {
    setLoading(true);
    const response = await deleteFolder(selectedFolderId, user.email);
    if (response.success) {
      const updatedFolders = user.folders.filter(
        (folder) => folder._id !== selectedFolderId,
      );
      setUser({ ...user, folders: updatedFolders });
      setSelectedFolderId(null);
      setSelectedNoteId(null);
    }
    setLoading(false);
    setDeleteFolderModal(false);
  };
  return (
    <>
      {deleteFolderModal && (
        <div
          onClick={() => setDeleteFolderModal(false)}
          className="popup-overlay absolute  inset-0 z-[11] flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content absolute left-1/2 top-1/2 z-[11] w-[90%] max-w-[30em] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-500/40 bg-[#0d1117] px-8 py-10 shadow-lg shadow-gray-800/20 md:w-full"
          >
            <h1 className="text-center text-2xl font-bold">Delete Folder</h1>
            <p className="mx-auto mt-2 text-center text-sm font-medium text-gray-100/90">
              Are you sure you want to delete this folder? All the notes inside
              this folder will also be deleted.
            </p>
            {loading ? (
              <div className="mt-4 flex w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="mt-4 flex w-full justify-center gap-3">
                <button
                  onClick={() => setDeleteFolderModal(false)}
                  className="rounded-md border border-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  ref={deleteButtonRef}
                  onClick={deleteFolderHandler}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-700"
                >
                  Delete Folder
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

import { deleteNote } from "../../HandleApi/NotesApiHandler";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
export const NoteDeletionModal = ({
  deleteNoteModal,
  setDeleteNoteModal,
  noteId,
  setSelectedNoteId,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(clientUserAtom);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    if (deleteNoteModal) {
      deleteButtonRef?.current?.focus();
    }
  }, [deleteNoteModal]);
  const deleteNoteHandler = async () => {
    setLoading(true);
    const response = await deleteNote(noteId, user.email);
    if (response.success) {
      toast.success("Note deleted successfully!");
      setSelectedNoteId(null);
      const updatedFolders = user.folders.map((folder) => ({
        ...folder,
        notes: folder.notes.filter((note) => note._id !== noteId),
      }));
      setUser({ ...user, folders: updatedFolders });
    }
    setLoading(false);
    setDeleteNoteModal(false);
  };
  return (
    <>
      {deleteNoteModal && (
        <div
          onClick={() => setDeleteNoteModal(false)}
          className="popup-overlay absolute inset-0 z-[11] flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content absolute left-1/2 top-1/2 z-[11] w-[90%] max-w-[30em] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-500/40 bg-[#0d1117] px-8 py-10 shadow-lg shadow-gray-800/20 md:w-full"
          >
            <h1 className="text-center text-2xl font-bold">Delete Note</h1>
            <p className="mx-auto mt-2 text-center text-sm font-medium text-gray-100/90">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            {loading ? (
              <div className="mt-4 flex w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="mt-4 flex w-full justify-center gap-3">
                <button
                  onClick={() => setDeleteNoteModal(false)}
                  className="rounded-md border border-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  ref={deleteButtonRef}
                  onClick={deleteNoteHandler}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm transition-colors hover:bg-red-700"
                >
                  Delete Note
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

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
          className="absolute inset-0 flex items-center justify-center z-[11] popup-overlay"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="popup-content w-[90%] max-w-[30em] md:w-full px-8 py-10 rounded-lg border border-gray-500/40 absolute bg-[#0d1117] shadow-lg shadow-gray-800/20 z-[11] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="font-bold text-2xl text-center">Delete Note</h1>
            <p className="text-sm mx-auto font-medium text-gray-100/90 mt-2 text-center">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            {loading ? (
              <div className="w-full flex items-center justify-center mt-4">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="w-full flex justify-center gap-3 mt-4">
                <button
                  onClick={() => setDeleteNoteModal(false)}
                  className="border hover:bg-red-700 border-red-600 px-3 py-2 transition-colors rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  ref={deleteButtonRef}
                  onClick={deleteNoteHandler}
                  className="bg-red-600 hover:bg-red-700 transition-colors px-3 py-2 rounded-md text-sm"
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

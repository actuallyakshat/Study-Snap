import { useState, useEffect } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { Note } from "./Note";
import { sidebarOpenAtom, clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
import { IoMdClose } from "react-icons/io";
import { FolderCard } from "./FolderCard";
import { NoteCard } from "./NoteCard";
import { CloseSidebarOverlay } from "./CloseSidebarOverlay";
import { NoteCreationModal } from "./NoteCreationModal";
import { FolderCreationModal } from "./FolderCreationModal";
import { FolderDeletionModal } from "./FolderDeletionModal";

export const NotesLayout = () => {
  const [user] = useAtom(clientUserAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [folders, setFolders] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedFolderId, setSelectedFolerId] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(null);
  const [addNoteModel, setAddNoteModel] = useState(false);
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [deleteFolderModal, setDeleteFolderModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
  };

  useEffect(() => {
    if (user) {
      // Exclude the unorganised folder from folders list
      const filteredFolders = user.folders.filter(
        (folder) => folder.name !== "unorganized",
      );
      setFolders(filteredFolders);
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filteredNotesArray = user?.folders?.reduce((acc, folder) => {
        const filteredFolderNotes = folder.notes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return acc.concat(filteredFolderNotes);
      }, []);
      setFilteredNotes(filteredNotesArray);
    }
  }, [folders, searchQuery, user]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddNote = () => {
    setAddNoteModel(true);
  };

  const handleAddFolder = () => {
    setAddFolderModal(true);
  };

  return (
    <div className="h-full flex-1">
      <CloseSidebarOverlay />
      <FolderDeletionModal
        deleteFolderModal={deleteFolderModal}
        setDeleteFolderModal={setDeleteFolderModal}
        setSelectedNoteId={setSelectedNoteId}
        setSelectedFolderId={setSelectedFolerId}
        selectedFolderId={selectedFolderId}
      />
      <NoteCreationModal
        selectedFolderId={selectedFolderId}
        setSidebarOpen={setSidebarOpen}
        setSelectedNoteId={setSelectedNoteId}
        setAddNoteModel={setAddNoteModel}
        addNoteModel={addNoteModel}
      />
      <FolderCreationModal
        addFolderModal={addFolderModal}
        setAddFolderModal={setAddFolderModal}
      />
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  bg-spaceBlack absolute left-0 top-0 z-[10] h-full w-screen flex-1 space-y-2 overflow-y-auto border-gray-400/50 px-4 py-6 pt-[3.5em] transition-transform duration-300 sm:w-full sm:max-w-[25em] sm:border-r`}
      >
        <IoMdClose
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 size-7 cursor-pointer"
        />
        <div className="mb-6 flex w-full items-center justify-between gap-4">
          <div className="relative flex-1">
            {searchQuery && (
              <IoMdClose
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
              />
            )}
            <input
              type="text"
              placeholder="Search Notes"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full flex-1 rounded-lg bg-gray-50 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/80"
            />
          </div>

          <div className="flex cursor-pointer items-center justify-center gap-1">
            <i
              onClick={handleAddFolder}
              className="rounded-lg px-1 py-1 transition-colors hover:bg-white/20 hover:text-gray-300"
            >
              <AiOutlineFolderAdd className="size-7" />
            </i>
            <i
              onClick={handleAddNote}
              className="cursor-pointer rounded-lg px-1 py-1 transition-colors hover:bg-white/20 hover:text-gray-300"
            >
              <AiOutlineFileAdd className="size-7" />
            </i>
          </div>
        </div>
        {searchQuery && !filteredNotes?.length && (
          <div className="pt-6 text-center font-medium">
            No search results...
          </div>
        )}
        {searchQuery && filteredNotes && (
          <div className="space-y-2 pt-4">
            {filteredNotes.map((note) => {
              return (
                <NoteCard
                  key={note._id}
                  note={note}
                  isSelected={selectedNoteId === note._id}
                  onSelect={() => handleNoteSelect(note._id)}
                />
              );
            })}
          </div>
        )}

        {!searchQuery && (
          <div className="space-y-2 pt-3">
            {folders?.map((folder) => (
              <div key={folder._id}>
                <FolderCard
                  key={folder._id}
                  folder={folder}
                  isSelected={false}
                  onSelect={() => {}}
                  onNoteSelect={handleNoteSelect}
                  selectedNoteId={selectedNoteId}
                  setDeleteFolderModal={setDeleteFolderModal}
                  setSelectedFolderId={setSelectedFolerId}
                />
              </div>
            ))}
            {/* Render uncategorized notes */}
            {user?.folders &&
              user?.folders
                .find((folder) => folder.name === "unorganized")
                ?.notes?.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    isSelected={selectedNoteId === note._id}
                    onSelect={() => handleNoteSelect(note._id)}
                  />
                ))}
          </div>
        )}
      </div>
      <div className="h-full">
        {!selectedNoteId && (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold">
            <div className="flex h-full max-h-[90%] w-full max-w-[90%] items-center justify-center rounded-lg border border-dashed p-8">
              <h1>Select or Create a Note to Get Started.</h1>
            </div>
          </div>
        )}
        {selectedNoteId && (
          <Note
            note={user?.folders
              ?.flatMap((folder) => folder.notes)
              ?.find((note) => note._id === selectedNoteId)}
            setSelectedNoteId={setSelectedNoteId}
          />
        )}
      </div>
    </div>
  );
};

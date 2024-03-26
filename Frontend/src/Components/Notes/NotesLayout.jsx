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
        (folder) => folder.name !== "unorganized"
      );
      setFolders(filteredFolders);
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filteredNotesArray = user?.folders?.reduce((acc, folder) => {
        const filteredFolderNotes = folder.notes.filter((note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase())
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
        }  sm:border-r absolute left-0 top-0 pt-[3.5em] border-gray-400/50 bg-spaceBlack overflow-y-auto h-full py-6 z-[10] flex-1 sm:w-full sm:max-w-[25em] w-screen px-4 space-y-2 transition-transform duration-300`}
      >
        <IoMdClose
          onClick={() => setSidebarOpen(false)}
          className="size-7 cursor-pointer absolute right-4 top-4"
        />
        <div className="w-full gap-4 flex items-center justify-between mb-6">
          <div className="flex-1 relative">
            {searchQuery && (
              <IoMdClose
                onClick={() => setSearchQuery("")}
                className="absolute cursor-pointer text-black right-3 top-1/2 -translate-y-1/2"
              />
            )}
            <input
              type="text"
              placeholder="Search Notes"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 w-full flex-1 rounded-lg focus:ring-blue-600/80 focus:ring-2 focus:outline-none bg-gray-50 text-gray-900"
            />
          </div>

          <div className="flex gap-1 items-center justify-center cursor-pointer">
            <i
              onClick={handleAddFolder}
              className="hover:bg-white/20 transition-colors rounded-lg py-1 px-1 hover:text-gray-300"
            >
              <AiOutlineFolderAdd className="size-7" />
            </i>
            <i
              onClick={handleAddNote}
              className="hover:bg-white/20 transition-colors rounded-lg py-1 px-1 cursor-pointer hover:text-gray-300"
            >
              <AiOutlineFileAdd className="size-7" />
            </i>
          </div>
        </div>
        {searchQuery && !filteredNotes?.length && (
          <div className="text-center pt-6 font-medium">
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
                  setSelectedFolerId={setSelectedFolerId}
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
          <div className="w-full h-full font-bold text-4xl flex items-center justify-center">
            <div className="p-8 w-full h-full max-w-[90%] max-h-[90%] flex items-center justify-center border border-dashed rounded-lg">
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

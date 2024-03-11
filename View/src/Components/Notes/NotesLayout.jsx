import { useState, useEffect } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { Note } from "./Note";
import { sidebarOpenAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
import { IoMdClose } from "react-icons/io";
import { FolderCard } from "./FolderCard";
import { NoteCard } from "./NoteCard";
import { CloseSidebarOverlay } from "./CloseSidebarOverlay";
import { NoteCreationModal } from "./NoteCreationModal";
import { FolderCreationModal } from "./FolderCreationModal";

// Dummy data representing folders and notes
const initialFolders = [
  {
    id: 0, // Assigning 0 for notes outside of folders
    name: "Notes", // Name for the folder (optional)
    notes: [
      {
        id: 1,
        title: "Note 1",
        dateCreated: "10/01/2024",
        content: "This is note 1.",
      },
      {
        id: 2,
        title: "Note 2",
        dateCreated: "12/01/2024",
        content: "This is note 2.",
      },
      {
        id: 9,
        title: "Note 3",
        dateCreated: "12/01/2024",
        content: "This is note 3.",
      },
    ],
  },
  {
    id: 1,
    name: "Personal",
    notes: [
      {
        id: 3,
        title: "Personal Note 1",
        dateCreated: "10/01/2024",
        content: "This is a personal note 1.",
      },
      {
        id: 4,
        title: "Personal Note 2",
        dateCreated: "12/01/2024",
        content: "This is a personal note 2.",
      },
    ],
  },
  {
    id: 2,
    name: "Work",
    notes: [
      {
        id: 5,
        title: "Work Note 1",
        dateCreated: "11/01/2024",
        content: "This is a work note 1.",
      },
    ],
  },
  {
    id: 3,
    name: "Ideas",
    notes: [
      {
        id: 6,
        title: "Idea 1",
        dateCreated: "09/01/2024",
        content: "This is an idea 1.",
      },
      {
        id: 7,
        title: "Idea 2",
        dateCreated: "08/01/2024",
        content: "This is an idea 2.",
      },
    ],
  },
];

export const NotesLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [folders, setFolders] = useState(initialFolders);
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Updated state
  const [addNoteModel, setAddNoteModel] = useState(false);
  const [addFolderModal, setAddFolderModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId); // Updated function to directly set selected note ID
  };

  useEffect(() => {
    const filteredFolders = initialFolders.map((folder) => ({
      ...folder,
      notes: folder.notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
    setFolders(filteredFolders);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFolders = folders.filter((folder) => folder.id !== 0);

  return (
    <div className="h-full flex-1">
      <CloseSidebarOverlay />
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
        }  sm:border-r absolute left-0 top-0 pt-[3.5em] border-gray-400/50 bg-spaceBlack overflow-y-auto sidebar h-full py-6 z-[10] flex-1 sm:w-full sm:max-w-[25em] w-screen px-4 space-y-2 transition-transform duration-300`}
      >
        <IoMdClose
          onClick={() => setSidebarOpen(false)}
          className="size-7 cursor-pointer absolute right-4 top-4"
        />
        <div className="w-full gap-4 flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search Notes"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 flex-1 rounded-lg focus:ring-blue-600/80 focus:ring-2 focus:outline-none bg-gray-50 text-gray-900"
          />
          <div className="flex gap-1 items-center justify-center cursor-pointer">
            <i
              onClick={() => setAddFolderModal(true)}
              className="hover:bg-white/20 transition-colors rounded-lg py-1 px-1 hover:text-gray-300"
            >
              <AiOutlineFolderAdd className="size-7" />
            </i>
            <i
              onClick={() => setAddNoteModel(true)}
              className="hover:bg-white/20 transition-colors rounded-lg py-1 px-1 cursor-pointer hover:text-gray-300"
            >
              <AiOutlineFileAdd className="size-7" />
            </i>
          </div>
        </div>
        <div className="space-y-2 pt-3">
          {/* Render notes from folders */}
          {filteredFolders.map((folder) => (
            <div key={folder.id}>
              <FolderCard
                folder={folder}
                isSelected={false}
                onSelect={() => {}}
                onNoteSelect={handleNoteSelect}
                selectedNoteId={selectedNoteId}
              />
            </div>
          ))}
          {/* Render uncategorized notes */}
          {folders[0].notes.length > 0 && (
            <div className="space-y-2">
              {folders[0].notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isSelected={selectedNoteId === note.id}
                  onSelect={() => handleNoteSelect(note.id)}
                />
              ))}
            </div>
          )}
        </div>
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
            note={folders
              .flatMap((folder) => folder.notes)
              .find((note) => note.id === selectedNoteId)}
          />
        )}
      </div>
    </div>
  );
};

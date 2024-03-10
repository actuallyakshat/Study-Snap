import { useState, useEffect } from "react";
import { NoteCard } from "./NoteCard";
import { AiFillFileAdd } from "react-icons/ai";
import { Note } from "./Note";
import { sidebarOpenAtom } from "../../Utils/Store";
import { useAtom, useAtomValue } from "jotai";
import { IoMdClose } from "react-icons/io";

const initialNotes = [
  {
    id: 1,
    title: "Lorem Ipsum",
    dateCreated: "10/01/2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula malesuada nisl, vel fringilla nisi tincidunt eget.",
  },
  {
    id: 2,
    title: "Dolor Sit Amet",
    dateCreated: "15/02/2024",
    content:
      "Duis venenatis velit nec purus ultricies, ac ultricies velit suscipit. Nulla facilisi.",
  },
  {
    id: 3,
    title: "Consectetur Adipiscing",
    dateCreated: "20/03/2024",
    content:
      "Praesent nec orci sit amet dolor rhoncus commodo eu vel sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti.",
  },
  {
    id: 4,
    title: "Suspendisse Potenti",
    dateCreated: "25/04/2024",
    content:
      "Morbi vel felis nec nulla dictum blandit. Donec id lorem pretium, posuere urna eget, consequat ex.",
  },
  {
    id: 5,
    title: "Vestibulum Ante Ipsum",
    dateCreated: "30/05/2024",
    content:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam ut varius quam.",
  },
];

export const NotesLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
  };

  useEffect(() => {
    const filteredNotes = initialNotes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNotes(filteredNotes);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  return (
    <div className="h-full flex-1 w-full flex font-Inter">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute z-[9] top-0 w-full h-full"
        ></div>
      )}
      <div
        className={`sm:border-r absolute h-full top-0 pt-[4em] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  border-gray-400/50 bg-spaceBlack py-6 z-[10] flex-1 sm:w-full sm:max-w-[25em] w-screen px-4 space-y-2 transition-transform duration-300 `}
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
          <i>
            <AiFillFileAdd className="size-8 hover:text-gray-300 transition-colors cursor-pointer" />
          </i>
        </div>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isSelected={selectedNoteId === note.id}
            onSelect={() => handleNoteSelect(note.id)}
          />
        ))}
      </div>

      <div className="flex-1">
        {!selectedNote && (
          <div className="w-full h-full font-bold text-4xl flex items-center justify-center">
            <div className="p-8 w-full h-full max-w-[90%] max-h-[90%] flex items-center justify-center border border-dashed rounded-lg">
              <h1>Select or Create a Note to Get Started.</h1>
            </div>
          </div>
        )}
        {selectedNote && <Note note={selectedNote} />}
      </div>
    </div>
  );
};

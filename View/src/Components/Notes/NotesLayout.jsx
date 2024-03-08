import React, { useState, useEffect } from "react";
import { NoteCard } from "./NoteCard";
import { AiFillFileAdd } from "react-icons/ai";
import { Note } from "./Note";

const initialNotes = [
  {
    id: 1,
    title: "Rise and Shine",
    dateCreated: "04/03/2024",
    content:
      "Aaj maine aur vishesh ne football khela. Vishesh ko lag gayi but woh sher ka baccha hai, kuch nahi hoga",
  },
  {
    id: 2,
    title: "Tales of Bennett University",
    dateCreated: "26/01/2024",
    content:
      "Aaj dhruv ko itni bhook lag rahi thi ki usne om ka haath kaat liya. Om ne rote rote mummy ko phone kardiya",
  },
  {
    id: 3,
    title: "Honestly",
    dateCreated: "04/03/2024",
    content:
      "Aaj maine aur vishesh ne football khela. Vishesh ko lag gayi but woh sher ka baccha hai, kuch nahi hoga",
  },
  {
    id: 4,
    title: "Mai hoon na",
    dateCreated: "26/01/2024",
    content:
      "Aaj dhruv ko itni bhook lag rahi thi ki usne om ka haath kaat liya. Om ne rote rote mummy ko phone kardiya",
  },
  {
    id: 5,
    title: "Kabira",
    dateCreated: "04/03/2024",
    content:
      "Aaj maine aur vishesh ne football khela. Vishesh ko lag gayi but woh sher ka baccha hai, kuch nahi hoga",
  },
  {
    id: 6,
    title: "Jwala",
    dateCreated: "26/01/2024",
    content:
      "Aaj dhruv ko itni bhook lag rahi thi ki usne om ka haath kaat liya. Om ne rote rote mummy ko phone kardiya",
  },
];

export const NotesLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
  };

  useEffect(() => {
    // Filter notes based on search query
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
    <div className="h-full w-full flex font-Inter">
      <div className="border-r border-gray-400/50 py-6 h-full w-full max-w-[25rem] px-4 space-y-2">
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
        {selectedNote && <Note note={selectedNote} />}
      </div>
    </div>
  );
};

import { useState } from "react";
import { NoteCard } from "./NoteCard";

export const FolderCard = ({
  folder,
  isSelected,
  onSelect,
  onNoteSelect,
  selectedNoteId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`flex rounded-lg items-center px-4 py-2 cursor-pointer ${
          isSelected ? "bg-gray-700" : ""
        }`}
        onClick={() => {
          onSelect();
          handleToggleExpand();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transition: "transform 0.3s ease" }}
          className={`${
            isExpanded ? "transform rotate-90 -translate-y-1" : ""
          } h-6 w-6 mr-2`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isExpanded ? "M13 5l7 7-7 7" : "M9 5l7 7-7 7"}
          />
        </svg>
        <p className="text-white">{folder.name}</p>
      </div>
      <div className={`pl-8 mt-3 space-y-2 ${isExpanded ? "block" : "hidden"}`}>
        {folder.notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isSelected={selectedNoteId === note.id}
            onSelect={() => onNoteSelect(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

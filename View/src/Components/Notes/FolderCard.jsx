import { useState } from "react";
import { NoteCard } from "./NoteCard";
import { FaTrash } from "react-icons/fa";

export const FolderCard = ({
  folder,
  isSelected,
  onSelect,
  onNoteSelect,
  selectedNoteId,
  setSelectedFolerId,
  setDeleteFolderModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`flex rounded-lg items-center px-4 py-2 cursor-pointer ${
          isExpanded ? "underline" : ""
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
        <div className="flex justify-between items-center w-full">
          <p className="text-white font-semibold">{folder.name}</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDeleteFolderModal(true);
              setSelectedFolerId(folder._id);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors hover:text-red-600"
          >
            <FaTrash className="size-4" />
          </div>
        </div>
      </div>
      <div className={`pl-8 mt-1 space-y-2 ${isExpanded ? "block" : "hidden"}`}>
        {folder.notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            isSelected={selectedNoteId === note._id}
            onSelect={() => onNoteSelect(note._id)} // Pass note's _id
          />
        ))}
      </div>
    </div>
  );
};

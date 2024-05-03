import { useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";
import { FaTrash } from "react-icons/fa";

export const FolderCard = ({
  folder,
  isSelected,
  onSelect,
  onNoteSelect,
  selectedNoteId,
  setSelectedFolderId,
  setDeleteFolderModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center rounded-lg px-4 py-2 ${
          isExpanded ? "underline" : ""
        }`}
        onClick={() => {
          onSelect();
          {
            !isExpanded
              ? setSelectedFolderId(folder._id)
              : setSelectedFolderId(null);
          }
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
            isExpanded ? "-translate-y-1 rotate-90 transform" : ""
          } mr-2 h-6 w-6`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isExpanded ? "M13 5l7 7-7 7" : "M9 5l7 7-7 7"}
          />
        </svg>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold text-white">{folder.name}</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setDeleteFolderModal(true);
              setSelectedFolderId(folder._id);
            }}
            className="rounded-lg p-2 transition-colors hover:bg-white/20 hover:text-red-600"
          >
            <FaTrash className="size-4" />
          </div>
        </div>
      </div>
      <div className={`mt-1 space-y-2 pl-8 ${isExpanded ? "block" : "hidden"}`}>
        {folder?.notes?.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            isSelected={selectedNoteId === note._id}
            onSelect={() => onNoteSelect(note._id)}
          />
        ))}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
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
  const [notes, setNotes] = useState(folder.notes || []);
  const [user, setUser] = useAtom(clientUserAtom);
  const [reorderFlag, setReorderFlag] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReorder = (newOrder) => {
    setReorderFlag(true);
    setNotes(newOrder);
    const updatedFolders = user.folders.map((f) => {
      if (f._id === folder._id) {
        return {
          ...f,
          notes: newOrder,
        };
      }
      return f;
    });
    const updatedUser = {
      ...user,
      folders: updatedFolders,
    };
    setUser(updatedUser);
  };

  const controls = useDragControls();
  return (
    <Reorder.Item
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      key={folder}
      item={folder}
      value={folder}
      dragListener={false}
      dragControls={controls}
    >
      <div className="select-none">
        <div
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg ${
            isExpanded ? "underline" : ""
          }`}
        >
          <div
            onClick={() => {
              {
                !isExpanded
                  ? setSelectedFolderId(folder._id)
                  : setSelectedFolderId(null);
              }
              handleToggleExpand();
            }}
            className="flex w-full items-center gap-1 overflow-hidden rounded-l-lg px-4 py-2"
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
            <div className="max-w-[180px] overflow-hidden truncate">
              <h1 className="overflow-hidden truncate text-lg font-semibold text-white">
                {folder.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-4">
            <div
              style={{ touchAction: "none" }}
              onPointerDown={(e) => controls.start(e)}
              className="cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <i>
                <MdDragIndicator className="size-5 text-gray-400" />
              </i>
            </div>
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
        <div
          className={`mt-1 space-y-2 pl-8 ${isExpanded ? "block" : "hidden"}`}
        >
          <AnimatePresence>
            <Reorder.Group
              as="ul"
              axis="y"
              values={notes}
              onReorder={handleReorder}
            >
              {folder?.notes?.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  isSelected={selectedNoteId === note._id}
                  onSelect={() => {
                    onNoteSelect(note._id);
                  }}
                />
              ))}
            </Reorder.Group>
          </AnimatePresence>
        </div>
      </div>
    </Reorder.Item>
  );
};

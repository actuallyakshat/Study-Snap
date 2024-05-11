import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ToolsMenu({ isOpen, onClose }) {
  const user = useAtomValue(clientUserAtom);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);

  const toolsList = [
    { id: 1, title: "Productivity Tracker", href: "/dashboard" },
    { id: 2, title: "To-Do List", href: "/dashboard/todos" },
    { id: 3, title: "Notes", href: "/dashboard/notes" },
    { id: 4, title: "Whiteboard", href: "/dashboard/whiteboard" },
    { id: 5, title: "Pomodoro Timer", href: "/dashboard/timer" },
    { id: 6, title: "Friends", href: "/dashboard/friends" },
    { id: 7, title: "Profile", href: "/dashboard/profile/" + user?.username },
    { id: 8, title: "Settings", href: "/dashboard/edit-profile" },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setSearchQuery("");
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = searchQuery
      ? toolsList.filter((tool) =>
          tool.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : toolsList;
    setFilteredTools(filtered);
  }, [searchQuery]);

  const handleKeyPress = (e) => {
    if (e.key == "Enter" && filteredTools.length > 0) {
      navigate(filteredTools[0].href);
      //   window.location.href = filteredTools[0].href;
      onClose();
    }
  };

  if (!isOpen) return null;
  if (!user) return null;

  return (
    <div
      className="popup-overlay fixed inset-0 z-[51] flex justify-center"
      onClick={onClose}
    >
      <div className="mt-48 h-fit w-full max-w-lg">
        <h1 className="text-center text-3xl font-extrabold text-gray-300">
          Tools Menu
        </h1>
        <input
          ref={inputRef}
          placeholder="Search"
          className="bg-slate-800/ mt-4 h-10 w-full max-w-xl flex-1 rounded-lg bg-gray-100 px-3 font-bold text-zinc-700 placeholder:py-2 placeholder:font-medium focus:outline-dashed"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <div className="mt-4 space-y-2">
          {filteredTools.map((tool) => (
            <Link
              onClick={onClose}
              to={tool.href}
              key={tool.id}
              className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 px-4 py-2 font-bold text-zinc-700 hover:bg-white/90"
            >
              {tool.title}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

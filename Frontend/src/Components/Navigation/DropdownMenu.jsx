import { useState } from "react";
// import { LogoutModal } from "../Auth/LogoutModal";
import { Link } from "react-router-dom";
// import { clientUserAtom } from "../../Utils/Store";
// import { useAtomValue } from "jotai";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // const [logoutModal, setLogoutModal] = useState(false);
  const { user } = useUser();
  const clientUser = useAtomValue(clientUserAtom);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        {!user?.fullName ? (
          <LoadingSpinner />
        ) : (
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-300"
            id="menu-button"
            aria-expanded={isOpen ? "true" : "false"}
            aria-haspopup="true"
          >
            {user?.fullName.split(" ")[0]}&apos;s Tools
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div
            onClick={toggleMenu}
            className="fixed left-0 top-0 z-[-10] h-full w-full"
          />
          <div className="rounded-md bg-white">
            <Link
              to="/dashboard/"
              className="block h-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-0"
              onClick={toggleMenu}
            >
              Productivity Tracker
            </Link>
            <Link
              to="/dashboard/todos"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-1"
              onClick={toggleMenu}
            >
              To-Do List
            </Link>
            <Link
              to="/dashboard/notes"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-2"
              onClick={toggleMenu}
            >
              Notes
            </Link>
            <Link
              to="/dashboard/whiteboard"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-3"
              onClick={toggleMenu}
            >
              Whiteboard
            </Link>
            <Link
              to="/dashboard/timer"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-4"
              onClick={toggleMenu}
            >
              Pomodoro Timer
            </Link>
            <Link
              to="/dashboard/friends"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-5"
              onClick={toggleMenu}
            >
              Friends
            </Link>
            <Link
              to="/dashboard/study-room"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-6"
              onClick={toggleMenu}
            >
              Study Room
            </Link>
            <Link
              to={`/dashboard/profile/${clientUser?.username}`}
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-7"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              to="/dashboard/edit-profile"
              className="block rounded-md border-t px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              role="menuitem"
              id="menu-item-8"
              onClick={toggleMenu}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

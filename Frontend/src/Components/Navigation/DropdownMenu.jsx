import { useEffect, useState } from "react";
import { LogoutModal } from "../Auth/LogoutModal";
import { Link } from "react-router-dom";
import { clientUserAtom } from "../../Utils/Store";
import { useAtomValue } from "jotai";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { user } = useUser();
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
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold transition-colors text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300"
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
            className="fixed left-0 top-0 z-[-10] w-full h-full"
          />
          <div className="bg-white rounded-md">
            <Link
              to="/dashboard/"
              className="text-gray-700 hover:bg-gray-200 rounded-md h-full font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-0"
              onClick={toggleMenu}
            >
              Productivity Tracker
            </Link>
            <Link
              to="/dashboard/todos"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-1"
              onClick={toggleMenu}
            >
              To-Do List
            </Link>
            <Link
              to="/dashboard/notes"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-2"
              onClick={toggleMenu}
            >
              Notes
            </Link>
            <Link
              to="/dashboard/whiteboard"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-3"
              onClick={toggleMenu}
            >
              Whiteboard
            </Link>
            <Link
              to="/dashboard/timer"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-4"
              onClick={toggleMenu}
            >
              Pomodoro Timer
            </Link>
            <Link
              to="/dashboard/friends"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-5"
              onClick={toggleMenu}
            >
              Friends
            </Link>
            <Link
              to="/dashboard/edit-profile"
              className="text-gray-700 hover:bg-gray-200 rounded-md border-t font-medium block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-6"
              onClick={toggleMenu}
            >
              Settings
            </Link>

            <button
              onClick={() => setLogoutModal(true)}
              className="text-gray-700 hover:bg-gray-200 rounded-md font-medium w-full text-left border-t block px-4 py-2 text-sm"
            >
              Logout
            </button>
            <LogoutModal
              showModal={logoutModal}
              setShowModal={setLogoutModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

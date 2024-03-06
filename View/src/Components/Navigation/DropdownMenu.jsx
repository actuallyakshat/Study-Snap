import { useState } from "react";
import { LogoutModal } from "../Auth/LogoutModal";
import { Link } from "react-router-dom";

function DropdownMenu({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
        >
          {user.name.split(" ")[0]}&apos;s Tools
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
              className="text-gray-700 hover:bg-gray-200 rounded-md hover:bg-gray-200 h-full font-medium block px-4 py-2 text-sm"
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
              id="menu-item-0"
              onClick={toggleMenu}
            >
              To-Do List
            </Link>

            <button
              onClick={() => setLogoutModal(true)}
              className="text-gray-700 hover:bg-gray-200 rounded-md font-medium w-full text-left border-t block px-4 py-2 text-sm"
            >
              Logout
            </button>
            <LogoutModal
              logout={logout}
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

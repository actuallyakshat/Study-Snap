import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

import { useClerk, UserButton } from "@clerk/clerk-react";

export const Navbar = ({ user }) => {
  const { openSignIn } = useClerk();
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();

  return (
    <div className="relative h-[64px] w-full border-b border-white/25 px-4">
      {location.pathname === "/dashboard/notes" && (
        <GiHamburgerMenu
          onClick={() => setSidebarOpen(true)}
          className="absolute left-8 top-1/2 size-5 -translate-y-1/2 cursor-pointer"
        />
      )}
      <div className="mx-auto flex h-full items-center justify-between md:w-[75%]">
        {location.pathname !== "/dashboard/notes" && (
          <Link
            to={user ? "/dashboard" : "/"}
            className="text-xl font-semibold"
          >
            StudySnap
          </Link>
        )}

        <div className="ml-auto flex items-center justify-end space-x-4">
          {!user ? (
            <button
              onClick={() => openSignIn()}
              className="rounded-lg border border-gray-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
            >
              Login
            </button>
          ) : (
            <>
              <DropdownMenu user={user} />
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

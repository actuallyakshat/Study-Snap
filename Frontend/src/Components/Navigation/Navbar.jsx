import { useAtom } from "jotai";
import { clientUserAtom, sidebarOpenAtom } from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { SignInButton, useClerk, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";
const loginUrl = import.meta.env.VITE_LOGINURL;

export const Navbar = ({ user }) => {
  const { openSignIn } = useClerk();
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();

  return (
    <div className="h-[64px] relative w-full px-4 border-b border-white/25">
      {location.pathname === "/dashboard/notes" && (
        <GiHamburgerMenu
          onClick={() => setSidebarOpen(true)}
          className="absolute top-1/2 left-8 -translate-y-1/2 cursor-pointer size-5"
        />
      )}
      <div className="flex h-full items-center mx-auto justify-between md:w-[75%]">
        {location.pathname !== "/dashboard/notes" && (
          <Link to="/" className="font-semibold text-xl">
            StudySnap
          </Link>
        )}

        <div className="flex ml-auto items-center justify-end space-x-4">
          {!user ? (
            <button
              onClick={() => openSignIn()}
              className="transition-colors border border-gray-500 font-semibold hover:text-black hover:bg-white py-2 px-4 text-sm rounded-lg"
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

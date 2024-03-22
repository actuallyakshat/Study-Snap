import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
const loginUrl = import.meta.env.VITE_LOGINURL;

export const Navbar = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();

  const loginHandler = async () => {
    window.open(loginUrl, "_self");
  };

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
              className="py-2 px-4 text-sm rounded-lg font-semibold hover:bg-gray-300 transition-colors bg-white text-black flex items-center justify-center gap-2"
              onClick={loginHandler}
            >
              Login
              <FaGoogle />
            </button>
          ) : (
            <DropdownMenu user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

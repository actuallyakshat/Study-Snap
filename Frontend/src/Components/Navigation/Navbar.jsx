import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  googleCredentialsAtom,
  isAuthenticatedAtom,
  loadingAtom,
  sidebarOpenAtom,
  userAtom,
} from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { getUserDetails } from "../../HandleApi/AuthApiHandler";
import { Link } from "react-router-dom";
import { GiHamburgerMenu, GiToken } from "react-icons/gi";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
export const Navbar = () => {
  const [token, setToken] = useAtom(googleCredentialsAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();

  const onSuccessHandler = (credentialResponse) => {
    setToken(credentialResponse.credential);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
    } else {
      try {
        const decoded = jwtDecode(token);
        const tempUser = decoded;

        const updateUser = async () => {
          if (!loading && isAuthenticated) {
            try {
              const response = await getUserDetails(tempUser, token);
              const userDb = response.data.user;
              const updatedUser = { ...tempUser, ...userDb };
              setUser(updatedUser);
            } catch (error) {
              console.error("Error updating user:", error);
            }
          } else if (!loading && !isAuthenticated) {
            setLoading(false);
          }
        };
        updateUser();
        setLoading(false);
      } catch (error) {
        // setIsAuthenticated(false);
        console.error("Error decoding token:", error);
        toast.error("Please re-login!");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

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
          {!isAuthenticated ? (
            <GoogleLogin
              onSuccess={onSuccessHandler}
              onError={() => {
                toast.error("Something went wrong!");
                console.error("Login Failed");
              }}
              useOneTap
            />
          ) : (
            <DropdownMenu />
          )}
        </div>
      </div>
    </div>
  );
};

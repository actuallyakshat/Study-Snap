import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { loadingAtom, sidebarOpenAtom, userAtom } from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { getUserDetails } from "../../HandleApi/AuthApiHandler";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();

  const {
    logout,
    isAuthenticated,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        return token;
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const updateUser = async () => {
      if (!isLoading && isAuthenticated) {
        try {
          user.token = await fetchToken();
          const response = await getUserDetails(user);
          const userDb = response.data.user;
          const updatedUser = { ...user, ...userDb };
          setUser(updatedUser);
        } catch (error) {
          console.error("Error updating user:", error);
        } finally {
          setLoading(false);
        }
      } else if (!isLoading && !isAuthenticated) {
        setLoading(false);
      }
    };
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

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
            <div className="space-x-4">
              <button onClick={() => loginWithRedirect()}>Login</button>
              <button
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      screen_hint: "signup",
                    },
                  })
                }
              >
                Register
              </button>
            </div>
          ) : (
            <DropdownMenu logout={logout} />
          )}
        </div>
      </div>
    </div>
  );
};

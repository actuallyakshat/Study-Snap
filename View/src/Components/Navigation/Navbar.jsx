import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { LogoutModal } from "../Auth/LogoutModal";
import { useSetAtom } from "jotai";
import { loadingAtom, userAtom } from "../../Utils/Store";
import DropdownMenu from "./DropdownMenu";
import { getUserDetails } from "../../HandleApi/AuthApiHandler";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const setUser = useSetAtom(userAtom);
  const setLoading = useSetAtom(loadingAtom);
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
        return token;
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const updateUser = async () => {
      if (!isLoading && isAuthenticated) {
        try {
          user.token = await fetchToken();
          console.log(user);
          const response = await getUserDetails(user);
          const userDb = response.data.user;
          const updatedUser = { ...user, ...userDb };
          console.log("updatedUser: ", updatedUser);
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
    <div className="h-[64px] w-full px-4 border-b border-white/25">
      <div className="flex h-full items-center mx-auto justify-between md:w-[75%]">
        <Link to="/" className="font-semibold text-xl">
          StudySnap
        </Link>

        {isAuthenticated ? (
          <div className="space-x-3">
            <DropdownMenu user={user} logout={logout} />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

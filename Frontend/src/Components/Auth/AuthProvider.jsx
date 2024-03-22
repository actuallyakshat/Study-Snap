import { createContext, useEffect } from "react";
import {
  checkIfAuthenticated,
  getUserDetails,
} from "../../HandleApi/AuthApiHandler";
import { toast } from "react-hot-toast";
import { useAtom } from "jotai";
import { loadingAtom, userAtom } from "../../Utils/Store";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await checkIfAuthenticated();
        if (response) {
          const details = await getUserDetails(response);
          setUser(details);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

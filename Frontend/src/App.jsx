import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { Navbar } from "./Components/Navigation/Navbar";
import Loading from "./Components/Loading/Loading";
import { loadingAtom, clientUserAtom } from "./Utils/Store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClerkLoaded,
  ClerkLoading,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { getUserDetails } from "./HandleApi/AuthApiHandler";

function App() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { loaded } = useClerk();
  const [clientUser, setClientUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  useEffect(() => {
    if (!loaded) return;
    else if (loaded && !user) return;
    else {
      console.log(user);
      setLoading(true);
      const getDetails = async () => {
        const tempUser = {
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName,
          profilePicture: user?.imageUrl,
        };
        const response = await getUserDetails(tempUser);
        return response;
      };
      getDetails().then((response) => {
        setClientUser(response);
      });
      setLoading(false);
    }
  }, [user, loaded, setClientUser, setLoading]);

  return (
    <>
      <div className="font-Poppins flex flex-col items-center min-h-screen h-full w-full bg-spaceBlack text-white">
        <Toaster />
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
        <ClerkLoaded>
          <div className="flex flex-col items-stretch w-full flex-1 h-full">
            <Navbar user={user} />
            <Routes user={user} />
          </div>
        </ClerkLoaded>
      </div>
    </>
  );
}

export default App;

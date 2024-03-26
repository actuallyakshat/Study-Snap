import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { Navbar } from "./Components/Navigation/Navbar";
import Loading from "./Components/Loading/Loading";
import { loadingAtom, clientUserAtom } from "./Utils/Store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/clerk-react";
import { getUserDetails } from "./HandleApi/AuthApiHandler";

function App() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [clientUser, setClientUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  useEffect(() => {
    if (!user) return;
    else {
      setLoading(true);
      const getDetails = async () => {
        const tempUser = {
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName,
        };
        const response = await getUserDetails(tempUser);
        return response;
      };
      getDetails().then((response) => {
        setClientUser(response);
      });
      navigate("/dashboard");
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <div className="font-Poppins flex flex-col items-center min-h-screen h-full w-full bg-spaceBlack text-white">
        <Toaster />
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
        <div className="flex flex-col items-stretch w-full flex-1 h-full">
          <Navbar user={user} />
          <Routes user={user} />
        </div>
      </div>
    </>
  );
}

export default App;

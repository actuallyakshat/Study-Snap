import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { Navbar } from "./Components/Navigation/Navbar";
import Loading from "./Components/Loading/Loading";
import { loadingAtom, clientUserAtom } from "./Utils/Store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClerkLoaded,
  ClerkLoading,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { getUserDetails } from "./HandleApi/AuthApiHandler";
import ToolsMenu from "./Components/Navigation/ToolsMenu";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        setIsModalOpen((prevState) => !prevState);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col items-center bg-spaceBlack font-Poppins text-white">
        <ToolsMenu isOpen={isModalOpen} onClose={closeModal} />
        <Toaster />
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
        <ClerkLoaded>
          <div className="flex h-full w-full flex-1 flex-col items-stretch">
            <Navbar user={user} />
            <Routes user={user} />
          </div>
        </ClerkLoaded>
      </div>
    </>
  );
}

export default App;

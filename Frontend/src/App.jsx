import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { Navbar } from "./Components/Navigation/Navbar";
import Loading from "./Components/Loading/Loading";
import { loadingAtom, userAtom } from "./Utils/Store";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const loading = useAtomValue(loadingAtom);
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/");
  //   }
  // }, [user, loading]);

  return (
    <>
      <div className="font-Poppins flex flex-col items-center min-h-screen h-full w-full bg-spaceBlack text-white">
        <Toaster />
        {loading ? (
          <Loading />
        ) : (
          <div
            className={`${
              loading ? "hidden" : "flex flex-col items-stretch"
            } w-full flex-1 h-full`}
          >
            <Navbar user={user} />
            <Routes user={user} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

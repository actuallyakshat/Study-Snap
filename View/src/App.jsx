import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { Navbar } from "./Components/Navigation/Navbar";
import Loading from "./Components/Loading/Loading";
import { loadingAtom } from "./Utils/Store";
import { useAtomValue } from "jotai";

function App() {
  const isLoading = useAtomValue(loadingAtom);

  return (
    <div className="font-Poppins flex flex-col items-center min-h-screen h-full w-full bg-spaceBlack text-white">
      <Toaster />
      {isLoading && <Loading />}
      <div
        className={`${
          isLoading ? "hidden" : "flex flex-col items-stretch"
        } w-full flex-1 h-full`}
      >
        <Navbar />
        <Routes />
      </div>
    </div>
  );
}

export default App;

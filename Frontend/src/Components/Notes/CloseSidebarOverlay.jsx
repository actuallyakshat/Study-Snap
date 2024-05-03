import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../Utils/Store";

export const CloseSidebarOverlay = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  return (
    <div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute top-0 z-[9] h-full w-full"
        ></div>
      )}
    </div>
  );
};

import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../Utils/Store";

export const CloseSidebarOverlay = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  return (
    <div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute z-[9] top-0 w-full h-full"
        ></div>
      )}
    </div>
  );
};

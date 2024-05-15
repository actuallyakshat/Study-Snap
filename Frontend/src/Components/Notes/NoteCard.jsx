import { Reorder, useDragControls } from "framer-motion";
import { sidebarOpenAtom } from "../../Utils/Store";
import { useSetAtom } from "jotai";
import { MdDragIndicator } from "react-icons/md";
import toast from "react-hot-toast";
export const NoteCard = ({ note, isSelected, onSelect }) => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const selectionHandler = () => {
    onSelect();
    setSidebarOpen(false);
  };
  const date = new Date(note.dateCreated);
  const controls = useDragControls();

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <Reorder.Item
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      key={note}
      item={note}
      value={note}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={`${
          isSelected
            ? "border border-dashed border-gray-600 bg-gray-700/40"
            : "bg-white/5 hover:bg-black/40"
        } mb-2 flex min-h-[3rem] w-full cursor-pointer select-none flex-col justify-center space-y-1 rounded-lg  transition-colors`}
      >
        <div className="flex items-center gap-3 pl-3 ">
          <div
            style={{ touchAction: "none" }}
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <i>
              <MdDragIndicator className="size-5 text-gray-400" />
            </i>
          </div>
          <div
            onClick={selectionHandler}
            className="flex h-full w-full items-center justify-between gap-5 rounded-r-lg py-3 pr-3"
          >
            <div className="max-w-[190px] overflow-hidden truncate">
              <h1 className="overflow-hidden truncate font-medium">
                {note.title}
              </h1>
            </div>

            <p className="text-sm text-gray-300">{formattedDate}</p>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
};

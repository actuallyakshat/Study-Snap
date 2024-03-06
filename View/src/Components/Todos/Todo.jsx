import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../../HandleApi/TodoApiHandler";
import { MdDragIndicator } from "react-icons/md";
import { toast } from "react-hot-toast";
export const Todo = ({ item, setItems, user, handleUpdateClick }) => {
  const controls = useDragControls();
  const [completed, setCompleted] = useState(item.isCompleted);
  const deleteTodoHandler = async () => {
    const response = await deleteTodo(item._id, user);
    setItems((prevItems) => prevItems.filter((todo) => todo._id !== item._id));
    toast.error("Task deleted successfully!", {
      style: {
        fontWeight: "bold",
      },
    });
    console.log("resposne in delete handler = ", response);
  };
  return (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
    >
      <div className="select-none transition-colors text-md h-10 text-black px-3 rounded-lg bg-gray-200 hover:bg-gray-300 active:bg-slate-200">
        {/* <div className="flex items-center bg-black justify-between gap-2"> */}
        <div className="gap-2 h-full flex-1 flex items-center">
          <div
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab active:cursor-grabbing"
          >
            <i>
              <MdDragIndicator className="size-5" />
            </i>
          </div>
          <div className="flex justify-between h-full cursor-pointer w-full items-center">
            <div
              onClick={() => setCompleted(!completed)}
              className="space-x-2 flex flex-1 h-full items-center"
            >
              <input
                type="checkbox"
                checked={completed}
                className="size-4 rounded-lg bg-primaryPurple accent-primaryPurple bg-grey-700"
              />
              <span
                className={`${completed ? "line-through" : ""} cursor-default`}
              >
                {item.task}
              </span>
            </div>

            <div className="flex justify-self-end h-full items-center gap-2">
              <button
                onClick={() => handleUpdateClick(item.task)}
                className="text-xl cursor-pointer"
              >
                <MdEdit />
              </button>
              <button
                onClick={deleteTodoHandler}
                className="text-xl cursor-pointer"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Reorder.Item>
  );
};

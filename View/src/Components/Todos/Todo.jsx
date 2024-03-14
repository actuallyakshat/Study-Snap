import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteTodo, updateTodoStatus } from "../../HandleApi/TodoApiHandler";
import { MdDragIndicator } from "react-icons/md";
import { toast } from "react-hot-toast";

export const Todo = ({ item, setItems, user, handleUpdateClick }) => {
  const controls = useDragControls();
  const [completed, setCompleted] = useState(item.isCompleted);

  const deleteTodoHandler = async () => {
    setItems((prevItems) => prevItems.filter((todo) => todo._id !== item._id));
    const response = await deleteTodo(item._id, user);
    toast.error("Task deleted successfully!");
    console.log("response in delete handler = ", response);
  };

  const handleCheckboxChange = async () => {
    setCompleted(!completed);
    await updateTodoStatus(item._id);
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
      <div className="select-none border border-gray-600/30 flex items-center transition-colors text-md min-h-10 px-3 rounded-lg bg-slate-700/90 text-white hover:bg-slate-800 active:bg-slate-800/70">
        <div className="gap-1 h-full flex-1 flex items-center">
          <div
            style={{ touchAction: "none" }}
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab active:cursor-grabbing"
          >
            <i>
              <MdDragIndicator className="size-5" />
            </i>
          </div>
          <div className="flex justify-between h-full cursor-pointer w-full items-center">
            <div
              onClick={handleCheckboxChange}
              className="space-x-2 pr-1 ml-0 flex flex-1 h-full items-center"
            >
              <input
                type="checkbox"
                readOnly
                checked={completed}
                className="max-w-[25px] size-4 w-full bg-transparent rounded-lg bg-primaryPurple accent-primaryPurple"
              />
              <span className={`${completed ? "line-through" : ""} py-3`}>
                {item.task}
              </span>
            </div>

            <div className="flex justify-self-end h-full items-center gap-2">
              <button
                onClick={() => handleUpdateClick(item.task, item._id)}
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
      </div>
    </Reorder.Item>
  );
};

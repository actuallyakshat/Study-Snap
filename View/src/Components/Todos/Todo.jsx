import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../../HandleApi/TodoApiHandler";
import { toast } from "react-hot-toast";
export const Todo = ({ item, setItems, user, updating, setUpdating }) => {
  const dragControls = useDragControls();
  const [completed, setCompleted] = useState(item.isCompleted);
  const deleteTodoHandler = async () => {
    //TODO: Delete the todo from the client side
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
    <div className="select-none text-md text-black px-3 cursor-grab active:cursor-grabbing rounded-lg bg-gray-200 hover:bg-gray-300 active:bg-gray-400">
      <Reorder.Item
        value={item}
        id={item}
        dragListener={false}
        dragControls={dragControls}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={() => setCompleted(!completed)}
            className="gap-2 flex-1 py-3 flex items-center"
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUpdating(!updating)}
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
      </Reorder.Item>
    </div>
  );
};

import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteTodo, updateTodoStatus } from "../../HandleApi/TodoApiHandler";
import { MdDragIndicator } from "react-icons/md";

export const Todo = ({
  item,
  setItems,
  user,
  handleUpdateClick,
  setUser,
  setUpdating,
  inputRef,
}) => {
  const controls = useDragControls();
  const [completed, setCompleted] = useState(item.isCompleted);

  const deleteTodoHandler = async () => {
    // Remove the todo from local state
    setUpdating(false);
    inputRef.current.value = "";
    setItems((prevItems) => prevItems.filter((todo) => todo._id !== item._id));
    setUser((prevUser) => ({
      ...prevUser,
      todos: prevUser.todos.filter((todo) => todo._id !== item._id),
    }));
    try {
      // Delete the todo from the server
      await deleteTodo(item._id, user);
    } catch (error) {
      // Handle error if any
      console.error("Error deleting todo:", error);
    }
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
      item={item}
      value={item}
      dragListener={false}
      dragControls={controls}
    >
      <div className="text-md flex min-h-10 select-none items-center rounded-lg border border-gray-600/30 bg-slate-800/80 px-3 text-white transition-colors hover:bg-slate-800 active:bg-slate-800/70">
        <div className="flex h-full flex-1 items-center gap-1">
          <div
            style={{ touchAction: "none" }}
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab active:cursor-grabbing"
          >
            <i>
              <MdDragIndicator className="size-5" />
            </i>
          </div>
          <div className="flex h-full w-full cursor-pointer items-center justify-between">
            <div
              onClick={handleCheckboxChange}
              className="ml-0 flex h-full flex-1 items-center space-x-2 pr-1"
            >
              <input
                type="checkbox"
                readOnly
                checked={completed}
                className="bg-primaryPurple accent-primaryPurple size-4 w-full max-w-[25px] rounded-lg bg-transparent"
              />
              <span className={`${completed ? "line-through" : ""} py-3`}>
                {item.task}
              </span>
            </div>

            <div className="flex h-full items-center gap-2 justify-self-end">
              <button
                onClick={() => handleUpdateClick(item.task, item._id)}
                className="cursor-pointer rounded-lg p-1 text-xl transition-colors hover:text-red-600"
              >
                <MdEdit />
              </button>
              <button
                onClick={deleteTodoHandler}
                className="cursor-pointer rounded-lg p-1 text-xl transition-colors hover:text-red-600"
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

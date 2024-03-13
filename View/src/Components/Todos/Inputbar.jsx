import { useState } from "react";
import { createTodo, updateTodo } from "../../HandleApi/TodoApiHandler";
import DateTimeDisplay from "./DateTimeDisplay";

export const Inputbar = ({
  inputRef,
  user,
  items,
  setItems,
  updating,
  setUpdating,
  todoId,
}) => {
  const [task, setTask] = useState("");

  async function updateTodoItemLocally(todoId, updatedTask) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item._id === todoId) {
          return { ...item, task: updatedTask };
        }
        return item;
      });
    });
  }

  const submitHandler = async () => {
    if (!task) return;
    if (updating) {
      console.log(`updating ${todoId} now!!`);
      const response = await updateTodo(todoId, inputRef.current.value);
      updateTodoItemLocally(todoId, response.task);
      inputRef.current.value = "";
      setUpdating(false);
      console.log("response aaya", response);
    } else {
      inputRef.current.value = "";
      const response = await createTodo(task, user, items.length);
      const updatedItems = [
        ...items,
        { _id: response.data.todo._id, task: task, isCompleted: false },
      ];
      setItems(updatedItems);
    }
    setTask("");
  };

  return (
    <div className="flex flex-col items-center gap-2 mx-auto w-full text-black md:w-full mb-8">
      <DateTimeDisplay />
      <div className="w-full flex gap-3">
        <input
          ref={inputRef}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitHandler();
            }
          }}
          onChange={(e) => setTask(e.target.value)}
          className="px-2 py-2 h-10 flex-1 bg-white/5 rounded-lg text-white focus:outline-none"
        />
        <button
          onClick={submitHandler}
          type="button"
          className="px-6 py-2 font-semibold text-sm md:text-md rounded-md bg-primaryPurple hover:bg-primaryPurple/80 transition-colors text-white"
        >
          {updating ? "Update" : "Add"}
        </button>
        {updating && (
          <button
            onClick={() => {
              setUpdating(false);
              inputRef.current.value = "";
            }}
            type="button"
            className="px-4 py-2 font-semibold text-sm md:text-md rounded-md bg-red-700 hover:bg-red-800 transition-colors text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

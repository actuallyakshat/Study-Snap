import { useState } from "react";
import { createTodo } from "../../HandleApi/TodoApiHandler";
import DateTimeDisplay from "./DateTimeDisplay";

export const Inputbar = ({
  inputRef,
  user,
  items,
  setItems,
  updating,
  setUpdating,
}) => {
  const [task, setTask] = useState("");
  const submitHandler = async () => {
    if (!task) return;
    //TODO: Create a Todo if in create mode or update if in update mode.
    if (updating) {
      console.log("updating now!!");
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
    <div className="flex flex-col items-center gap-2 mx-auto w-full text-black mb-8">
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
          className="px-2 py-2 text-sm h-10 flex-1 rounded-lg bg-gray-200 focus:outline-none"
        />
        <button
          onClick={submitHandler}
          type="button"
          className="px-6 py-2 font-semibold text-md rounded-md bg-[#651b80] hover:bg-[#651b90]/70 transition-colors text-white"
        >
          {updating ? "Update" : "Add"}
        </button>
        {updating && (
          <button
            onClick={() => setUpdating(false)}
            type="button"
            className="px-4  py-2 font-semibold text-md rounded-md bg-red-700 hover:bg-red-800 transition-colors text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

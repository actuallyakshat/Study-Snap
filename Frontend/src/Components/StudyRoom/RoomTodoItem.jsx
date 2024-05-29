import { useEffect, useState } from "react";
import CustomCheckbox from "../Todos/CustomCheckbox";
import toast from "react-hot-toast";
import { MdDragIndicator } from "react-icons/md";
import { Reorder, useDragControls } from "framer-motion";
export default function RoomTodoItem({ todo }) {
  const controls = useDragControls();
  const [completed, setCompleted] = useState(todo.isCompleted);
  const handleCheckboxChange = async () => {
    setCompleted(!completed);
    toast.success("Todo updated");
    // await updateRoomTodoStatus(todo._id);
  };

  return (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={todo}
      item={todo}
      value={todo}
      dragListener={false}
      dragControls={controls}
    >
      <div className="flex items-center gap-3">
        <div
          style={{ touchAction: "none" }}
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab active:cursor-grabbing"
        >
          <i>
            <MdDragIndicator className="size-5 text-gray-400" />
          </i>
        </div>
        <CustomCheckbox
          checked={completed}
          onChange={handleCheckboxChange}
          size="sm"
        />
        {/* <input
              type="checkbox"
              className="checkbox"
              defaultChecked={todo.completed}
            /> */}
        <p
          className={`${completed ? "line-through" : ""} font-medium text-gray-300`}
        >
          {todo.task}
        </p>
      </div>
    </Reorder.Item>
  );
}

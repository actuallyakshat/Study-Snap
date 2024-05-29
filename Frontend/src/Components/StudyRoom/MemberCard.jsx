import { AnimatePresence, Reorder } from "framer-motion";
import RoomTodoItem from "./RoomTodoItem";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";

export default function MemberCard({ member }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    setItems(member.todos);
  }, [member]);
  const [reorderFlag, setReorderFlag] = useState(false);
  const [user, setUser] = useAtom(clientUserAtom);
  const handleReorder = (newOrder) => {
    setReorderFlag(true);
    setItems(newOrder);
  };
  if (!items) return null;
  return (
    <div className="col-span-1 w-full rounded-lg bg-gray-800/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-xl font-bold">{member.name}</h4>
        <h6 className="text-sm font-medium text-gray-300">
          @{member.username}
        </h6>
      </div>
      <h6 className="text-sm font-medium text-gray-300">To-Do List</h6>
      {member.username == user?.username ? (
        <div className="mt-2 space-y-1">
          <AnimatePresence>
            <Reorder.Group
              as="ul"
              axis="y"
              values={items}
              onReorder={handleReorder}
            >
              {items.map((todo, index) => (
                <RoomTodoItem key={index} todo={todo} />
              ))}
            </Reorder.Group>
          </AnimatePresence>
        </div>
      ) : (
        <div>
          <div className="mt-2 space-y-1">
            {items.map((todo, index) => (
              <p
                className={`${todo.completed ? "line-through" : ""} pl-1 font-medium text-gray-200`}
                key={index}
              >
                {todo.task}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

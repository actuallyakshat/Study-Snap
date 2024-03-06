import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { Inputbar } from "./Inputbar";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Utils/Store";
import { InspirationalQuote } from "./InspirationalQuote";
import { Note } from "./Note";

export const TodoLayout = () => {
  const user = useAtomValue(userAtom);
  const [items, setItems] = useState(user && user.todos);
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (user) setItems(user.todos);
  }, [user]);

  return (
    <div className="relative h-full bg-TodoBg bg-cover flex justify-center">
      <div className="min-w-[90%] mx-4 h-[90%] flex flex-col my-6 md:my-16 items-center">
        <div className="flex flex-col md:w-[40%]">
          <h1 className="text-center text-4xl font-bold">
            {user ? user.name.split(" ")[0] : ""}&apos;s To-Do List
          </h1>
          <InspirationalQuote />
          <Inputbar
            user={user}
            items={items}
            updating={updating}
            setItems={setItems}
            setUpdating={setUpdating}
          />
          {items && (
            <Reorder.Group as="ul" axis="y" values={items} onReorder={setItems}>
              <div className="space-y-3">
                {items.map((item) => (
                  <Reorder.Item key={item._id} value={item}>
                    <Todo
                      item={item}
                      setItems={setItems}
                      user={user}
                      updating={updating}
                      setUpdating={setUpdating}
                    />
                  </Reorder.Item>
                ))}
              </div>
            </Reorder.Group>
          )}
        </div>
      </div>
      <Note />
    </div>
  );
};

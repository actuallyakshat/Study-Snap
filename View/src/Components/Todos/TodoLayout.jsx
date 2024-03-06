import { useEffect, useRef, useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { Todo } from "./Todo";
import { Inputbar } from "./Inputbar";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Utils/Store";
import { InspirationalQuote } from "./InspirationalQuote";
import { Note } from "./Note";
import { reorderTodos } from "../../HandleApi/TodoApiHandler";

export const TodoLayout = () => {
  const user = useAtomValue(userAtom);
  const [items, setItems] = useState(user ? user.todos : []);
  const [updating, setUpdating] = useState(false);
  const inputRef = useRef(null);

  const debounceTime = 1500;
  const reorderHandler = async (items) => {
    await reorderTodos(user, items);
  };
  // Function to update todo order with debouncing
  const updateOrderWithDebounce = debounce(() => {
    // Check if the current items array is different from the saved items
    if (JSON.stringify(items) !== JSON.stringify(user.todos)) {
      // Call backend API to update order
      console.log("API CALL", items);
      reorderHandler(items);
    }
  }, debounceTime);

  // Effect to handle debounced order update
  useEffect(() => {
    let timeoutId;
    // Set a timeout to call the API if items haven't changed for debounceTime
    const timeoutFunction = () => {
      timeoutId = setTimeout(() => {
        updateOrderWithDebounce();
      }, debounceTime);
    };

    // Call the timeout function when the component mounts
    timeoutFunction();

    return () => {
      // Clear the timeout when the component unmounts or items change
      clearTimeout(timeoutId);
    };
  }, [items, updateOrderWithDebounce]);

  // Callback function for reorder event
  const handleReorder = (newOrder) => {
    // Update local state immediately
    setItems(newOrder);
  };

  useEffect(() => {
    if (user) setItems(user.todos);
  }, [user]);

  const handleUpdateClick = (title) => {
    setUpdating(true);
    inputRef.current.value = title;
    inputRef.current.focus();
  };

  return (
    <div className="relative h-full bg-TodoBg bg-cover flex justify-center">
      <div className="min-w-[90%] mx-4 h-[90%] flex flex-col my-6 md:my-16 items-center">
        <div className="flex flex-col md:w-[40%]">
          <h1 className="text-center text-4xl font-bold">
            {user ? user.name.split(" ")[0] : ""}&apos;s To-Do List
          </h1>
          <InspirationalQuote />
          <Inputbar
            inputRef={inputRef}
            user={user}
            items={items}
            updating={updating}
            setItems={setItems}
            setUpdating={setUpdating}
          />
          {items && (
            <AnimatePresence>
              <Reorder.Group
                as="ul"
                axis="y"
                values={items}
                onReorder={handleReorder}
              >
                <div className="space-y-3">
                  {items.map((item) => (
                    <Todo
                      key={item._id}
                      item={item}
                      setItems={setItems}
                      user={user}
                      updating={updating}
                      setUpdating={setUpdating}
                      handleUpdateClick={handleUpdateClick}
                    />
                  ))}
                </div>
              </Reorder.Group>
            </AnimatePresence>
          )}
        </div>
      </div>
      <Note />
    </div>
  );
};

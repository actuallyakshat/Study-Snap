import { useEffect, useRef, useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { Todo } from "./Todo";
import { Inputbar } from "./Inputbar";
import { useAtomValue } from "jotai";
import { userAtom } from "../../Utils/Store";
import { InspirationalQuote } from "./InspirationalQuote";

import { reorderTodos } from "../../HandleApi/TodoApiHandler";
import { MiniTimer } from "./MiniTimer";

export const TodoLayout = () => {
  const user = useAtomValue(userAtom);
  const [items, setItems] = useState(user ? user.todos : []);
  const [updating, setUpdating] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const inputRef = useRef(null);

  const debounceTime = 2000;
  const reorderHandler = async (items) => {
    await reorderTodos(user, items);
  };
  var reorderFlag;
  const updateOrderWithDebounce = debounce(() => {
    if (JSON.stringify(items) !== JSON.stringify(user.todos) && reorderFlag) {
      reorderHandler(items);
      reorderFlag = false;
    }
  }, debounceTime);

  useEffect(() => {
    let timeoutId;
    const timeoutFunction = () => {
      timeoutId = setTimeout(() => {
        updateOrderWithDebounce();
      }, debounceTime);
    };
    timeoutFunction();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [items, updateOrderWithDebounce]);

  const handleReorder = (newOrder) => {
    reorderFlag = true;
    setItems(newOrder);
  };

  useEffect(() => {
    if (user) setItems(user.todos);
  }, [user]);

  const handleUpdateClick = (title, _id) => {
    setUpdating(true);
    setTodoId(_id);
    inputRef.current.value = title;
    inputRef.current.focus();
    console.log("BRUH: ", todoId);
  };

  return (
    <div className="relative h-full flex-1 bg-TodoBg bg-cover flex justify-center">
      <div className="min-w-[90%] mx-4 h-[90%] flex flex-col my-6 md:my-16 items-center">
        <div className="flex flex-col md:w-[40%]">
          <h1 className="text-center text-5xl font-Inter font-black">
            To-Do List
          </h1>
          <InspirationalQuote />
          <MiniTimer />
          <Inputbar
            inputRef={inputRef}
            user={user}
            items={items}
            updating={updating}
            setItems={setItems}
            setUpdating={setUpdating}
            todoId={todoId}
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
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { Todo } from "./Todo";
import { Inputbar } from "./Inputbar";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { InspirationalQuote } from "./InspirationalQuote";

import { reorderTodos } from "../../HandleApi/TodoApiHandler";
import { MiniTimer } from "./MiniTimer";

export const TodoLayout = () => {
  const [user, setUser] = useAtom(clientUserAtom);
  const [items, setItems] = useState(user ? user.todos : []);
  const [updating, setUpdating] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [reorderFlag, setReorderFlag] = useState(false);
  const inputRef = useRef(null);

  const debounceTime = 2000;
  const reorderHandler = async (items) => {
    await reorderTodos(user, items);
  };
  const updateOrderWithDebounce = debounce(() => {
    if (reorderFlag) {
      reorderHandler(items);
      setReorderFlag(false);
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
    setReorderFlag(true);
    setItems(newOrder);
    setUser((prevUser) => ({
      ...prevUser,
      todos: newOrder,
    }));
  };

  useEffect(() => {
    if (user) setItems(user.todos);
  }, [user]);

  const handleUpdateClick = (title, _id) => {
    setUpdating(true);
    setTodoId(_id);
    inputRef.current.value = title;
    inputRef.current.focus();
  };

  return (
    <div className="todobg flex h-full flex-1 justify-center">
      <div className="mx-4 my-6 flex h-[90%] min-w-[90%] flex-col items-center md:my-16">
        <div className="flex w-full flex-col md:max-w-[70%] xl:max-w-[50%]">
          <h1 className="font-Inter mt-3 text-center text-5xl font-black md:text-6xl">
            To-Do List
          </h1>
          <InspirationalQuote />
          <MiniTimer />
          <Inputbar
            inputRef={inputRef}
            user={user}
            setUser={setUser}
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
                <div className="mx-auto w-full space-y-3">
                  {items.map((item) => (
                    <Todo
                      key={item._id}
                      item={item}
                      setItems={setItems}
                      user={user}
                      setUser={setUser}
                      updating={updating}
                      setUpdating={setUpdating}
                      inputRef={inputRef}
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

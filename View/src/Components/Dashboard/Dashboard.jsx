import { Route, Routes, Navigate } from "react-router-dom";
import { TodoLayout } from "../Todos/TodoLayout";
import { ProductivityTracker } from "../ProductivityTracker/ProductivityTrackerLayout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadingAtom, userAtom } from "../../Utils/Store";
import { useAtomValue } from "jotai";
import { NotesLayout } from "../Notes/NotesLayout";
import { TimerLayout } from "../Timer/TimerLayout";
export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const isLoading = useAtomValue(loadingAtom);
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/");
      }
    }
  }, [isLoading, navigate, user]);

  return (
    <div className="w-full flex">
      <Routes>
        <Route path="/" index element={<ProductivityTracker />} />
        <Route path="/todos" element={<TodoLayout />} />
        <Route path="/notes" element={<NotesLayout />} />
        <Route path="/timer" element={<TimerLayout />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
};

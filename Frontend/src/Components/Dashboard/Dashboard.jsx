import { Route, Routes, Navigate } from "react-router-dom";
import { TodoLayout } from "../Todos/TodoLayout";
import { ProductivityTrackerLayout } from "../ProductivityTracker/ProductivityTrackerLayout";
import { NotesLayout } from "../Notes/NotesLayout";
import { TimerLayout } from "../Timer/TimerLayout";
import { AccountSettings } from "../AccountSettings/AccountSettings";
export const Dashboard = () => {
  return (
    <div className="w-full flex-1 flex">
      <Routes>
        <Route path="/" index element={<ProductivityTrackerLayout />} />
        <Route path="/todos" element={<TodoLayout />} />
        <Route path="/notes" element={<NotesLayout />} />
        <Route path="/timer" element={<TimerLayout />} />
        <Route path="/edit-profile" element={<AccountSettings />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
};

import { Route, Routes, Navigate } from "react-router-dom";
import { TodoLayout } from "../Todos/TodoLayout";
import { ProductivityTrackerLayout } from "../ProductivityTracker/ProductivityTrackerLayout";
import { NotesLayout } from "../Notes/NotesLayout";
import { TimerLayout } from "../Timer/TimerLayout";
import { AccountSettings } from "../AccountSettings/AccountSettings";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { clientUserAtom } from "../../Utils/Store";
import Loading from "../Loading/Loading";
import { WhiteboardLayout } from "../Whiteboard/WhiteboardLayout";

export const Dashboard = () => {
  const { user } = useUser();
  const { loaded } = useClerk();
  const clientUser = useAtomValue(clientUserAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (loaded && !user) {
      navigate("/");
      console.log("navigating you back");
    }
  }, []);

  return (
    <>
      {!clientUser ? (
        <Loading />
      ) : (
        <div className="w-full flex-1 flex">
          <Routes>
            <Route path="/" index element={<ProductivityTrackerLayout />} />
            <Route path="/todos" element={<TodoLayout />} />
            <Route path="/notes" element={<NotesLayout />} />
            <Route path="/timer" element={<TimerLayout />} />
            <Route path="/whiteboard" element={<WhiteboardLayout />} />
            <Route path="/edit-profile" element={<AccountSettings />} />

            <Route path="/*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
};

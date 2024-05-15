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
import FriendsLayout from "../Friends/FriendsLayout";
import ProfileLayout from "../Profile/ProfileLayout";
import StudyRoomLayout from "../StudyRoom/StudyRoomLayout";

export const Dashboard = () => {
  const { user } = useUser();
  const { loaded } = useClerk();
  const clientUser = useAtomValue(clientUserAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (loaded && !user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {!clientUser ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-1">
          <Routes>
            <Route path="/" index element={<ProductivityTrackerLayout />} />
            <Route path="/todos" element={<TodoLayout />} />
            <Route path="/notes" element={<NotesLayout />} />
            <Route path="/timer" element={<TimerLayout />} />
            <Route path="/whiteboard" element={<WhiteboardLayout />} />
            <Route path="/friends" element={<FriendsLayout />} />
            <Route path="/study-room" element={<StudyRoomLayout />} />
            <Route path="/study-room/:roomCode" element={<StudyRoomLayout />} />
            <Route path="/edit-profile" element={<AccountSettings />} />
            <Route path="/profile/:username" element={<ProfileLayout />} />
            <Route path="/*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
      )}
    </>
  );
};

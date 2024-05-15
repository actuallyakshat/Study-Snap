import { useEffect } from "react";
import FindRoom from "./FindRoom";
import JoinedRoom from "./JoinedRoom";
import toast from "react-hot-toast";

export default function StudyRoomLayout() {
  const roomCode = window.location.pathname.split("/dashboard/study-room/")[1];

  if (!roomCode || roomCode === "") {
    return <FindRoom />;
  }

  return <JoinedRoom roomCode={roomCode} />;
}

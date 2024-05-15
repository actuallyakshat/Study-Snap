import { useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { getRoomDetails } from "../../HandleApi/StudyRoomApiHandler";
import { useNavigate } from "react-router-dom";

export default function JoinedRoom({ roomCode }) {
  console.log(roomCode);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roomDetails, setRoomDetails] = useState(null);
  useEffect(() => {
    async function getRoomDetailsHandler() {
      console.log("using the room code: ", roomCode);
      const response = await getRoomDetails(roomCode);
      if (response.success) {
        setLoading(false);
        setRoomDetails(response);
      } else {
        setLoading(false);
      }
    }
    getRoomDetailsHandler();
  }, [roomCode]);
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-spaceBlack">
        <RiLoaderFill className="size-16 animate-spin" />
      </div>
    );
  if (!loading && !roomDetails) {
    setTimeout(() => {
      navigate("/dashboard/study-room");
    }, 3000);
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-1 bg-spaceBlack">
        <h1 className="text-4xl font-bold text-gray-300">No room found</h1>{" "}
        <h4 className="text-2xl font-semibold text-gray-400">
          The room you are looking for does not exists or has been closed
        </h4>
        <p className="text-lg font-medium text-gray-500">
          Redirecting you back...
        </p>
      </div>
    );
  }
  return <div>JoinedRoom</div>;
}

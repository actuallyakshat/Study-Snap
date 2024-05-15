import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { toast } from "react-hot-toast";
import { createStudyRoom } from "../../HandleApi/StudyRoomApiHandler";
import { useNavigate } from "react-router-dom";
export default function CreateRoomModal({ onClose }) {
  const navigate = useNavigate();
  const user = useAtomValue(clientUserAtom);
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const ref = useRef(null);
  async function handleCreateRoom(e) {
    e.preventDefault();
    if (roomName === "" || roomCode === "") {
      toast.error("Please fill all the fields");
      return;
    }
    toast.loading("Creating Room", { id: "creatingRoom" });
    let completeRoomCode = `${user?.username}-` + roomCode;
    toast.success(completeRoomCode);
    const response = await createStudyRoom(
      roomName,
      completeRoomCode,
      user._id,
    );
    if (response.success) {
      toast.success("Room Created", { id: "creatingRoom" });
      console.log(response);
      onClose();
      navigate("dashboard/study-room/" + completeRoomCode);
    } else {
      toast.error(response.message, { id: "creatingRoom" });
      console.log(response);
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
  return (
    <div
      onClick={onClose}
      className="popup-overlay fixed inset-0 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="popup-content w-full max-w-lg rounded-lg border border-gray-500/40 bg-gray-900 p-6"
      >
        <h1 className="text-3xl font-bold">Create a Room</h1>
        <h5 className="font-medium text-gray-300">
          Enter a name for your room and get started
        </h5>
        <form
          onSubmit={(e) => handleCreateRoom(e)}
          className="mb-4 mt-6 space-y-2"
        >
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium">
              Name
            </label>
            <input
              ref={ref}
              onChange={(e) => setRoomName(e.target.value)}
              type="text"
              id="title"
              placeholder="End Semester Preparation Marathon"
              className="input-form font-medium text-black placeholder:font-medium"
            />
          </div>
          <div className="space-y-1 pb-3">
            <label htmlFor="title" className="text-sm font-medium">
              Room Code
            </label>
            <input
              onChange={(e) => setRoomCode(e.target.value)}
              type="text"
              placeholder={user?.username + "/"}
              className="input-form font-medium text-black placeholder:font-medium"
            />
          </div>
          <button className="btn mt-4 w-full" type="submit">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

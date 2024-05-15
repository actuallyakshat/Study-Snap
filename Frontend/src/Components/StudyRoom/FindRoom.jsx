import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { joinStudyRoom } from "../../HandleApi/StudyRoomApiHandler";
import { clientUserAtom } from "../../Utils/Store";
import { useAtomValue } from "jotai";

export default function FindRoom() {
  const user = useAtomValue(clientUserAtom);
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [createRoomModal, setCreateRoomModal] = useState(false);
  async function handleJoinRoom(e) {
    e.preventDefault();
    setLoading(true);
    const response = await joinStudyRoom(roomCode, user?._id);
    navigate(roomCode);
  }
  return (
    <div className="w-full px-12">
      <div className="flex justify-center">
        <div className="mt-24 space-y-1">
          <h1 className="text-center text-5xl font-bold">Study Room</h1>
          <p className="text-md font-semibold text-gray-300">
            Create or join a study room and study with your friends in real-time
          </p>
          <div>
            <form
              onSubmit={(e) => handleJoinRoom(e)}
              className="flex items-center gap-4 pt-4"
            >
              <input
                type="text"
                className="input placeholder:font-semibold"
                placeholder="Enter Room ID"
                onChange={(e) => setRoomCode(e.target.value)}
              />
              <button className="btn">Join</button>
            </form>
          </div>
          <div className="flex items-center gap-5">
            <div className="h-px w-full bg-gray-400/30"></div>
            <h6 className="w-[30px] py-2 text-center font-semibold text-gray-400">
              or
            </h6>
            <div className="h-px w-full bg-gray-400/30"></div>
          </div>
          <button
            className="btn w-full"
            onClick={() => setCreateRoomModal(true)}
          >
            Create a Room
          </button>
          {createRoomModal && (
            <CreateRoomModal onClose={() => setCreateRoomModal(false)} />
          )}
        </div>
      </div>
      <div className="mt-24">
        <h1 className="text-3xl font-bold">Your Previous Rooms</h1>
        <h6 className="font-semibold text-gray-400">
          Rooms you have joined in the past
        </h6>
        <div>
          <p className="mt-4 text-xl font-bold">Coming soon</p>
        </div>
      </div>
    </div>
  );
}

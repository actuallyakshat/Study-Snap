import { useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { getRoomDetails } from "../../HandleApi/StudyRoomApiHandler";
import { useNavigate } from "react-router-dom";
import MemberCard from "./MemberCard";
import { IoMdPersonAdd } from "react-icons/io";

export default function JoinedRoom({ roomCode }) {
  const dummyMembers = [
    {
      name: "John Doe",
      avatar: "https://avatars.dicebear.com/api/initials/JD.svg",
      username: "johndoe",
      todos: [
        {
          task: "Buy groceries",
          completed: false,
        },
        {
          task: "Go to the gym",
          completed: false,
        },
        {
          task: "Read a book",
          completed: false,
        },
        {
          task: "Watch TV",
          completed: true,
        },
      ],
    },
    {
      name: "Jane Doe",
      avatar: "https://avatars.dicebear.com/api/initials/JD.svg",
      username: "janedoe",
      todos: [
        {
          task: "Buy groceries",
          completed: false,
        },
        {
          task: "Go to the gym",
          completed: false,
        },
        {
          task: "Read a book",
          completed: false,
        },
      ],
    },
    {
      name: "Akshat Doe",
      avatar: "https://avatars.dicebear.com/api/initials/JD.svg",
      username: "akshatdoe",
      todos: [
        { task: "Buy groceries", completed: false },
        { task: "Go to the gym", completed: false },
        { task: "Read a book", completed: false },
        { task: "Watch TV", completed: true },
      ],
    },
    {
      name: "Bruh Doe",
      avatar: "https://avatars.dicebear.com/api/initials/JD.svg",
      username: "actuallyakshat",
      todos: [
        { task: "Buy groceries", completed: false },
        { task: "Go to the gym", completed: false },
        { task: "Read a book", completed: false },
        { task: "Watch TV", completed: true },
      ],
    },
  ];
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
        setRoomDetails(response.studyRoom);
        console.log("room details: ", roomDetails);
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
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-6xl font-bold text-gray-100">
          {roomDetails.title}
        </h1>
        <h4 className="font-medium text-gray-300">{roomDetails.roomCode}</h4>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button className="btn flex w-[120px] items-center justify-center gap-2">
          Invite <IoMdPersonAdd />
        </button>
      </div>
      <div className="mt-10 h-px w-full bg-gray-600" />
      <div className="flex h-full">
        <div className="relative h-full flex-[1] border-r border-gray-300/20 bg-gray-600/10 px-3">
          <h1 className="mt-8 text-center text-3xl font-bold">Chat</h1>
          <div className="absolute bottom-5 left-1/2 flex w-[90%] -translate-x-1/2 items-center gap-3">
            <input
              className="w-full rounded-lg px-4 py-1.5"
              placeholder="Message"
            />
            <button className="btn w-[80px]">Send</button>
          </div>
        </div>
        <div className="h-full flex-[3] px-10 pt-8">
          <h1 className="text-3xl font-bold">Members</h1>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {dummyMembers.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

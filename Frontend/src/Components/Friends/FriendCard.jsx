import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { clientUserAtom } from "../../Utils/Store";
import {
  acceptRequest,
  cancelRequest,
  getAllFriends,
  rejectRequest,
} from "../../HandleApi/FriendsApiHandler";
import { Link } from "react-router-dom";

export default function FriendCard({ request, type }) {
  const [currentUser, setCurrentUser] = useAtom(clientUserAtom);
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    (type == "incoming" ? request.sender : request.receiver) ||
      type == "accepted"
      ? request.sender._id === currentUser._id
        ? request.receiver
        : request.sender
      : null,
  );
  useEffect(() => {
    if (!user || !currentUser) return;
    if (user._id === currentUser._id) return;
    const friendship = currentUser.friends?.find(
      (friend) =>
        friend.receiver._id === user._id || friend.sender._id === user._id,
    );

    if (friendship) {
      setRequestId(friendship._id);
    }
  }, [currentUser, user]);

  const cancelRequestHandler = async () => {
    setLoading(true);
    const response = await cancelRequest(requestId);
    if (response.success) {
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
    }
    setLoading(false);
  };

  const acceptRequestHandler = async () => {
    setLoading(true);
    const response = await acceptRequest(requestId);
    if (response.success) {
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
    }
    setLoading(false);
  };
  const rejectRequestHandler = async () => {
    setLoading(true);
    const response = await rejectRequest(requestId);
    if (response.success) {
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full max-w-[270px] flex-col items-center justify-center rounded-lg border border-gray-500/80 bg-gray-700/10 p-4">
      <img
        src={user.profilePicture}
        className="size-32 rounded-full object-cover"
      />
      <h1 className="mt-2 text-xl font-bold">{user.name}</h1>
      <h4 className="text-sm text-gray-300">{user.username}</h4>
      {type === "incoming" && (
        <div className="mt-3 flex w-full items-center justify-evenly gap-3 ">
          <button
            disabled={loading}
            onClick={rejectRequestHandler}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            Decline
          </button>
          <button
            disabled={loading}
            onClick={acceptRequestHandler}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            Accept
          </button>
        </div>
      )}
      {type === "outgoing" && (
        <button
          disabled={loading}
          onClick={cancelRequestHandler}
          className="mt-4 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
        >
          Cancel Request
        </button>
      )}
      {type === "accepted" && (
        <Link
          to={`/dashboard/profile/${user.username}`}
          className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
        >
          View Profile
        </Link>
      )}
    </div>
  );
}

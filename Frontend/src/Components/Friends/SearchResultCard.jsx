import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import {
  cancelRequest,
  getAllFriends,
  sendRequest,
} from "../../HandleApi/FriendsApiHandler";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function SearchResultCard({ user }) {
  const [currentUser, setCurrentUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(null);
  const [requestId, setRequestId] = useState(null);
  useEffect(() => {
    if (!user || !currentUser) return;
    if (user._id === currentUser._id) return;
    const friendship = currentUser.friends?.find(
      (friend) =>
        friend.receiver._id === user._id || friend.sender._id === user._id,
    );

    if (friendship) {
      setRequestId(friendship._id);
      if (
        friendship.receiver._id === currentUser._id &&
        friendship.status === "pending"
      ) {
        setAlreadyExists("incoming");
      } else if (
        friendship.sender._id === currentUser._id &&
        friendship.status === "pending"
      ) {
        setAlreadyExists("outgoing");
      } else {
        setAlreadyExists("accepted");
      }
    }
  }, [currentUser, user]);

  const sendFriendRequest = async () => {
    setLoading(true);
    const response = await sendRequest(currentUser._id, user._id);
    if (response.success) {
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request sent");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const cancelRequestHandler = async () => {
    setLoading(true);
    const response = await cancelRequest(requestId);
    if (response.success) {
      setAlreadyExists(null);
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request cancelled");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-700/40 p-4">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicture}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <h4 className="text-sm text-gray-300">{user.username}</h4>
          </div>
        </div>
      </div>
      {alreadyExists &&
        (alreadyExists == "accepted" ? (
          <Link
            to={`/dashboard/profile/${user.username}`}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            View Profile
          </Link>
        ) : alreadyExists == "incoming" ? (
          <div className="flex items-center gap-3">
            <button className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black">
              Accept
            </button>
            <button className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black">
              Decline
            </button>
          </div>
        ) : (
          alreadyExists == "outgoing" && (
            <button
              disabled={loading}
              onClick={cancelRequestHandler}
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
            >
              Cancel Request
            </button>
          )
        ))}
      {!alreadyExists &&
        (currentUser?.username !== user.username ? (
          <button
            disabled={loading}
            onClick={sendFriendRequest}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
            Send Request
          </button>
        ) : null)}
    </div>
  );
}

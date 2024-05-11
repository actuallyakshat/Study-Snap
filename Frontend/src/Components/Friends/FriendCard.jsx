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
import toast from "react-hot-toast";

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
    try {
      setLoading(true);
      toast.loading("Cancelling request", { id: "cancellingRequest" });
      const response = await cancelRequest(requestId);
      if (response.success) {
        const response = await getAllFriends(currentUser._id);
        setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
        toast.success("Request cancelled", { id: "cancellingRequest" });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: "cancellingRequest" });
    }
    setLoading(false);
  };

  const acceptRequestHandler = async () => {
    try {
      setLoading(true);
      toast.loading("Accepting request", { id: "acceptingRequest" });
      const response = await acceptRequest(requestId);
      if (response.success) {
        const response = await getAllFriends(currentUser._id);
        setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
        toast.success("Request accepted", { id: "acceptingRequest" });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: "acceptingRequest" });
    }
    setLoading(false);
  };
  const rejectRequestHandler = async () => {
    try {
      setLoading(true);
      toast.loading("Rejecting request", { id: "rejectingRequest" });
      const response = await rejectRequest(requestId);
      if (response.success) {
        const response = await getAllFriends(currentUser._id);
        setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
        toast.success("Request rejected", { id: "rejectingRequest" });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: "rejectingRequest" });
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
        <div className="mt-5 flex w-full items-center justify-evenly gap-3 ">
          <button
            disabled={loading}
            onClick={rejectRequestHandler}
            className="btn"
          >
            Decline
          </button>
          <button
            disabled={loading}
            onClick={acceptRequestHandler}
            className="btn"
          >
            Accept
          </button>
        </div>
      )}
      {type === "outgoing" && (
        <button
          disabled={loading}
          onClick={cancelRequestHandler}
          className="btn mt-4"
        >
          Cancel Request
        </button>
      )}
      {type === "accepted" && (
        <Link to={`/dashboard/profile/${user.username}`} className="btn mt-4">
          View Profile
        </Link>
      )}
    </div>
  );
}

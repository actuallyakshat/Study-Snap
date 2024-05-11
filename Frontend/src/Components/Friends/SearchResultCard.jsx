import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import {
  acceptRequest,
  cancelRequest,
  getAllFriends,
  rejectRequest,
  sendRequest,
} from "../../HandleApi/FriendsApiHandler";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findCommonFriendshipId } from "../../Utils/Functions";
export default function SearchResultCard({ user }) {
  const navigate = useNavigate();
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
    toast.loading("Sending request", { id: "sendingRequest" });
    const response = await sendRequest(currentUser._id, user._id);
    if (response.success) {
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request sent", { id: "sendingRequest" });
    } else {
      toast.error(response.message);
      navigate(0);
    }
    setLoading(false);
  };

  const cancelRequestHandler = async () => {
    setLoading(true);
    toast.loading("Cancelling request", { id: "cancellingRequest" });
    const response = await cancelRequest(requestId);
    if (response.success) {
      setAlreadyExists(null);
      const response = await getAllFriends(currentUser._id);
      setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request cancelled", { id: "cancellingRequest" });
    } else {
      toast.error(response.message);
      navigate(0);
    }
    setLoading(false);
  };

  const acceptHandler = async () => {
    try {
      setLoading(true);
      console.log(user.friends, currentUser.friends);
      toast.loading("Accepting request", { id: "acceptingRequest" });
      const friendshipId = findCommonFriendshipId(
        user.friends,
        currentUser.friends,
      );
      console.log(friendshipId);
      const response = await acceptRequest(friendshipId);
      if (response.success) {
        const response = await getAllFriends(currentUser._id);
        setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
        toast.success("Request accepted", { id: "acceptingRequest" });
      }
    } catch (e) {
      toast.error(e.message);
      navigate(0);
    }
    setLoading(false);
  };

  const declineHandler = async () => {
    try {
      setLoading(true);
      toast.loading("Declining request", { id: "decliningRequest" });
      const friendshipId = findCommonFriendshipId(
        user.friends,
        currentUser.friends,
      );
      console.log(friendshipId);
      const response = await rejectRequest(friendshipId);
      if (response.success) {
        setAlreadyExists(null);
        toast.success("Request declined", { id: "decliningRequest" });
      }
    } catch (e) {
      toast.error(e.message);
      navigate(0);
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
          <Link to={`/dashboard/profile/${user.username}`} className="btn">
            View Profile
          </Link>
        ) : alreadyExists == "incoming" ? (
          <div className="flex items-center gap-3">
            <button className="btn" onClick={acceptHandler}>
              Accept
            </button>
            <button className="btn" onClick={declineHandler}>
              Decline
            </button>
          </div>
        ) : (
          alreadyExists == "outgoing" && (
            <button
              disabled={loading}
              onClick={cancelRequestHandler}
              className="btn"
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
            className="btn"
          >
            Send Request
          </button>
        ) : null)}
    </div>
  );
}

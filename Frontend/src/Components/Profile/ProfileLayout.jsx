import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { getProfileDetails } from "../../HandleApi/AuthApiHandler";
import { RiLoaderFill } from "react-icons/ri";
import { StudyTracker } from "../ProductivityTracker/StudyTracker";
import { FaFire } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import ViewImageModal from "./ViewImageModal";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import RemoveFriendModal from "./RemoveFriendModal";
import {
  getAllFriends,
  sendRequest,
  cancelRequest,
  acceptRequest,
  rejectRequest,
} from "../../HandleApi/FriendsApiHandler";
import toast from "react-hot-toast";
import { findCommonFriendshipId } from "../../Utils/Functions";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [operationsLoading, setOperationsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(clientUserAtom);
  const [friends, setFriends] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [removeFriendModal, setRemoveFriendModal] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    async function getProfileDetailsHandler() {
      setLoading(true);
      try {
        const response = await getProfileDetails(username);
        setProfileDetails(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getProfileDetailsHandler();
  }, [username]);

  useEffect(() => {
    if (user) {
      const userFriends = user?.friends?.reduce((acc, friend) => {
        const friendObject =
          friend.sender._id.toString() === user._id.toString()
            ? friend.receiver
            : friend.sender;
        if (friendObject._id.toString() !== user._id.toString()) {
          acc.push(friendObject);
        }
        return acc;
      }, []);
      const acceptedFriends = user?.friends?.reduce((acc, friend) => {
        if (friend.status === "accepted") {
          const friendObject =
            friend.sender._id.toString() === user._id.toString()
              ? friend.receiver
              : friend.sender;
          if (friendObject._id.toString() !== user._id.toString()) {
            acc.push(friendObject);
          }
        }
        return acc;
      }, []);
      setAcceptedFriends(acceptedFriends);
      setFriends(userFriends);

      const pendingRequest = user?.friends?.find(
        (friend) =>
          (friend.receiver._id === profileDetails?._id ||
            friend.sender._id === profileDetails?._id) &&
          friend.status === "pending",
      );
      if (pendingRequest) {
        setRequestId(pendingRequest._id);
        if (pendingRequest.sender._id === user?._id) {
          setRequestStatus("sent"); // If the current user received the request
        } else {
          setRequestStatus("received"); // If the current user sent the request
        }
      }
    }
  }, [user, profileDetails]);

  const handleRemoveFriend = () => {
    // Logic to remove friend
    setRemoveFriendModal(true);
  };

  const handleCancelRequest = async () => {
    setOperationsLoading(true);
    toast.loading("Cancelling request", { id: "cancellingRequest" });
    const response = await cancelRequest(requestId);
    if (response.success) {
      const response = await getAllFriends(user?._id);
      setUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request canceled", { id: "cancellingRequest" });
      setOperationsLoading(false);
      setRequestId(null);
      setRequestStatus(null);
    } else {
      toast.error(response.message, { id: "cancellingRequest" });
      navigate(0);
    }
  };

  const handleAcceptRequest = async () => {
    // Logic to accept request
    try {
      const friendshipId = findCommonFriendshipId(
        profileDetails?.friends,
        user?.friends,
      );
      setOperationsLoading(true);
      toast.loading("Accepting request", { id: "acceptingRequest" });
      console.log(friendshipId);
      const response = await acceptRequest(friendshipId);
      if (response.success) {
        const response = await getAllFriends(user?._id);
        console.log(response);
        setUser((prev) => ({ ...prev, friends: response.friends }));
        toast.success("Request accepted", { id: "acceptingRequest" });
      }
    } catch (e) {
      toast.error("Couldn't accept request", { id: "acceptingRequest" });
    }
    setOperationsLoading(false);
    setRequestStatus(null);
  };

  const handleDeclineRequest = async () => {
    // Logic to decline request
    try {
      setOperationsLoading(true);
      toast.loading("Declining request", { id: "decliningRequest" });
      const response = await rejectRequest(requestId);
      console.log(response);
      if (response.success) {
        toast.success("Request declined", { id: "decliningRequest" });
        setRequestId(null);
        setRequestStatus(null);
      }
    } catch (e) {
      toast.error("Couldn't decline request", { id: "decliningRequest" });
    }
    setOperationsLoading(false);
  };

  const handleAddFriend = async () => {
    setOperationsLoading(true);
    toast.loading("Sending request", { id: "sendingRequest" });
    const response = await sendRequest(user._id, profileDetails._id);
    if (response.success) {
      const response = await getAllFriends(user._id);
      setUser((prev) => ({ ...prev, friends: response.friends }));
      toast.success("Request sent", { id: "sendingRequest" });
    } else {
      toast.error(response.message, { id: "sendingRequest" });
      navigate(0);
    }
    setOperationsLoading(false);
  };

  const renderEditOrRemoveButton = () => {
    if (user?.username === profileDetails.username) {
      return (
        <button
          disabled={operationsLoading}
          onClick={() => setEditProfileModal(true)}
          className="btn"
        >
          Edit Profile
        </button>
      );
    } else if (
      acceptedFriends?.find((friend) => friend._id === profileDetails._id)
    ) {
      return (
        <button
          disabled={operationsLoading}
          onClick={handleRemoveFriend}
          className="btn"
        >
          Remove Friend
        </button>
      );
    }
  };

  const renderFriendshipButtons = () => {
    if (requestStatus === "sent") {
      return (
        <button
          disabled={operationsLoading}
          onClick={handleCancelRequest}
          className="btn"
        >
          Cancel Request
        </button>
      );
    } else if (requestStatus === "received") {
      return (
        <div className="space-x-3">
          <button
            disabled={operationsLoading}
            onClick={handleAcceptRequest}
            className="btn"
          >
            Accept Request
          </button>
          <button
            disabled={operationsLoading}
            onClick={handleDeclineRequest}
            className="btn"
          >
            Decline Request
          </button>
        </div>
      );
    } else if (
      !acceptedFriends?.find((friend) => friend._id === profileDetails._id)
    ) {
      return (
        <button
          disabled={operationsLoading}
          className="btn"
          onClick={handleAddFriend}
        >
          Add Friend
        </button>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <RiLoaderFill className="size-16 animate-spin" />
      </div>
    );
  }

  if (!profileDetails)
    return (
      <div className="flex w-full items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-400">No profile found</h1>
      </div>
    );

  return (
    <div className="container mx-auto flex flex-col gap-2 px-3 py-14 md:flex-row md:gap-10">
      <div className="flex w-full items-center justify-center md:w-fit md:items-start">
        <div>
          <img
            src={profileDetails.profilePicture}
            alt="Profile"
            onClick={() => setViewImageModal(true)}
            className="mx-auto aspect-square w-72 -translate-y-2 cursor-pointer rounded-full object-cover"
          />
          {viewImageModal && (
            <ViewImageModal
              setViewImageModal={setViewImageModal}
              imageUrl={profileDetails.profilePicture}
            />
          )}
          <div className="mt-3 hidden flex-col gap-3 md:flex">
            <ProfileCard
              title={"Friends"}
              icon={<FaUserFriends />}
              value={acceptedFriends?.length}
            />
            <ProfileCard
              title={"Current Streak"}
              icon={<FaFire />}
              value={profileDetails?.streak}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <h1 className="text-3xl font-bold">{profileDetails.name}, </h1>
              <h5 className="text-3xl font-bold text-gray-400">
                {profileDetails?.age}
              </h5>
            </div>
            <div className="flex flex-col items-center justify-center md:items-start">
              <h3 className="-mt-1 font-semibold text-gray-300">{username}</h3>
              <p className="mb-2 mt-3 font-sans font-medium">
                {profileDetails?.bio}
              </p>
            </div>
          </div>
          <div>
            {renderEditOrRemoveButton()}
            {user?.username !== profileDetails?.username &&
              renderFriendshipButtons()}
          </div>
        </div>

        <div className="w-full">
          <StudyTracker user={profileDetails} />
        </div>
      </div>
      {removeFriendModal && (
        <RemoveFriendModal
          profileDetails={profileDetails}
          name={profileDetails?.name}
          onClose={() => setRemoveFriendModal(false)}
        />
      )}
    </div>
  );
}

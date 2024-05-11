import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function ProfileLayout() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(clientUserAtom);
  const [friends, setFriends] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  useEffect(() => {
    async function getProfileDetailsHandler() {
      setLoading(true);
      try {
        const response = await getProfileDetails(username);
        setProfileDetails(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getProfileDetailsHandler();
  }, [username]);

  useEffect(() => {
    if (user) {
      const userFriends = user.friends.reduce((acc, friend) => {
        const friendObject =
          friend.sender._id.toString() === user._id.toString()
            ? friend.receiver
            : friend.sender;
        if (friendObject._id.toString() !== user._id.toString()) {
          acc.push(friendObject);
        }
        return acc;
      }, []);
      setFriends(userFriends);
      console.log(userFriends);
    }
  }, [user]);

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
              value={friends?.length}
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
              {/* <div className="flex flex-col gap-3 md:mt-3 md:flex-row">
            <ProfileCard
              title={"Friends"}
              icon={<FaUserFriends />}
              value={friends?.length}
            />
            <ProfileCard
              title={"Current Streak"}
              icon={<FaFire />}
              value={profileDetails?.streak}
            />
          </div> */}
            </div>
          </div>
          {user?.username == username && (
            <div>
              <buton onClick={() => setEditProfileModal(true)} className="px-4">
                Edit Profile
              </buton>
              {editProfileModal && <EditProfileModal />}
            </div>
          )}
        </div>

        <div className="w-full">
          <StudyTracker user={profileDetails} />
        </div>
      </div>
    </div>
  );
}

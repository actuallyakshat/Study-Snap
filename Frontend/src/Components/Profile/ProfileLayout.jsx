import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { getProfileDetails } from "../../HandleApi/AuthApiHandler";
import { RiLoaderFill } from "react-icons/ri";
import { StudyTracker } from "../ProductivityTracker/StudyTracker";
export default function ProfileLayout() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(clientUserAtom);
  const [friends, setFriends] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  console.log(username);
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
    <div className="container mx-auto flex flex-col gap-10 px-3 py-14 md:flex-row">
      <div className="w-fit">
        <img
          src={profileDetails.profilePicture}
          alt="Profile"
          className="aspect-square w-72 -translate-y-2 rounded-full object-cover"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{profileDetails.name}, </h1>
          <h5 className="text-3xl font-bold text-gray-400">21</h5>
        </div>
        <h3 className="text-lg font-semibold text-gray-300">{username}</h3>
        <p>Pursuing B.Tech at Bennett University</p>
        <p>Friends: {friends?.length}</p>
        <div className="w-full">
          <StudyTracker user={profileDetails} />
        </div>
      </div>
    </div>
  );
}

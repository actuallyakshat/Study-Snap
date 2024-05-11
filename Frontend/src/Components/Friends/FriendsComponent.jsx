import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import RequestsComponentCard from "./FriendCard";
import Leaderboard from "./Leaderboard";

export default function FriendsComponent() {
  const [showSentRequests, setShowSentRequests] = useState(false);
  const user = useAtomValue(clientUserAtom);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) return;
    const outgoingreqs = user.friends.filter((friend) => {
      return (
        friend.status === "pending" &&
        friend.sender._id?.toString() === user._id.toString()
      );
    });

    setOutgoingRequests(outgoingreqs);
    setAllFriends(
      user.friends?.filter((friend) => friend.status === "accepted"),
    );
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filteredFriendsArray = allFriends?.filter((friend) => {
        const isCurrentUserSender =
          friend.sender._id.toString() === user._id.toString();
        const friendName = isCurrentUserSender
          ? friend.receiver.name
          : friend.sender.name;
        const includes = friendName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return includes;
      });
      setFilteredFriends(filteredFriendsArray);
    } else {
      setFilteredFriends(allFriends);
    }
  }, [allFriends, searchQuery, user]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (showSentRequests)
    return (
      <div>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Requests Sent</h1>
          <button onClick={() => setShowSentRequests(false)} className="btn">
            Go back
          </button>
        </div>
        <div className="mt-5 flex flex-wrap justify-around gap-5 sm:justify-start">
          {outgoingRequests.length > 0 ? (
            outgoingRequests.map((request) => (
              <RequestsComponentCard
                key={request._id}
                request={request}
                type={"outgoing"}
              />
            ))
          ) : (
            <h1 className="text-xl font-bold text-gray-400">
              No outgoing requests
            </h1>
          )}
        </div>
      </div>
    );

  return (
    <div>
      <Leaderboard />
      <div>
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Friends</h1>
            <h4 className="text-gray-300">
              List of all your friends. You can compare your performance with
              your friends!
            </h4>
          </div>
          <button onClick={() => setShowSentRequests(true)} className="btn">
            Sent Requests
          </button>
        </div>
        <div>
          <div className="my-5">
            <input
              onChange={handleSearchChange}
              value={searchQuery}
              type="text"
              placeholder="Search"
              className="h-10 w-full max-w-[270px] flex-1 rounded-lg bg-slate-800 px-3 py-2 font-semibold text-white placeholder:font-bold focus:outline-none"
            />
          </div>
          {allFriends.length == 0 && (
            <h1 className="text-xl font-bold text-gray-400">
              You current don&apos; have any friends
            </h1>
          )}
          <div className="my-4 flex flex-wrap justify-around gap-4 sm:justify-start">
            {allFriends.length > 0 &&
              (filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <RequestsComponentCard
                    key={friend._id}
                    request={friend}
                    type={friend.status}
                  />
                ))
              ) : (
                <h1 className="text-xl font-bold text-gray-400">No matches</h1>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

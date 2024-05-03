import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";

export default function Leaderboard() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [friends, setFriends] = useState([]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <h4 className="text-gray-300">
        Compete with your friends and top the studied hours leaderboard!
      </h4>
      <div className="h-64">
        {friends.map((friend) => (
          <div key={friend._id}>{friend.name}</div>
        ))}
      </div>
    </div>
  );
}

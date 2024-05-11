import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import {
  getTotalHoursStudiedThisMonthByUser,
  sumHours,
} from "../../Utils/Functions";
import LeaderboardGraph from "./LeaderboardGraph";

export default function Leaderboard() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [friends, setFriends] = useState([]);
  const [leaderboardData, setLeaderBoardData] = useState([]);

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
    }
  }, [user]);

  useEffect(() => {
    const usersMonthlyHoursStudied = sumHours(
      user?.name,
      user?.productivityData?.Monthly,
    );
    const result = getTotalHoursStudiedThisMonthByUser(friends);
    result.push(usersMonthlyHoursStudied);
    console.log("setting", result);
    setLeaderBoardData(result);
  }, [user, friends]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <h4 className="text-gray-300">
        Compete with your friends and top the monthly hours studied leaderboard!
      </h4>
      <div>
        <LeaderboardGraph data={leaderboardData} />
      </div>
    </div>
  );
}

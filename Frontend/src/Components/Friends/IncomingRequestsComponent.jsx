import { useAtom, useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { useEffect, useState } from "react";
import RequestsComponentCard from "./FriendCard";
import { getAllFriends } from "../../HandleApi/FriendsApiHandler";
import { RiLoaderFill } from "react-icons/ri";

export default function IncomingRequestsComponent() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const incomingReqs = user.friends.filter((friend) => {
      return (
        friend.status === "pending" &&
        friend.receiver._id.toString() === user._id.toString()
      );
    });

    setIncomingRequests(incomingReqs);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const getAllFriendsHandler = async () => {
      setLoading(true);
      try {
        const response = await getAllFriends(user._id);
        if (response.success) {
          setUser((prev) => ({ ...prev, friends: response.friends }));
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllFriendsHandler();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Incoming Requests</h1>
      <h4 className="text-gray-300">Users interested in being your friend.</h4>

      {loading ? (
        <div className="mt-5">
          <RiLoaderFill className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="my-4 flex flex-wrap justify-around gap-4 sm:justify-start">
          {incomingRequests?.length > 0 ? (
            incomingRequests.map((request) => (
              <RequestsComponentCard
                type={"incoming"}
                key={request._id}
                request={request}
              />
            ))
          ) : (
            <h1 className="text-xl font-bold text-gray-400">
              No incoming requests
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

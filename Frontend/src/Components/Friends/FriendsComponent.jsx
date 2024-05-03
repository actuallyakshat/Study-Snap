import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import RequestsComponentCard from "./RequestsComponentCard";
export default function FriendsComponent() {
  const [showSentRequests, setShowSentRequests] = useState(false);
  const user = useAtomValue(clientUserAtom);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  useEffect(() => {
    if (!user) return;
    const outgoingreqs = user.friends.filter((friend) => {
      return (
        friend.status === "pending" &&
        friend.sender._id.toString() === user._id.toString()
      );
    });

    setOutgoingRequests(outgoingreqs);
  }, [user]);

  if (showSentRequests)
    return (
      <div>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Requests Sent</h1>
          <button
            onClick={() => setShowSentRequests(false)}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
          >
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
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Friends</h1>
          <h4 className="text-gray-300">
            List of all you friends. You can compare your performance with your
            friends!
          </h4>
        </div>
        <button
          onClick={() => setShowSentRequests(true)}
          className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
        >
          Sent Requests
        </button>
      </div>
    </div>
  );
}

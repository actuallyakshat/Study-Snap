import { useAtom } from "jotai";
import { findCommonFriendshipId } from "../../Utils/Functions";
import { clientUserAtom } from "../../Utils/Store";
import { getAllFriends, removeFriend } from "../../HandleApi/FriendsApiHandler";
import toast from "react-hot-toast";

export default function RemoveFriendModal({ onClose, name, profileDetails }) {
  const [user, setCurrentUser] = useAtom(clientUserAtom);
  async function removeFriendHandler() {
    const friendshipId = findCommonFriendshipId(
      profileDetails?.friends,
      user?.friends,
    );
    const result = await removeFriend(
      friendshipId,
      profileDetails._id,
      user._id,
    );
    console.log(result);
    toast.loading("Removing Friend", { id: "removingFriend" });
    const response = await getAllFriends(user._id);
    setCurrentUser((prev) => ({ ...prev, friends: response.friends }));
    toast.success("Removed Friend", { id: "removingFriend" });
    onClose();
  }
  return (
    <div
      onClick={onClose}
      className="popup-overlay fixed inset-0 z-[52] flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="popup-content w-full max-w-lg rounded-lg border border-slate-500/20 bg-gray-900 px-12 py-6"
      >
        <h1 className="text-center text-3xl font-bold">Are you sure?</h1>
        <p className="my-2 text-gray-300">
          Proceeding further will remove{" "}
          <span className="font-bold text-white">{name}</span> from your
          friend&apos;s list
        </p>
        <div className="mt-6 flex w-full items-center justify-center gap-3">
          <button className="btn" onClick={onClose}>
            Go back
          </button>
          <button className="btn" onClick={removeFriendHandler}>
            Remove Friend
          </button>
        </div>
      </div>
    </div>
  );
}

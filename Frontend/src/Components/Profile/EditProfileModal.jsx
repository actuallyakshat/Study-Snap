import { useState } from "react";
import ConfirmCancelModal from "./ConfirmCancelModal";
import { toast } from "react-hot-toast";
import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import { FaCamera } from "react-icons/fa";
export default function EditProfileModal({ onClose }) {
  const user = useAtomValue(clientUserAtom);
  const [changesOccured, setChangesOccured] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  function handleSaveChanges() {
    toast.loading("Saving...", { id: "saving" });
    setTimeout(() => {
      toast.success("Saved", { id: "saving" });
      onClose();
    }, 1000);
  }

  return (
    <div className="fixed inset-0 z-[51] bg-black/95">
      <div className="popup-content container mx-auto mt-14">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Profile</h1>

          <div className="space-x-3">
            <button onClick={() => setConfirmCancelModal(true)} className="btn">
              Cancel
            </button>
            {confirmCancelModal && (
              <ConfirmCancelModal
                onCancel={() => setConfirmCancelModal(false)}
                onClose={onClose}
              />
            )}

            <button
              disabled={!changesOccured}
              onClick={handleSaveChanges}
              className="btn"
            >
              Save Changes
            </button>
          </div>
        </div>
        <form className="mt-8 flex gap-10 bg-red-800">
          <div className="relative w-full flex-[1] cursor-pointer">
            <img
              src={user?.profilePicture}
              className="relative aspect-square w-72 rounded-full object-cover"
              alt=""
            />
            {/* Overlay */}
            <div className="absolute left-0 top-0 flex aspect-square size-full items-center justify-center rounded-full bg-black/20 object-cover">
              <i>
                <FaCamera className="size-12" />
              </i>
            </div>
          </div>

          <div className="flex-[3]">
            <p>Name: </p>
            <input
              defaultValue={user?.name}
              type="text"
              className="foucs:outline-none w-full rounded-lg px-2 py-1.5 font-medium text-black focus:outline-0 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

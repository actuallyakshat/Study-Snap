import { useAtom, useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import WizardPage from "./WizardPage";
import FloatingNavigation from "./FloatingNavigation";
import { useEffect, useState } from "react";
import AddFriendsComponent from "./AddFriendsComponent";
import FriendsComponent from "./FriendsComponent";
import IncomingRequestsComponent from "./IncomingRequestsComponent";
import { getAllFriends } from "../../HandleApi/FriendsApiHandler";
import { RiLoaderFill } from "react-icons/ri";

function FriendsLayout() {
  const [user, setUser] = useAtom(clientUserAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFriendsHandler = () => {
      setLoading(true);
      getAllFriends(user._id)
        .then((response) => {
          if (response.success) {
            setUser((prev) => ({ ...prev, friends: response.friends }));
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getFriendsHandler();
  }, []);

  const [page, setPage] = useState("friends");
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-spaceBlack">
        <RiLoaderFill className="size-16 animate-spin" />
      </div>
    );
  if (!user?.username || !user?.bio || !user?.age)
    return <WizardPage user={user} />;
  return (
    <div className="w-full px-8 pb-8 pt-3">
      <FloatingNavigation setPage={setPage} page={page} />
      <div className="mx-auto mt-12 max-w-7xl">
        {page === "friends" && <FriendsComponent />}
        {page === "incoming-requests" && <IncomingRequestsComponent />}
        {page === "add-friends" && <AddFriendsComponent />}
      </div>
    </div>
  );
}

export default FriendsLayout;

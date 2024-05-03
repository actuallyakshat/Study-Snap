import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import WizardPage from "./WizardPage";
import FloatingNavigation from "./FloatingNavigation";
import { useState } from "react";
import AddFriendsComponent from "./AddFriendsComponent";
import FriendsComponent from "./FriendsComponent";
import IncomingRequestsComponent from "./IncomingRequestsComponent";

function FriendsLayout() {
  const user = useAtomValue(clientUserAtom);
  const [page, setPage] = useState("friends");
  if (!user?.username || !user?.bio || !user?.age)
    return <WizardPage user={user} />;
  return (
    <div className="w-full px-8">
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

import { useAtomValue } from "jotai";
import { clientUserAtom } from "../../Utils/Store";
import WizardPage from "./WizardPage";

function FriendsLayout() {
  const user = useAtomValue(clientUserAtom);
  console.log(user);
  if (!user?.username) return <WizardPage user={user} />;
  return (
    <div className="flex w-full">
      <div className="flex-[3]">Your friends</div>
      <div className="flex-[2]">New friends</div>
    </div>
  );
}

export default FriendsLayout;

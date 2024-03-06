import {
  BrowserRouter as Router,
  Routes as AppRoutes,
  Navigate,
  Route,
} from "react-router-dom";
import { Dashboard } from "./Components/Dashboard/Dashboard";

export const Routes = () => {
  return (
    <div className="flex flex-1 w-full">
      <AppRoutes>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </AppRoutes>
    </div>
  );
};

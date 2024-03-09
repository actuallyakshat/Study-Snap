import {
  BrowserRouter as Router,
  Routes as AppRoutes,
  Navigate,
  Route,
} from "react-router-dom";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { HomeLayout } from "./Components/Home/HomeLayout";

export const Routes = () => {
  return (
    <div className="flex flex-1 w-full">
      <AppRoutes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </AppRoutes>
    </div>
  );
};

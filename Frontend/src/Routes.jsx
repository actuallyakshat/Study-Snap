import {
  BrowserRouter as Router,
  Routes as AppRoutes,
  Navigate,
  Route,
} from "react-router-dom";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { HomeLayout } from "./Components/Home/HomeLayout";
import { PageNotFound } from "./Components/PageNotFound/PageNotFound";
import { Privacy } from "./Components/Privacy/Privacy";

export const Routes = () => {
  return (
    <div className="flex flex-1 h-full w-full">
      <AppRoutes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/not-found" element={<PageNotFound />} />
      </AppRoutes>
    </div>
  );
};

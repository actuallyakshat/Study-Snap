import React, { useEffect, useState } from "react";
// Dummy study hour data for weekly intervals
const weeklyStudyHourData = [
  { date: "Mon", hours: 4 },
  { date: "Tue", hours: 3 },
  { date: "Wed", hours: 4 },
  { date: "Thu", hours: 5 },
  { date: "Fri", hours: 7 },
  { date: "Sat", hours: 4 },
  { date: "Sun", hours: 2 },
  // Add more data points for each week as needed
];

// Dummy study hour data for monthly intervals
const monthlyStudyHourData = [
  { monthYear: "2024-01", hours: 100 },
  { monthYear: "2024-02", hours: 30 },
  { monthYear: "2024-03", hours: 50 },
  { monthYear: "2024-04", hours: 90 },
  // Add more data points for each month as needed
];

// Dummy study hour data for yearly intervals
const yearlyStudyHourData = [
  { year: "2021", hours: 800 },
  { year: "2022", hours: 1400 },
  { year: "2023", hours: 200 },
  { year: "2024", hours: 700 },
  // Add more data points for each year as needed
];
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { clientUserAtom } from "../../Utils/Store";
import { useAtom } from "jotai";
export const StudyTracker = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState("Weekly");

  return (
    <div className="mb-4">
      <div className="my-4 flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-center space-x-2 md:justify-start">
          <button
            className={`rounded-2xl border border-gray-400/50 px-3 py-2 text-sm font-semibold text-gray-200 transition-colors ${
              selectedTab === "Weekly" ? "bg-slate-800/90" : ""
            }`}
            onClick={() => setSelectedTab("Weekly")}
          >
            Weekly
          </button>
          <button
            className={`rounded-2xl border border-gray-400/50 px-3 py-2 text-sm font-semibold text-gray-200 transition-colors ${
              selectedTab === "Monthly" ? "bg-slate-800/90" : ""
            }`}
            onClick={() => setSelectedTab("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`rounded-2xl border border-gray-400/50 px-3 py-2 text-sm font-semibold text-gray-200 transition-colors ${
              selectedTab === "Yearly" ? "bg-slate-800/90" : ""
            }`}
            onClick={() => setSelectedTab("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="h-fit max-h-[35rem] w-full rounded-2xl border border-gray-500/20 bg-gray-800/30 px-2 py-5 md:px-4">
        <h1 className="py-3 text-center text-2xl font-semibold text-gray-100">
          {selectedTab} Study Progress
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={user?.productivityData?.[selectedTab]}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#7f007f"
              fill="rgba(127, 0, 127,0.2)"
              strokeWidth={3}
            />
            <CartesianGrid strokeDasharray="5 5" />

            <XAxis dataKey={`${selectedTab === "Yearly" ? "month" : "day"}`} />
            <YAxis />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../ProductivityTracker/CustomTooltip";

const LeaderboardGraph = ({ data }) => {
  const sortedData = data.slice().sort((a, b) => b.hours - a.hours);

  return (
    <div className="my-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" color="#fff" />
          <YAxis />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="hours" fill="#fff" radius={[15, 15, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaderboardGraph;

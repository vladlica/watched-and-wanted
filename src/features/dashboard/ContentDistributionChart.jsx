import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  grid-column: 4 / span 2;
  grid-row: 2 / span 2;
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
`;

const data = [
  { name: "Books", value: 120, color: "#ea580c" },
  { name: "Series", value: 200, color: "#16a34a" },
  { name: "Movies", value: 30, color: "#2563eb" },
  { name: "Anime", value: 24, color: "#ca8a04" },
  { name: "Youtube Channels", value: 45, color: "#dc2626" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const labelX = x + (x > cx ? -10 : 10);

  return (
    <text
      x={labelX}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ContentDistributionChart() {
  return (
    <ChartBox>
      <h2>Content Distribution Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconSize={15} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default ContentDistributionChart;

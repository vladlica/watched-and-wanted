import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { RADIAN } from "../../utils/constants";

const ChartBox = styled.div`
  grid-column: 4 / span 2;
  grid-row: 2 / span 2;
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);

  & h2 {
    color: var(--color-grey-700);
  }

  & .recharts-tooltip-item {
    color: var(--color-grey-700) !important;
  }
`;

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

function ContentDistributionChart({ data }) {
  return (
    <ChartBox>
      <h2>Content Distribution Overview</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              nameKey="type"
              dataKey="value"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-grey-0)",
              }}
            />
            <Legend iconSize={15} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <h3>No data</h3>
      )}
    </ChartBox>
  );
}

export default ContentDistributionChart;

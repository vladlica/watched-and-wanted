import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  grid-column: 1 / span 3;
  grid-row: 2 / span 2;
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);

  & h2 {
    color: var(--color-grey-700);
  }

  & .recharts-text {
    fill: var(--color-grey-600);
  }
`;

function MediaConsumptionChart({ data: { data, max } }) {
  return (
    <ChartBox>
      <h2>Media Consumption Overview</h2>
      {max > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart outerRadius={150} width={400} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis domain={[0, max]} />
            <Radar
              name="Consumed"
              dataKey="consumed"
              stroke="#15803d"
              fill="#15803d"
              fillOpacity={0.4}
            />
            <Radar
              name="Wanted"
              dataKey="wanted"
              stroke="#ea580c"
              fill="#ea580c"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-grey-0)",
              }}
            />
            <Legend iconSize={15} iconType="circle" />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <h3>No data</h3>
      )}
    </ChartBox>
  );
}

export default MediaConsumptionChart;

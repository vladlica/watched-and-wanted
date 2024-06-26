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

// Props:
// - data: Object - Array of object, each object represents an item type (e.g., "books", "movies"),
//   along with the count of consumed and wanted items of that type.
//   Each object in the array should have the following structure: { type: string, consumed: number, wanted: number}
// - max: Number - The maximum value for the radar chart's range, typically representing the highest
//   count of items among all types
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
              stroke="var(--color-green-700)"
              fill="var(--color-green-700)"
              fillOpacity={0.3}
            />
            <Radar
              name="Wanted"
              dataKey="wanted"
              stroke="var(--color-orange-600)"
              fill="var(--color-orange-600)"
              fillOpacity={0.3}
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

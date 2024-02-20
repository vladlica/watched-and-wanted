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
`;

const data = [
  { type: "Books", consumed: 102, wanted: 38 },
  { type: "Series", consumed: 45, wanted: 60 },
  { type: "Movies", consumed: 15, wanted: 8 },
  { type: "Anime", consumed: 24, wanted: 20 },
  { type: "Youtube Channels", consumed: 45, wanted: 4 },
];

const maxSum = Math.max(...data.map((item) => item.consumed + item.wanted));

function MediaConsumptionChart() {
  return (
    <ChartBox>
      <h2>Media Consumption Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} width={400} height={400} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="type" />
          <PolarRadiusAxis domain={[0, maxSum]} />
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
          <Tooltip />
          <Legend iconSize={15} iconType="circle" />
        </RadarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default MediaConsumptionChart;

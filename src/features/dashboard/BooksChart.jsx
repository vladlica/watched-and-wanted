import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: var(--shadow-md);

  grid-column: 1 / span 3;
  grid-row: 4 / span 2;

  & h2 {
    color: var(--color-grey-700);
  }
`;

// Props:
// - data: Object - Array of objects, each object representing book count data for a specific year
function BooksChart({ data }) {
  return (
    <ChartBox>
      <h2>Yearly Book Count Analysis</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 25,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fill: "var(--color-grey-700)", dy: 10 }}
              tickLine={{ stroke: "var(--color-grey-700)" }}
            />
            <YAxis
              tick={{ fill: "var(--color-grey-700)" }}
              tickLine={{ stroke: "var(--color-grey-700)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-grey-0)",
              }}
            />
            <Bar dataKey="books" fill="var(--color-orange-600)" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h3>No data</h3>
      )}
    </ChartBox>
  );
}

export default BooksChart;

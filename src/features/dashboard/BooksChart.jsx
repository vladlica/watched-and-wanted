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
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);

  grid-column: 1 / span 3;
  grid-row: 4 / span 2;

  display: flex;
  flex-direction: column;
`;

function BooksChart({ data }) {
  return (
    <ChartBox>
      <h2>Yearly Book Count Analysis</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ dy: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="books" fill="#ea580c" />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default BooksChart;

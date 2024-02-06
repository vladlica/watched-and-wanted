import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  grid-column: 1 / -1;
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);
`;

const data = [
  { year: 2013, books: 5 },
  { year: 2014, books: 4 },
  { year: 2015, books: 9 },
  { year: 2016, books: 8 },
  { year: 2017, books: 6 },
  { year: 2018, books: 8 },
  { year: 2019, books: 8 },
  { year: 2020, books: 2 },
  { year: 2021, books: 13 },
  { year: 2022, books: 18 },
  { year: 2023, books: 35 },
];

function BooksChart() {
  return (
    <ChartBox>
      <h2>Books in Bloom: Yearly Reading</h2>
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

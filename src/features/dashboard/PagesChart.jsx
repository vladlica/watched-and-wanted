import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  { year: 2013, pages: 2813 },
  { year: 2014, pages: 1589 },
  { year: 2015, pages: 3649 },
  { year: 2016, pages: 3841 },
  { year: 2017, pages: 1907 },
  { year: 2018, pages: 5116 },
  { year: 2019, pages: 4734 },
  { year: 2020, pages: 560 },
  { year: 2021, pages: 6364 },
  { year: 2022, pages: 7866 },
  { year: 2023, pages: 13305 },
];

function PagesChart() {
  return (
    <ChartBox>
      <h2>Pages Odyssey: Annual Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ dy: 10 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pages"
            stroke="#ea580c"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default PagesChart;

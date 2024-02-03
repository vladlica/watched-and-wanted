import styled from "styled-components";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StyledDashboardBooksStats = styled.div`
  grid-column: 1/-1;
  background-color: var(--color-grey-0);
  border-radius: 25px;
  padding: 1rem 2rem;
  box-shadow: var(--shadow-md);

  & .recharts-label {
    font-size: 4rem;
  }
`;

const StatBox = styled.div`
  background-color: var(--color-orange-0);
  border-radius: 25px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const dataLight = [
//   {
//     status: "wanted",
//     value: 12,
//     color: "#fed7aa",
//   },
//   {
//     status: "read",
//     value: 90,
//     color: "#ea580c",
//   },
// ];

function DashboardBooksStats() {
  // return (
  //   <StyledDashboardBooksStats>
  //     <h2>Books stats</h2>
  //     <ResponsiveContainer width="100%" height={240}>
  //       <PieChart margin={{ top: 0, right: 500, bottom: 0, left: 0 }}>
  //         <Pie
  //           data={dataLight}
  //           nameKey="status"
  //           dataKey="value"
  //           innerRadius={85}
  //           outerRadius={110}
  //           paddingAngle={3}
  //         >
  //           <Label value="90%" position="center" />
  //           {dataLight.map((entry) => (
  //             <Cell
  //               fill={entry.color}
  //               stroke={entry.color}
  //               key={entry.status}
  //             />
  //           ))}
  //         </Pie>
  //         <Tooltip />
  //         <Legend
  //           verticalAlign="middle"
  //           align="right"
  //           width="30%"
  //           layout="vertical"
  //           iconSize={15}
  //           iconType="circle"
  //         />
  //       </PieChart>
  //     </ResponsiveContainer>
  //   </StyledDashboardBooksStats>
  // );
  return (
    <>
      <StatBox>1</StatBox>
      <StatBox>2</StatBox>
      <StatBox>2</StatBox>
      <StatBox>2</StatBox>
    </>
  );
}

export default DashboardBooksStats;

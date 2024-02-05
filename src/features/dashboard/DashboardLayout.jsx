import styled from "styled-components";
import DashboardTotalCounts from "./DashboardTotalCounts";
import DashboardBooksStats from "./DashboardBooksStats";
import ConsumptionChart from "./ConsumptionChart";
import ContentDistributionChart from "./ContentDistributionChart";
import PagesChart from "./PagesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2.5rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <DashboardTotalCounts />
      <ConsumptionChart />
      <ContentDistributionChart />
      <PagesChart />
      {/* <DashboardBooksStats /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

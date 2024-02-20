import styled from "styled-components";
import TotalCounts from "./TotalCounts";
import MediaConsumptionChart from "./MediaConsumptionChart";
import ContentDistributionChart from "./ContentDistributionChart";
import PagesChart from "./PagesChart";
import BooksChart from "./BooksChart";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2.5rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <TotalCounts />
      <MediaConsumptionChart />
      <ContentDistributionChart />
      <Stats />
      <BooksChart />
      <PagesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

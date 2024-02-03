import DashboardLayout from "../features/dashboard/DashboardLayout";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row direction="vertical">
        <h1>Dashboard</h1>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout({ userId }) {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet context={userId} />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

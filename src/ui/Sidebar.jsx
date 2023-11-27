import styled from "styled-components";
import NavList from "./NavList";

const StyledSidebar = styled.div`
  /* background-color: green; */
  /* color: white; */
  background-color: var(--color-grey-0);
  display: flex;
  padding: 2rem;
  border-right: 1px solid var(--color-grey-100);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <NavList />
    </StyledSidebar>
  );
}

export default Sidebar;

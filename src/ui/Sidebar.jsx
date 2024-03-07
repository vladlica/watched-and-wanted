import styled from "styled-components";
import NavList from "./NavList";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  padding: 2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <NavList />
    </StyledSidebar>
  );
}

export default Sidebar;

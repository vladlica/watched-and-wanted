import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import styled from "styled-components";
import Row from "./Row";

const StyledHeader = styled.header`
  /* background-color: blue; */
  /* color: white; */
  grid-column: 1/-1;
  padding: 2rem 3.4rem;
  color: var(--color-grey-600);
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <Row direction="horizontal">
        <Logo />
        <HeaderMenu />
      </Row>
    </StyledHeader>
  );
}

export default Header;

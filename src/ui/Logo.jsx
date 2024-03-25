import { HiOutlineShare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 5rem;
    height: 5rem;
    color: var(--color-orange-600);
  }
`;

const Text = styled.p`
  font-size: 3rem;
  color: var(--color-grey-600);
  font-weight: 600;
  letter-spacing: -1px;
`;

const ColoredLetter = styled.span`
  color: var(--color-orange-600);
`;

function Logo() {
  return (
    <Link to="/dashboard">
      <StyledLogo>
        <HiOutlineShare />
        <Text>
          <ColoredLetter>W</ColoredLetter>
          atched&
          <ColoredLetter>W</ColoredLetter>
          antedTest
        </Text>
      </StyledLogo>
    </Link>
  );
}

export default Logo;

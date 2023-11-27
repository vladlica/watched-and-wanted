import { HiOutlineShare } from "react-icons/hi2";
import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;

  & svg {
    width: 5rem;
    height: 5rem;
    color: var(--color-orange-600);
    /* margin-right: -1.5rem; */
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
    <StyledLogo>
      <HiOutlineShare />
      <Text>
        <ColoredLetter>W</ColoredLetter>
        atched&
        <ColoredLetter>W</ColoredLetter>
        anted
      </Text>
    </StyledLogo>
  );
}

export default Logo;

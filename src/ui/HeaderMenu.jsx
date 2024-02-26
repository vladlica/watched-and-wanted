import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

const UserFullName = styled.p`
  color: var(--color-grey-600);
  text-transform: capitalize;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <AvatarContainer>
        <UserAvatar />
        <UserFullName>tylor daniels</UserFullName>
      </AvatarContainer>
      <ActionsContainer>
        <ButtonIcon $place="header">
          <HiOutlineMoon />
        </ButtonIcon>
        <Logout />
      </ActionsContainer>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

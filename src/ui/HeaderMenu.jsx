import styled from "styled-components";
import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { useUser } from "../features/authentication/useUser";
import { getInitials } from "../utils/helpers";

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

const LettersAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  letter-spacing: 0.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-orange-50);
  background-color: var(--color-orange-600);
`;

function HeaderMenu() {
  const {
    user: {
      user_metadata: { fullName },
    },
  } = useUser();

  return (
    <StyledHeaderMenu>
      <AvatarContainer>
        <LettersAvatar>{getInitials(fullName)}</LettersAvatar>
        <UserFullName>{fullName}</UserFullName>
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

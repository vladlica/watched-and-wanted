import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { getInitials } from "../utils/helpers";
import DarkModeToggle from "./DarkModeToggle";
import SpinnerMini from "./SpinnerMini";
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
  const { user, isLoading } = useUser();

  return (
    <StyledHeaderMenu>
      <AvatarContainer>
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <>
            <LettersAvatar>
              {getInitials(user.user_metadata.fullName)}
            </LettersAvatar>
            <UserFullName>{user.user_metadata.fullName}</UserFullName>
          </>
        )}
      </AvatarContainer>
      <ActionsContainer>
        <DarkModeToggle />
        <Logout />
      </ActionsContainer>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

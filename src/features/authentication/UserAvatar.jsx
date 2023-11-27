import styled from "styled-components";
import { getInitials } from "../../utils/helpers";

const Image = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const LettersAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-orange-50);
  background-color: var(--color-orange-600);
`;

function UserAvatar() {
  const userAvatar = undefined;
  const userFullName = "tylor daniels";

  if (!userAvatar)
    return <LettersAvatar>{getInitials(userFullName)}</LettersAvatar>;

  return <Image src="person.jpg" alt="random person" />;
}

export default UserAvatar;

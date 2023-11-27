import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  ${(props) =>
    props.$place === "header" &&
    css`
      & svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-orange-600);
      }
    `}

  ${(props) =>
    props.$place === "table" &&
    css`
      & svg {
        width: 2rem;
        height: 2rem;
      }

      &:hover svg {
        color: var(--color-orange-600);
      }
    `}

  ${(props) =>
    props.$place === "input" &&
    css`
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: var(--color-orange-600);

      &:hover {
        background-color: var(--color-orange-700);
      }

      & svg {
        width: 1.4rem;
        height: 1.4rem;
        color: var(--color-orange-100);
      }
    `}

    ${(props) =>
    props.$place === "form" &&
    css`
      background-color: var(--color-orange-600);
      padding: 0.7rem;

      & span {
        color: var(--color-orange-100);
      }

      &:hover {
        background-color: var(--color-orange-700);
      }

      & svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-orange-100);
      }
    `}
`;

export default ButtonIcon;

import styled, { css } from "styled-components";

// Props:
// - $place: String - Placement of the button ("header", "table", "input", "form")
const ButtonIcon = styled.button`
  border: none;
  background: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transition: all 0.2s;

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

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

      &:focus-visible {
        outline: 2px solid var(--color-orange-600);
        outline-offset: 2px;
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

      &:focus-visible {
        outline: 2px solid var(--color-orange-600);
        outline-offset: 2px;
      }
    `}
`;

export default ButtonIcon;

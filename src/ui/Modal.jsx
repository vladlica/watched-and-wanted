import styled from "styled-components";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: 15px;
  padding: 3.2rem 4rem;
  z-index: 2;
  transition: all 0.5s;

  /* Scrollbar customization */
  & ::-webkit-scrollbar {
    width: 1.6rem;
  }

  & ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  & ::-webkit-scrollbar-thumb {
    background: var(--color-orange-600);
    border-radius: 10px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

// Props:
// - children: ReactNode - Content to be displayed inside the modal
// - onClose: Object - Function to be called when the modal is closed
function Modal({ children, onClose }) {
  // Create a portal to render the modal outside the component hierarchy
  return createPortal(
    // Clicking outside the modal closes the modal
    <Overlay onClick={onClose}>
      {/* Clicking inside the modal does not close it */}
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;

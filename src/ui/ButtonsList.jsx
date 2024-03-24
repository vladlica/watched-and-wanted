import styled from "styled-components";

// Props:
// - $justify: String - Alignment of the buttons list ("flex-start" for left-aligned, "flex-end" for right-aligned)
const ButtonsList = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${(props) =>
    props.$justify === "start" ? "flex-start" : "flex-end"};
`;

export default ButtonsList;

import styled from "styled-components";

const FormButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: ${(props) =>
    props.$justify === "start" ? "flex-start" : "flex-end"};
`;

export default FormButtonsRow;

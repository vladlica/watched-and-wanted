import styled from "styled-components";

const DetailsListContainer = styled.div`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 25px;
  max-height: 46rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default DetailsListContainer;

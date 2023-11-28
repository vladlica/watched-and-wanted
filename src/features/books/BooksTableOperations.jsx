import styled from "styled-components";
import Filter from "../../ui/Filter";

const StyledBooksTableOperations = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function BooksTableOperations() {
  return (
    <StyledBooksTableOperations>
      <Filter />
    </StyledBooksTableOperations>
  );
}

export default BooksTableOperations;

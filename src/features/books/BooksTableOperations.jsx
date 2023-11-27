import styled from "styled-components";

const StyledBooksTableOperations = styled.div`
  display: flex;
  gap: 1rem;
`;

function BooksTableOperations() {
  return (
    <StyledBooksTableOperations>
      <div>Filter</div>
      <div>Sort By</div>
    </StyledBooksTableOperations>
  );
}

export default BooksTableOperations;

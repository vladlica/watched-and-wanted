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
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Read", value: "read" },
          { label: "Wanted", value: "wanted" },
        ]}
        filteredField="status"
      />
    </StyledBooksTableOperations>
  );
}

export default BooksTableOperations;

import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import Search from "../../ui/Search";

const StyledMoviesTableOperations = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function MoviesTableOperations() {
  return (
    <StyledMoviesTableOperations>
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Watched", value: "watched" },
          { label: "Wanted", value: "wanted" },
        ]}
        filteredField="status"
      />

      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Book", value: "true" },
          { label: "No Book", value: "false" },
        ]}
        filteredField="hasBook"
      />

      <SortBy
        options={[
          {
            label: "Sort by date created (newest first)",
            value: "created_at-desc",
          },
          {
            label: "Sort by date created (oldest first)",
            value: "created_at-asc",
          },
          { label: "Sort by title (A-Z)", value: "title-asc" },
          { label: "Sort by title (Z-A)", value: "title-desc" },
          { label: "Sort by duration (low first)", value: "duration-asc" },
          { label: "Sort by duration (high first)", value: "duration-desc" },
        ]}
      />

      <Search placeholder="Search movie" />
    </StyledMoviesTableOperations>
  );
}

export default MoviesTableOperations;

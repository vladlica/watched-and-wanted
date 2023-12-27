import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Search from "../../ui/Search";

const StyledSeriesTableOperations = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function SeriesTableOperations() {
  return (
    <StyledSeriesTableOperations>
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
          { label: "Sort by seasons (low first)", value: "numSeasons-asc" },
          { label: "Sort by seasons (high first)", value: "numSeasons-desc" },
        ]}
      />
      <Search placeholder="Search series" />
    </StyledSeriesTableOperations>
  );
}

export default SeriesTableOperations;

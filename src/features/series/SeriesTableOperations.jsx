import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";

const StyledSeriesTableOperations = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function SeriesTableOperations() {
  return (
    <StyledSeriesTableOperations>
      {/* <Filter
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

      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Movie", value: "true" },
          { label: "No Movie", value: "false" },
        ]}
        filteredField="hasMovie"
      />

      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "News", value: "true" },
          { label: "No News", value: "false" },
        ]}
        filteredField="hasNews"
      /> */}

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
    </StyledSeriesTableOperations>
  );
}

export default SeriesTableOperations;

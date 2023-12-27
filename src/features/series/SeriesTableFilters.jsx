import styled from "styled-components";
import Filter from "../../ui/Filter";

const StyledSeriesTableFilters = styled.div`
  display: flex;
  gap: 2.2rem;
  align-items: center;
  justify-content: center;
`;

function SeriesTableFilters() {
  return (
    <StyledSeriesTableFilters>
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
      />

      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Finished", value: "true" },
          { label: "Not Finished", value: "false" },
        ]}
        filteredField="isFinished"
      />
    </StyledSeriesTableFilters>
  );
}

export default SeriesTableFilters;

import Filter from "../../ui/Filter";
import TableFilters from "../../ui/TableFilters";

function SeriesTableFilters() {
  return (
    <TableFilters>
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
    </TableFilters>
  );
}

export default SeriesTableFilters;

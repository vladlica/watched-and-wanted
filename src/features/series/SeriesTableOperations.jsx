import SortBy from "../../ui/SortBy";
import Search from "../../ui/Search";
import TableOperations from "../../ui/TableOperations";

function SeriesTableOperations() {
  return (
    <TableOperations>
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
    </TableOperations>
  );
}

export default SeriesTableOperations;

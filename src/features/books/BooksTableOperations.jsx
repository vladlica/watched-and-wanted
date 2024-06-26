import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import Search from "../../ui/Search";
import TableOperations from "../../ui/TableOperations";

function BooksTableOperations() {
  return (
    <TableOperations>
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Read", value: "read" },
          { label: "Wanted", value: "wanted" },
        ]}
        filteredField="status"
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

          { label: "Sort by author (A-Z)", value: "author-asc" },
          { label: "Sort by author (Z-A)", value: "author-desc" },
          { label: "Sort by title (A-Z)", value: "title-asc" },
          { label: "Sort by title (Z-A)", value: "title-desc" },
          { label: "Sort by series (A-Z)", value: "series-asc" },
          { label: "Sort by series (Z-A)", value: "series-desc" },
          {
            label: "Sort by date finished (newest first)",
            value: "finishDate-desc",
          },
          {
            label: "Sort by date finished (oldest first)",
            value: "finishDate-asc",
          },
        ]}
      />

      <Search placeholder="Search book" />
    </TableOperations>
  );
}

export default BooksTableOperations;

import Filter from "../../ui/Filter";
import Search from "../../ui/Search";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function AnimeTableOperations() {
  return (
    <TableOperations>
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Watched", value: "watched" },
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
          { label: "Sort by title (A-Z)", value: "title-asc" },
          { label: "Sort by title (Z-A)", value: "title-desc" },
          { label: "Sort by episodes (low first)", value: "numEpisodes-asc" },
          { label: "Sort by episodes (high first)", value: "numEpisodes-desc" },
        ]}
      />

      <Search placeholder="Search anime" />
    </TableOperations>
  );
}

export default AnimeTableOperations;

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import Search from "../../ui/Search";

function YoutubeChannelsTableOperations() {
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
          { label: "Sort by channel name (A-Z)", value: "channelName-asc" },
          { label: "Sort by channel name (Z-A)", value: "channelName-desc" },
        ]}
      />

      <Search placeholder="Search Youtube channel" />
    </TableOperations>
  );
}

export default YoutubeChannelsTableOperations;

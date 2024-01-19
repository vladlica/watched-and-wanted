import Filter from "../../ui/Filter";
import TableFilters from "../../ui/TableFilters";

function YoutubeChannelsTableFilters() {
  return (
    <TableFilters>
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Subscribed", value: "subscribed" },
          { label: "Wanted", value: "wanted" },
        ]}
        filteredField="status"
      />

      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "Bell", value: "true" },
          { label: "No Bell", value: "false" },
        ]}
        filteredField="hasBell"
      />
    </TableFilters>
  );
}

export default YoutubeChannelsTableFilters;

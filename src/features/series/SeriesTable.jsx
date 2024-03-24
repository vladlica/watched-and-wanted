import { useSeries } from "./useSeries";
import SeriesRow from "./SeriesRow";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function SeriesTable() {
  const { isLoading, series, count } = useSeries();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 2fr ">
      <Table.Header>
        <div>Title</div>
        <div>Status</div>
        <div>Seasons</div>
        <div>Book</div>
        <div>Movie</div>
        <div>News</div>
        <div>Finished</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={series}
        render={(seriesItem) => (
          <SeriesRow series={seriesItem} key={seriesItem.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default SeriesTable;

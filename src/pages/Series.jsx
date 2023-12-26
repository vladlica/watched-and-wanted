import AddSeries from "../features/series/AddSeries";
import SeriesTable from "../features/series/SeriesTable";
import SeriesTableFilters from "../features/series/SeriesTableFilters";
import SeriesTableOperations from "../features/series/SeriesTableOperations";
import Row from "../ui/Row";

function Series() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Series</h1>
        <SeriesTableOperations />
      </Row>

      <Row direction="horizontal">
        <SeriesTableFilters />
      </Row>

      <Row direction="vertical">
        <SeriesTable />
        <AddSeries />
      </Row>
    </>
  );
}

export default Series;

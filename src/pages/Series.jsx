import AddSeries from "../features/series/AddSeries";
import SeriesTable from "../features/series/SeriesTable";
import Row from "../ui/Row";

function Series() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Series</h1>
        <span>Table operations</span>
      </Row>

      <Row direction="vertical">
        <SeriesTable />
        <AddSeries />
      </Row>
    </>
  );
}

export default Series;

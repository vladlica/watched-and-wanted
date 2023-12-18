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
        <span>Add Button</span>
      </Row>
    </>
  );
}

export default Series;

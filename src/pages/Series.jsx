import CreateEditSeriesForm from "../features/series/CreateEditSeriesForm";
import SeriesTable from "../features/series/SeriesTable";
import SeriesTableFilters from "../features/series/SeriesTableFilters";
import SeriesTableOperations from "../features/series/SeriesTableOperations";
import AddButton from "../ui/AddButton";
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
        <AddButton form={<CreateEditSeriesForm />} />
      </Row>
    </>
  );
}

export default Series;

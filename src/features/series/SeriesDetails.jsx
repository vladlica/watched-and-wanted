import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import SeriesDetailsHeader from "./SeriesDetailsHeader";
import SeriesDetailsStats from "./SeriesDetailsStats";
import { useSeriesDetails } from "./useSeriesDetails";

function SeriesDetails() {
  const { isLoading, series, error, isError } = useSeriesDetails();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Row direction="horizontal">
        <SeriesDetailsHeader series={series} />
      </Row>

      <SeriesDetailsStats series={series} />
    </>
  );
}

export default SeriesDetails;

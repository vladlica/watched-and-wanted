import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import AnimeDetailsHeader from "./AnimeDetailsHeader";
import AnimeDetailsStats from "./AnimeDetailsStats";
import { useAnimeDetails } from "./useAnimeDetails";

function AnimeDetails() {
  const { isLoading, isError, error, anime } = useAnimeDetails();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <Row direction="horizontal">
        <AnimeDetailsHeader anime={anime} />
      </Row>

      <AnimeDetailsStats anime={anime} />
    </>
  );
}

export default AnimeDetails;

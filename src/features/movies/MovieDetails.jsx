import { useMovie } from "./useMovie";
import MovieDetailsHeader from "./MovieDetailsHeader";
import MovieDetailsStats from "./MovieDetailsStats";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

function MovieDetails() {
  const { isLoading, isError, movie, error } = useMovie();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <Row direction="horizontal">
        <MovieDetailsHeader movie={movie} />
      </Row>

      <MovieDetailsStats movie={movie} />
    </>
  );
}

export default MovieDetails;

import { useMovies } from "./useMovies";
import MovieRow from "./MovieRow";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

function MoviesTable() {
  const { isLoading, movies, count } = useMovies();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 1fr 1fr 0.6fr 2fr ">
      <Table.Header>
        <div>Title</div>
        <div>Status</div>
        <div>Duration (min)</div>
        <div>Book</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={movies}
        render={(movie) => <MovieRow movie={movie} key={movie.id} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default MoviesTable;

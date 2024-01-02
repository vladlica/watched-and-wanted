import Table from "../../ui/Table";
import MovieRow from "./MovieRow";

const movies = [
  {
    id: 1,
    title: "Book Thief",
    status: "watched",
    duration: 131,
    hasBook: false,
  },
  {
    id: 2,
    title: "Hunger Games",
    status: "wanted",
    duration: 0,
    hasBook: true,
  },
];

function MoviesTable() {
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
      <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
    </Table>
  );
}

export default MoviesTable;

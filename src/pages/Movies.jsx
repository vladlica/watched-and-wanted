import MoviesTable from "../features/movies/MoviesTable";
import Row from "../ui/Row";

function Movies() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Movies</h1>
        <span>Table Operations</span>
      </Row>

      <Row direction="vertical">
        <MoviesTable />
        <span>Add Button</span>
      </Row>
    </>
  );
}

export default Movies;

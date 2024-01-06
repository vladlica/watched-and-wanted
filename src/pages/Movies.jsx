import CreateEditMoviesForm from "../features/movies/CreateEditMoviesForm";
import MoviesTable from "../features/movies/MoviesTable";
import AddButton from "../ui/AddButton";
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
        <AddButton form={<CreateEditMoviesForm />} type="Movie" />
      </Row>
    </>
  );
}

export default Movies;

import AddBook from "../features/books/AddBook";
import BooksTable from "../features/books/BooksTable";
import BooksTableOperations from "../features/books/BooksTableOperations";
import BooksTableSearchBar from "../features/books/BooksTableSearchBar";
import Row from "../ui/Row";

function Books() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Books</h1>
        <BooksTableSearchBar />
        <BooksTableOperations />
      </Row>

      <Row direction="vertical">
        <BooksTable />
        <AddBook />
      </Row>
    </>
  );
}

export default Books;

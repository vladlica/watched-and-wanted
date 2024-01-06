import BooksTable from "../features/books/BooksTable";
import BooksTableOperations from "../features/books/BooksTableOperations";
import CreateEditBookForm from "../features/books/CreateEditBookForm";
import AddButton from "../ui/AddButton";
import Row from "../ui/Row";

function Books() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Books</h1>
        <BooksTableOperations />
      </Row>

      <Row direction="vertical">
        <BooksTable />
        <AddButton form={<CreateEditBookForm />} type="Book" />
      </Row>
    </>
  );
}

export default Books;

import { useBooks } from "./useBooks";
import BookRow from "./BookRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BooksTable() {
  const { isLoading, books, count } = useBooks();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 2fr 2fr 1fr 1fr 2fr">
      <Table.Header>
        <div>Author</div>
        <div>Title</div>
        <div>Series</div>
        <div>Status</div>
        <div>Finished</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={books}
        render={(book) => <BookRow book={book} key={book.id} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BooksTable;

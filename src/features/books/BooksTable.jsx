import Table from "../../ui/Table";
import BookRow from "./BookRow";
import Spinner from "../../ui/Spinner";
import { useBooks } from "./useBooks";

function BooksTable() {
  const { isLoading, books } = useBooks();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 2fr 2fr 1fr 1fr 2fr">
      <Table.Header>
        <div>Author</div>
        <div>Title</div>
        <div>Series</div>
        <div>Status</div>
        <div>Finished reading</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={books}
        render={(book) => <BookRow book={book} key={book.id} />}
      />
    </Table>
  );
}

export default BooksTable;

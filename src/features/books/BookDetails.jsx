import { useBook } from "./useBook";
import BookDetailsStats from "./BookDetailsStats";
import BookDetailsHeader from "./BookDetailsHeader";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";

function BookDetails() {
  const { isLoading, book, error, isError } = useBook();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Row direction="horizontal">
        <BookDetailsHeader book={book} />
      </Row>

      <BookDetailsStats book={book} />
    </>
  );
}

export default BookDetails;

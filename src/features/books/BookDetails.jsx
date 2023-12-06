import { useParams } from "react-router-dom";

function BookDetails() {
  const { bookId } = useParams();

  return <div>Book details #{bookId}</div>;
}

export default BookDetails;

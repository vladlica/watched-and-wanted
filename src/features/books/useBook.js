import { useQuery } from "@tanstack/react-query";
import { getBook } from "../../services/apiBooks";
import { useParams } from "react-router-dom";

export function useBook() {
  const { bookId } = useParams();

  const {
    isLoading,
    isError,
    data: book,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId),
    retry: false,
  });

  return { isLoading, book, error, isError };
}

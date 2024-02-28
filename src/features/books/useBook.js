import { useQuery } from "@tanstack/react-query";
import { getBook } from "../../services/apiBooks";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export function useBook() {
  const { bookId } = useParams();
  const currentUserId = useOutletContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: book,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId),
    onSuccess: (data) => {
      if (data.userId !== currentUserId) navigate("/books");
    },
    retry: false,
  });

  return { isLoading, book, error, isError };
}

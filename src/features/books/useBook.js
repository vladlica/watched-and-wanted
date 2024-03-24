import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getBook } from "../../services/apiBooks";

export function useBook() {
  const { bookId } = useParams();
  const { id: currentUserId } = useOutletContext();
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
      // Prevents users from viewing details of a book added by another user
      if (data.userId !== currentUserId) navigate("/books");
    },
    retry: false,
  });

  return { isLoading, book, error, isError };
}

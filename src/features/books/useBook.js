import { useQuery } from "@tanstack/react-query";
import { getBook } from "../../services/apiBooks";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useBook() {
  const { bookId } = useParams();
  const {
    user: { id: currentUserId },
  } = useUser();
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

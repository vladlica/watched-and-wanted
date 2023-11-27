import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";

export function useBooks() {
  const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return { isLoading, books };
}

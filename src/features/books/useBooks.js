import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";
import { useSearchParams } from "react-router-dom";

export function useBooks() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const { isLoading, data: books } = useQuery({
    queryKey: ["books", filter],
    queryFn: () => getBooks({ filter }),
  });

  return { isLoading, books };
}

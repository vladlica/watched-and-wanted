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

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const { isLoading, data: books } = useQuery({
    queryKey: ["books", filter, sortBy],
    queryFn: () => getBooks({ filter, sortBy }),
  });

  return { isLoading, books };
}

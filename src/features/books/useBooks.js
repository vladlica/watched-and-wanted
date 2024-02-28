import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooks(allResults = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const currentUserId = useOutletContext();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const search = searchParams.get("search") || null;

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  let page;
  if (allResults) page = false;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: books, count } = {} } = useQuery({
    queryKey: ["books", currentUserId, filter, search, sortBy, page],
    queryFn: () => getBooks({ currentUserId, filter, search, sortBy, page }),
  });

  if (!allResults) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["books", currentUserId, filter, search, sortBy, page + 1],
        queryFn: () =>
          getBooks({ currentUserId, filter, search, sortBy, page: page + 1 }),
      });

    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["books", currentUserId, filter, search, sortBy, page - 1],
        queryFn: () =>
          getBooks({ currentUserId, filter, search, sortBy, page: page - 1 }),
      });
    }
  }

  return { isLoading, books, count };
}

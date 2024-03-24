import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovies } from "../../services/apiMovies";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

// Params:
// - allResults: Boolean - Indicating whether to fetch all results or just a single page
export function useMovies(allResults = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { id: currentUserId } = useOutletContext();

  let filters = [];
  const filterStatusValue = searchParams.get("status");
  if (filterStatusValue && filterStatusValue !== "all")
    filters.push({ field: "status", value: filterStatusValue });

  const filterHasBookValue = searchParams.get("hasBook");
  if (filterHasBookValue && filterHasBookValue !== "all")
    filters.push({ field: "hasBook", value: filterHasBookValue });

  const search = searchParams.get("search") || null;

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  let page;
  if (allResults) page = null;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Defaulted the data property to an empty object to prevent errors if data is null or undefined
  const { isLoading, data: { data: movies, count } = {} } = useQuery({
    queryKey: ["movies", currentUserId, sortBy, filters, search, page],
    queryFn: () => getMovies({ currentUserId, sortBy, filters, search, page }),
  });

  // Prefetching next and previous pages to avoid loading the results every time a user changes the page
  if (!allResults) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["movies", currentUserId, sortBy, filters, search, page + 1],
        queryFn: () =>
          getMovies({ currentUserId, sortBy, filters, search, page: page + 1 }),
      });

    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["movies", currentUserId, sortBy, filters, search, page - 1],
        queryFn: () =>
          getMovies({ currentUserId, sortBy, filters, search, page: page - 1 }),
      });
    }
  }

  return { isLoading, movies, count };
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovies } from "../../services/apiMovies";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useMovies() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

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

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: movies, count } = {} } = useQuery({
    queryKey: ["movies", sortBy, filters, search, page],
    queryFn: () => getMovies({ sortBy, filters, search, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["movies", sortBy, filters, search, page + 1],
      queryFn: () => getMovies({ sortBy, filters, search, page: page + 1 }),
    });

  if (page !== 1) {
    queryClient.prefetchQuery({
      queryKey: ["movies", sortBy, filters, search, page - 1],
      queryFn: () => getMovies({ sortBy, filters, search, page: page - 1 }),
    });
  }

  return { isLoading, movies, count };
}

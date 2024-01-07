import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovies } from "../../services/apiMovies";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useMovies() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // const filterValue = searchParams.get("status");
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : { field: "status", value: filterValue };

  // const search = searchParams.get("search") || null;

  // const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  // const [field, direction] = sortByValue.split("-");
  // const sortBy = { field, direction };

  // const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: movies, count } = {} } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  // const pageCount = Math.ceil(count / PAGE_SIZE);

  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["books", filter, search, sortBy, page + 1],
  //     queryFn: () => getBooks({ filter, search, sortBy, page: page + 1 }),
  //   });

  // if (page !== 1) {
  //   queryClient.prefetchQuery({
  //     queryKey: ["books", filter, search, sortBy, page - 1],
  //     queryFn: () => getBooks({ filter, search, sortBy, page: page - 1 }),
  //   });
  // }

  return { isLoading, movies, count };
}
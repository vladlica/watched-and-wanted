import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getSeries } from "../../services/apiSeries";

export function useSeries() {
  // const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  let filters = [];
  const filterStatusValue = searchParams.get("status");
  if (filterStatusValue && filterStatusValue !== "all")
    filters.push({ field: "status", value: filterStatusValue });

  const filterHasBookValue = searchParams.get("hasBook");
  if (filterHasBookValue && filterHasBookValue !== "all")
    filters.push({ field: "hasBook", value: filterHasBookValue });

  const filterHasMovieValue = searchParams.get("hasMovie");
  if (filterHasMovieValue && filterHasMovieValue !== "all")
    filters.push({ field: "hasMovie", value: filterHasMovieValue });

  const filterHasNewsValue = searchParams.get("hasNews");
  if (filterHasNewsValue && filterHasNewsValue !== "all")
    filters.push({ field: "hasNews", value: filterHasNewsValue });

  const filterIsFinishedValue = searchParams.get("isFinished");
  if (filterIsFinishedValue && filterIsFinishedValue !== "all")
    filters.push({ field: "isFinished", value: filterIsFinishedValue });

  // const search = searchParams.get("search") || null;

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  // const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // const { isLoading, data: { data: books, count } = {} } = useQuery({
  //   queryKey: ["books", filter, search, sortBy, page],
  //   queryFn: () => getBooks({ filter, search, sortBy, page }),
  // });

  const { isLoading, data: { data: series, count } = {} } = useQuery({
    queryKey: ["series", sortBy, filters],
    queryFn: () => getSeries({ sortBy, filters }),
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

  return { isLoading, series, count };
}

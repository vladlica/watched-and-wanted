import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getSeries } from "../../services/apiSeries";

// Params:
// - allResults: Boolean - Indicating whether to fetch all results or just a single page
export function useSeries(allResults = false) {
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

  const filterHasMovieValue = searchParams.get("hasMovie");
  if (filterHasMovieValue && filterHasMovieValue !== "all")
    filters.push({ field: "hasMovie", value: filterHasMovieValue });

  const filterHasNewsValue = searchParams.get("hasNews");
  if (filterHasNewsValue && filterHasNewsValue !== "all")
    filters.push({ field: "hasNews", value: filterHasNewsValue });

  const filterIsFinishedValue = searchParams.get("isFinished");
  if (filterIsFinishedValue && filterIsFinishedValue !== "all")
    filters.push({ field: "isFinished", value: filterIsFinishedValue });

  const search = searchParams.get("search") || null;

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  let page;
  if (allResults) page = null;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Defaulted the data property to an empty object to prevent errors if data is null or undefined
  const { isLoading, data: { data: series, count } = {} } = useQuery({
    queryKey: ["series", currentUserId, sortBy, filters, page, search],
    queryFn: () => getSeries({ currentUserId, sortBy, filters, page, search }),
  });

  // Prefetching next and previous pages to avoid loading the results every time a user changes the page
  if (!allResults) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["series", currentUserId, sortBy, filters, page + 1, search],
        queryFn: () =>
          getSeries({ currentUserId, sortBy, filters, page: page + 1, search }),
      });

    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["series", currentUserId, sortBy, filters, page - 1, search],
        queryFn: () =>
          getSeries({ currentUserId, sortBy, filters, page: page - 1, search }),
      });
    }
  }

  return { isLoading, series, count };
}

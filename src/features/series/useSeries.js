import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getSeries } from "../../services/apiSeries";
import { useUser } from "../authentication/useUser";

export function useSeries(allResults = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const {
    user: { id: currentUserId },
  } = useUser();

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
  if (allResults) page = false;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: series, count } = {} } = useQuery({
    queryKey: ["series", currentUserId, sortBy, filters, page, search],
    queryFn: () => getSeries({ currentUserId, sortBy, filters, page, search }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (!allResults) {
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

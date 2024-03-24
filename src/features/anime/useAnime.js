import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnime } from "../../services/apiAnime";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

// Params:
// - allResults: Boolean - Indicating whether to fetch all results or just a single page
export function useAnime(allResults = false) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const { id: currentUserId } = useOutletContext();

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
  if (allResults) page = null;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Defaulted the data property to an empty object to prevent errors if data is null or undefined
  const { isLoading, data: { data: anime, count } = {} } = useQuery({
    queryKey: ["anime", currentUserId, sortBy, filter, search, page],
    queryFn: () => getAnime({ currentUserId, sortBy, filter, search, page }),
  });

  // Prefetching next and previous pages to avoid loading the results every time a user changes the page
  if (!allResults) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["anime", currentUserId, sortBy, filter, search, page + 1],
        queryFn: () =>
          getAnime({ currentUserId, sortBy, filter, search, page: page + 1 }),
      });

    if (page !== 1) {
      queryClient.prefetchQuery({
        queryKey: ["anime", currentUserId, sortBy, filter, search, page - 1],
        queryFn: () =>
          getAnime({ currentUserId, sortBy, filter, search, page: page - 1 }),
      });
    }
  }

  return { isLoading, anime, count };
}

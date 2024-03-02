import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnime } from "../../services/apiAnime";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

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
  if (allResults) page = false;
  else page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: anime, count } = {} } = useQuery({
    queryKey: ["anime", currentUserId, sortBy, filter, search, page],
    queryFn: () => getAnime({ currentUserId, sortBy, filter, search, page }),
  });

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

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getYoutubeChannels } from "../../services/apiYoutubeChannels";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useYoutubeChannels() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  let filters = [];
  const filterStatusValue = searchParams.get("status");
  if (filterStatusValue && filterStatusValue !== "all")
    filters.push({ field: "status", value: filterStatusValue });

  const filterHasBellValue = searchParams.get("hasBell");
  if (filterHasBellValue && filterHasBellValue !== "all")
    filters.push({ field: "hasBell", value: filterHasBellValue });

  const search = searchParams.get("search") || null;

  const sortByValue = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data: { data: youtubeChannels, count } = {} } = useQuery({
    queryKey: ["youtubeChannels", sortBy, filters, search, page],
    queryFn: () => getYoutubeChannels({ sortBy, filters, search, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["youtubeChannels", sortBy, filters, search, page + 1],
      queryFn: () =>
        getYoutubeChannels({ sortBy, filters, search, page: page + 1 }),
    });

  if (page !== 1) {
    queryClient.prefetchQuery({
      queryKey: ["youtubeChannels", sortBy, filters, search, page - 1],
      queryFn: () =>
        getYoutubeChannels({ sortBy, filters, search, page: page - 1 }),
    });
  }

  return { isLoading, youtubeChannels, count };
}

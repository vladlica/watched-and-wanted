import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSeriesDetails } from "../../services/apiSeries";

export function useSeriesDetails() {
  const { seriesId } = useParams();

  const {
    isLoading,
    isError,
    data: series,
    error,
  } = useQuery({
    queryKey: ["seriesDetails", seriesId],
    queryFn: () => getSeriesDetails(seriesId),
    retry: false,
  });

  return { isLoading, series, error, isError };
}

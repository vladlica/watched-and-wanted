import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getSeriesDetails } from "../../services/apiSeries";

export function useSeriesDetails() {
  const { seriesId } = useParams();
  const currentUserId = useOutletContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: series,
    error,
  } = useQuery({
    queryKey: ["seriesDetails", seriesId],
    queryFn: () => getSeriesDetails(seriesId),
    onSuccess: (data) => {
      if (data.userId !== currentUserId) navigate("/series");
    },
    retry: false,
  });

  return { isLoading, series, error, isError };
}

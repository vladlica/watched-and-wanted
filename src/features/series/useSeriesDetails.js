import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSeriesDetails } from "../../services/apiSeries";
import { useUser } from "../authentication/useUser";

export function useSeriesDetails() {
  const { seriesId } = useParams();
  const {
    user: { id: currentUserId },
  } = useUser();
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

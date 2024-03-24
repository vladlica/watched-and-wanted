import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getAnimeDetails } from "../../services/apiAnime";

export function useAnimeDetails() {
  const { animeId } = useParams();
  const { id: currentUserId } = useOutletContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: anime,
    error,
  } = useQuery({
    queryKey: ["animeDetails", animeId],
    queryFn: () => getAnimeDetails(animeId),
    onSuccess: (data) => {
      // Prevents users from viewing details of an anime added by another user
      if (data.userId !== currentUserId) navigate("/anime");
    },
    retry: false,
  });

  return { isLoading, anime, error, isError };
}

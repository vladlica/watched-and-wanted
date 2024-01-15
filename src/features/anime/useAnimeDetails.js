import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../../services/apiAnime";

export function useAnimeDetails() {
  const { animeId } = useParams();

  const {
    isLoading,
    isError,
    data: anime,
    error,
  } = useQuery({
    queryKey: ["animeDetails", animeId],
    queryFn: () => getAnimeDetails(animeId),
    retry: false,
  });

  return { isLoading, anime, error, isError };
}

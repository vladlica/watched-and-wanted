import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAnimeDetails } from "../../services/apiAnime";
import { useUser } from "../authentication/useUser";

export function useAnimeDetails() {
  const { animeId } = useParams();
  const {
    user: { id: currentUserId },
  } = useUser();
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
      if (data.userId !== currentUserId) navigate("/anime");
    },
    retry: false,
  });

  return { isLoading, anime, error, isError };
}

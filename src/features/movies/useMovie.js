import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../services/apiMovies";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useMovie() {
  const { movieId } = useParams();
  const {
    user: { id: currentUserId },
  } = useUser();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: movie,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
    onSuccess: (data) => {
      if (data.userId !== currentUserId) navigate("/movies");
    },
    retry: false,
  });

  return { isLoading, movie, error, isError };
}

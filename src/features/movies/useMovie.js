import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../services/apiMovies";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export function useMovie() {
  const { movieId } = useParams();
  const { id: currentUserId } = useOutletContext();
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

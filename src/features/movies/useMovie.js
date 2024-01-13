import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../services/apiMovies";
import { useParams } from "react-router-dom";

export function useMovie() {
  const { movieId } = useParams();

  const {
    isLoading,
    isError,
    data: movie,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
    retry: false,
  });

  return { isLoading, movie, error, isError };
}

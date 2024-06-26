import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie as deleteMovieApi } from "../../services/apiMovies";
import toast from "react-hot-toast";

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMovie } = useMutation({
    mutationFn: deleteMovieApi,
    onSuccess: () => {
      toast.success("Movie successfully deleted");
      // Invalidating the movies query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteMovie };
}

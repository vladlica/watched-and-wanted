import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie as updateMovieApi } from "../../services/apiMovies";
import toast from "react-hot-toast";

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateMovie } = useMutation({
    mutationFn: ({ id, updatedMovie, extraInfo }) =>
      updateMovieApi(id, updatedMovie, extraInfo),
    onSuccess: (data) => {
      toast.success(`Movie successfully updated`);

      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });

      queryClient.invalidateQueries({
        queryKey: ["movie", String(data.id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateMovie };
}

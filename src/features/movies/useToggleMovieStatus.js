import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "../../services/apiMovies";
import toast from "react-hot-toast";

export function useToggleMovieStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateMovie(id, obj),
    onSuccess: (data) => {
      toast.success(`Movie marked as ${data.status}`);

      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}

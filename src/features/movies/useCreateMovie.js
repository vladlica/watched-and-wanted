import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createMovie as createMovieApi } from "../../services/apiMovies";

export function useCreateMovie() {
  const queryClient = useQueryClient();

  const { mutate: createMovie, isLoading: isCreating } = useMutation({
    mutationFn: ({ newMovie, extraInfo }) =>
      createMovieApi(newMovie, extraInfo),
    onSuccess: () => {
      toast.success("New movie successfully created");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createMovie };
}

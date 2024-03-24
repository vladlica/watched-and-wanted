import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createAnime as createAnimeApi } from "../../services/apiAnime";

export function useCreateAnime() {
  const queryClient = useQueryClient();

  const { mutate: createAnime, isLoading: isCreating } = useMutation({
    mutationFn: ({ newAnime, extraInfo }) =>
      createAnimeApi(newAnime, extraInfo),
    onSuccess: () => {
      toast.success("New anime successfully created");
      // Invalidating the anime query to trigger a refetch and keep the data fresh
      queryClient.invalidateQueries({ queryKey: ["anime"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAnime };
}

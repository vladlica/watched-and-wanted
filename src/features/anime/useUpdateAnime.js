import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnime as updateAnimeApi } from "../../services/apiAnime";
import toast from "react-hot-toast";

export function useUpdateAnime() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateAnime } = useMutation({
    mutationFn: ({ id, updatedAnime, extraInfo }) =>
      updateAnimeApi(id, updatedAnime, extraInfo),
    onSuccess: (data) => {
      toast.success(`Anime successfully updated`);

      queryClient.invalidateQueries({
        queryKey: ["anime"],
      });

      queryClient.invalidateQueries({
        queryKey: ["animeDetails", String(data.id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateAnime };
}

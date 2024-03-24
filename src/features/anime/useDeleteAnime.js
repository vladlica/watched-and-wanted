import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnime as deleteAnimeApi } from "../../services/apiAnime";
import toast from "react-hot-toast";

export function useDeleteAnime() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAnime } = useMutation({
    mutationFn: deleteAnimeApi,
    onSuccess: () => {
      toast.success("Anime successfully deleted");
      // Invalidating the anime query to trigger a refetch and keep the data fresh
      queryClient.invalidateQueries({
        queryKey: ["anime"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAnime };
}

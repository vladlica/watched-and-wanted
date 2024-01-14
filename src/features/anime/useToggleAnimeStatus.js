import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnime } from "../../services/apiAnime";
import toast from "react-hot-toast";

export function useToggleAnimeStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateAnime(id, obj),
    onSuccess: (data) => {
      toast.success(`Anime marked as ${data.status}`);

      queryClient.invalidateQueries({
        queryKey: ["anime"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}

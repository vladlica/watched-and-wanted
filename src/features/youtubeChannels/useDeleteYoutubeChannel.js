import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteYoutubeChannel as deleteYoutubeChannelApi } from "../../services/apiYoutubeChannels";
import toast from "react-hot-toast";

export function useDeleteYoutubeChannel() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteYoutubeChannel } = useMutation({
    mutationFn: deleteYoutubeChannelApi,
    onSuccess: () => {
      toast.success("Youtube channel successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["youtubeChannels"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteYoutubeChannel };
}

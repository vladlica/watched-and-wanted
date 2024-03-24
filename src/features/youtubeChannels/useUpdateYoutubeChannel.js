import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateYoutubeChannel as updateYoutubeChannelApi } from "../../services/apiYoutubeChannels";
import toast from "react-hot-toast";

export function useUpdateYoutubeChannel() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateYoutubeChannel } = useMutation({
    mutationFn: ({ id, updatedYoutubeChannel, extraInfo }) =>
      updateYoutubeChannelApi(id, updatedYoutubeChannel, extraInfo),
    onSuccess: (data) => {
      toast.success(`Youtube channel successfully updated`);
      // Invalidating the youtubeChannels and youtubeChannel queries to trigger a refetch and keep the data fresh
      queryClient.invalidateQueries({
        queryKey: ["youtubeChannels"],
      });

      queryClient.invalidateQueries({
        queryKey: ["youtubeChannel", String(data.id)],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateYoutubeChannel };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateYoutubeChannel } from "../../services/apiYoutubeChannels";
import toast from "react-hot-toast";

export function useToggleYoutubeChannelStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isToggling, mutate: toggleStatus } = useMutation({
    mutationFn: ({ id, obj }) => updateYoutubeChannel(id, obj),
    onSuccess: (data) => {
      toast.success(`Youtube channel marked as ${data.status}`);
      // Invalidating the youtubeChannels query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({
        queryKey: ["youtubeChannels"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isToggling, toggleStatus };
}

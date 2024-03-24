import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createYoutubeChannel as createYoutubeChannelApi } from "../../services/apiYoutubeChannels";

export function useCreateYoutubeChannel() {
  const queryClient = useQueryClient();

  const { mutate: createYoutubeChannel, isLoading: isCreating } = useMutation({
    mutationFn: ({ newYoutubeChannel, extraInfo }) =>
      createYoutubeChannelApi(newYoutubeChannel, extraInfo),
    onSuccess: () => {
      toast.success("New Youtube channel successfully created");
      // Invalidating the youtubeChannels query to trigger a refetch and keep the data fresh 
      queryClient.invalidateQueries({ queryKey: ["youtubeChannels"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createYoutubeChannel };
}

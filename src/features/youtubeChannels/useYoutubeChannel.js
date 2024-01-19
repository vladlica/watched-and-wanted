import { useQuery } from "@tanstack/react-query";
import { getYoutubeChannel } from "../../services/apiYoutubeChannels";
import { useParams } from "react-router-dom";

export function useYoutubeChannel() {
  const { channelId } = useParams();

  const {
    isLoading,
    isError,
    data: youtubeChannel,
    error,
  } = useQuery({
    queryKey: ["youtubeChannel", channelId],
    queryFn: () => getYoutubeChannel(channelId),
    retry: false,
  });

  return { isLoading, youtubeChannel, error, isError };
}

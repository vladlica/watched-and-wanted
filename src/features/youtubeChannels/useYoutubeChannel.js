import { useQuery } from "@tanstack/react-query";
import { getYoutubeChannel } from "../../services/apiYoutubeChannels";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export function useYoutubeChannel() {
  const { channelId } = useParams();
  const { id: currentUserId } = useOutletContext();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: youtubeChannel,
    error,
  } = useQuery({
    queryKey: ["youtubeChannel", channelId],
    queryFn: () => getYoutubeChannel(channelId),
    onSuccess: (data) => {
      // Prevents users from viewing details of a youtube channel added by another user
      if (data.userId !== currentUserId) navigate("/channels");
    },
    retry: false,
  });

  return { isLoading, youtubeChannel, error, isError };
}

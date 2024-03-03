import { useQuery } from "@tanstack/react-query";
import { getYoutubeChannel } from "../../services/apiYoutubeChannels";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../authentication/useUser";

export function useYoutubeChannel() {
  const { channelId } = useParams();
  const {
    user: { id: currentUserId },
  } = useUser();
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
      if (data.userId !== currentUserId) navigate("/channels");
    },
    retry: false,
  });

  return { isLoading, youtubeChannel, error, isError };
}

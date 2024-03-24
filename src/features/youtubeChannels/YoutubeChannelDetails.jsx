import { useYoutubeChannel } from "./useYoutubeChannel";
import YoutubeChannelDetailsHeader from "./YoutubeChannelDetailsHeader";
import YoutubeChannelDetailsStats from "./YoutubeChannelDetailsStats";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";

function YoutubeChannelDetails() {
  const { isLoading, isError, error, youtubeChannel } = useYoutubeChannel();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <Row direction="horizontal">
        <YoutubeChannelDetailsHeader youtubeChannel={youtubeChannel} />
      </Row>

      <YoutubeChannelDetailsStats youtubeChannel={youtubeChannel} />
    </>
  );
}

export default YoutubeChannelDetails;

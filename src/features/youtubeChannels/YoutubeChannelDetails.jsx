import { useYoutubeChannel } from "./useYoutubeChannel";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import YoutubeChannelDetailsHeader from "./YoutubeChannelDetailsHeader";
import YoutubeChannelDetailsStats from "./YoutubeChannelDetailsStats";

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

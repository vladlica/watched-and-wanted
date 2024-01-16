import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import YoutubeChannelRow from "./YoutubeChannelRow";
import { useYoutubeChannels } from "./useYoutubeChannels";

function YoutubeChannelsTable() {
  const { isLoading, youtubeChannels, count } = useYoutubeChannels();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 1fr 1fr 2fr ">
      <Table.Header>
        <div>Channel Name</div>
        <div>Status</div>
        <div>Bell</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={youtubeChannels}
        render={(youtubeChannel) => (
          <YoutubeChannelRow
            youtubeChannel={youtubeChannel}
            key={youtubeChannel.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default YoutubeChannelsTable;

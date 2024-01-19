import YoutubeChannelsTable from "../features/youtubeChannels/YoutubeChannelsTable";
import CreateEditYoutubeChannelsForm from "../features/youtubeChannels/CreateEditYoutubeChannelsForm";
import Row from "../ui/Row";
import AddButton from "../ui/AddButton";
import YoutubeChannelsTableOperations from "../features/youtubeChannels/YoutubeChannelsTableOperations";
import YoutubeChannelsTableFilters from "../features/youtubeChannels/YoutubeChannelsTableFilters";

function YoutubeChannels() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Youtube Channels</h1>
        <YoutubeChannelsTableOperations />
      </Row>

      <Row direction="horizontal">
        <YoutubeChannelsTableFilters />
      </Row>

      <Row direction="vertical">
        <YoutubeChannelsTable />
        <AddButton
          form={<CreateEditYoutubeChannelsForm />}
          type="Youtube Channel"
        />
      </Row>
    </>
  );
}

export default YoutubeChannels;

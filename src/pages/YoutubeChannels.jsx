import YoutubeChannelsTable from "../features/youtubeChannels/YoutubeChannelsTable";
import CreateEditYoutubeChannelsForm from "../features/youtubeChannels/CreateEditYoutubeChannelsForm";
import Row from "../ui/Row";
import AddButton from "../ui/AddButton";

function YoutubeChannels() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Youtube Channels</h1>
        <span>Table operations</span>
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

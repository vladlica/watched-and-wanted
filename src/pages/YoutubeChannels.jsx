import YoutubeChannelsTable from "../features/youtubeChannels/YoutubeChannelsTable";
import Row from "../ui/Row";

function YoutubeChannels() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Youtube Channels</h1>
        <span>Table operations</span>
      </Row>

      <Row direction="vertical">
        <YoutubeChannelsTable />
        <span>Add Button</span>
        {/* <AddButton form={<CreateEditMoviesForm />} type="Movie" /> */}
      </Row>
    </>
  );
}

export default YoutubeChannels;

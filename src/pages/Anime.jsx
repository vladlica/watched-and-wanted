import AnimeTable from "../features/anime/AnimeTable";
import Row from "../ui/Row";
import AddButton from "../ui/AddButton";
import CreateEditAnimeForm from "../features/anime/CreateEditAnimeForm";

function Anime() {
  return (
    <>
      <Row direction="horizontal">
        <h1>Anime</h1>
        <span>Table operations</span>
      </Row>

      <Row direction="vertical">
        <AnimeTable />
        <AddButton form={<CreateEditAnimeForm />} type="Anime" />
      </Row>
    </>
  );
}

export default Anime;

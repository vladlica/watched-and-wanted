import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import AnimeRow from "./AnimeRow";
import { useAnime } from "./useAnime";

function AnimeTable() {
  const { isLoading, anime, count } = useAnime();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 1fr 1fr 2fr ">
      <Table.Header>
        <div>Title</div>
        <div>Status</div>
        <div>Episodes</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={anime}
        render={(animeItem) => (
          <AnimeRow anime={animeItem} key={animeItem.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default AnimeTable;

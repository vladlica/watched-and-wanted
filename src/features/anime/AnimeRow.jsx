import { useDeleteAnime } from "./useDeleteAnime";
import { useToggleAnimeStatus } from "./useToggleAnimeStatus";
import { statusToTagColor } from "../../utils/constants";
import CreateEditAnimeForm from "./CreateEditAnimeForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import TableActionsColumn from "../../ui/TableActionsColumn";

// Props:
// - anime: Object - containing information about the anime item
function AnimeRow({ anime }) {
  const { isToggling, toggleStatus } = useToggleAnimeStatus();
  const { isDeleting, deleteAnime } = useDeleteAnime();

  const isWatched = anime.status === "watched";

  return (
    <Table.Row>
      <div>{anime.title}</div>
      <div>
        <Tag color={statusToTagColor[anime.status]}>{anime.status}</Tag>
      </div>
      <div>{anime.numEpisodes || "-"}</div>
      <TableActionsColumn
        type="anime"
        isConsumed={isWatched}
        consumeType="watched"
        toggleOnClick={() =>
          toggleStatus({
            id: anime.id,
            obj: { status: isWatched ? "wanted" : "watched" },
          })
        }
        viewPath={`/anime/${anime.id}`}
        contentEditModal={<CreateEditAnimeForm anime={anime} />}
        contentDeleteModal={
          <ConfirmDelete
            onConfirmDelete={() => deleteAnime(anime.id)}
            disabled={isDeleting}
          />
        }
        disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default AnimeRow;

import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Table from "../../ui/Table";
import TableSvgContainer from "../../ui/TableSvgContainer";
import Tag from "../../ui/Tag";
import { statusToTagColor } from "../../utils/constants";
import TableActionsColumn from "../../ui/TableActionsColumn";
import CreateEditMoviesForm from "./CreateEditMoviesForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useToggleMovieStatus } from "./useToggleMovieStatus";
import { useDeleteMovie } from "./useDeleteMovie";

function MovieRow({ movie }) {
  const { isToggling, toggleStatus } = useToggleMovieStatus();
  const { isDeleting, deleteMovie } = useDeleteMovie();
  const isWatched = movie.status === "watched";
  return (
    <Table.Row>
      <div>{movie.title}</div>
      <div>
        <Tag color={statusToTagColor[movie.status]}>{movie.status}</Tag>
      </div>
      <div>{movie.duration || "-"}</div>
      <TableSvgContainer>
        {movie.hasBook ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>

      <TableActionsColumn
        type="movie"
        isConsumed={isWatched}
        consumeType="watched"
        toggleOnClick={() =>
          toggleStatus({
            id: movie.id,
            obj: { status: isWatched ? "wanted" : "watched" },
          })
        }
        // viewPath={`/series/${series.id}`}
        contentEditModal={<CreateEditMoviesForm movie={movie} />}
        contentDeleteModal={
          <ConfirmDelete
            onConfirmDelete={() => deleteMovie(movie.id)}
            disabled={isDeleting}
          />
        }
        disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default MovieRow;

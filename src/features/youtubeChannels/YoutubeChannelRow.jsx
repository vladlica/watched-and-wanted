import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Table from "../../ui/Table";
import TableSvgContainer from "../../ui/TableSvgContainer";
import Tag from "../../ui/Tag";
import { statusToTagColor } from "../../utils/constants";
import TableActionsColumn from "../../ui/TableActionsColumn";

function YoutubeChannelRow({ youtubeChannel }) {
  // const { isToggling, toggleStatus } = useToggleMovieStatus();
  // const { isDeleting, deleteMovie } = useDeleteMovie();
  const isSubscribed = youtubeChannel.status === "subscribed";
  return (
    <Table.Row>
      <div>{youtubeChannel.channelName}</div>
      <div>
        <Tag color={statusToTagColor[youtubeChannel.status]}>
          {youtubeChannel.status}
        </Tag>
      </div>
      <TableSvgContainer>
        {youtubeChannel.hasBell ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>

      <TableActionsColumn
        type="Youtube channel"
        isConsumed={isSubscribed}
        consumeType="subscribed"
        // toggleOnClick={() =>
        //   toggleStatus({
        //     id: movie.id,
        //     obj: { status: isWatched ? "wanted" : "watched" },
        //   })
        // }
        // viewPath={`/movies/${movie.id}`}
        // contentEditModal={<CreateEditMoviesForm movie={movie} />}
        // contentDeleteModal={
        //   <ConfirmDelete
        //     onConfirmDelete={() => deleteMovie(movie.id)}
        //     disabled={isDeleting}
        //   />
        // }
        // disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default YoutubeChannelRow;

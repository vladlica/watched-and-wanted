import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Table from "../../ui/Table";
import TableSvgContainer from "../../ui/TableSvgContainer";
import Tag from "../../ui/Tag";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { statusToTagColor } from "../../utils/constants";
import TableActionsColumn from "../../ui/TableActionsColumn";
import CreateEditYoutubeChannelsForm from "./CreateEditYoutubeChannelsForm";
import { useToggleYoutubeChannelStatus } from "./useToggleYoutubeChannelStatus";
import { useDeleteYoutubeChannel } from "./useDeleteYoutubeChannel";

function YoutubeChannelRow({ youtubeChannel }) {
  const { isToggling, toggleStatus } = useToggleYoutubeChannelStatus();
  const { isDeleting, deleteYoutubeChannel } = useDeleteYoutubeChannel();
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
        toggleOnClick={() =>
          toggleStatus({
            id: youtubeChannel.id,
            obj: { status: isSubscribed ? "wanted" : "subscribed" },
          })
        }
        viewPath={`/channels/${youtubeChannel.id}`}
        contentEditModal={
          <CreateEditYoutubeChannelsForm youtubeChannel={youtubeChannel} />
        }
        contentDeleteModal={
          <ConfirmDelete
            onConfirmDelete={() => deleteYoutubeChannel(youtubeChannel.id)}
            disabled={isDeleting}
          />
        }
        disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default YoutubeChannelRow;

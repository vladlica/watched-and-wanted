import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteYoutubeChannel } from "./useDeleteYoutubeChannel";
import HeaderDetails from "../../ui/HeaderDetails";
import TagsList from "../../ui/TagsList";
import Tag from "../../ui/Tag";
import { statusToTagColor } from "../../utils/constants";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import CreateEditYoutubeChannelsForm from "./CreateEditYoutubeChannelsForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function YoutubeChannelDetailsHeader({ youtubeChannel }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isDeleting, deleteYoutubeChannel } = useDeleteYoutubeChannel();
  const navigate = useNavigate();
  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[youtubeChannel.status]}`}>
            {youtubeChannel.status}
          </Tag>
          {youtubeChannel.hasBell && <Tag color="indigo">Bell</Tag>}
        </TagsList>
        <h1>{youtubeChannel.channelName}</h1>
      </HeaderDetails>

      <ButtonsList $justify="start">
        <Button
          $variation="primary"
          $size="small"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Youtube Channel
        </Button>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditYoutubeChannelsForm
              youtubeChannel={youtubeChannel}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <Button
          $variation="danger"
          $size="small"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete Youtube Channel
        </Button>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="Youtube channel"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() =>
                deleteYoutubeChannel(youtubeChannel.id, {
                  onSettled: () => navigate("/channels", { replace: true }),
                })
              }
              disabled={isDeleting}
            />
          </Modal>
        )}
        <Button
          $variation="secondary"
          $size="small"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </ButtonsList>
    </>
  );
}

export default YoutubeChannelDetailsHeader;

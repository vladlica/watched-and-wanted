import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAnime } from "./useDeleteAnime";
import { statusToTagColor } from "../../utils/constants";
import CreateEditAnimeForm from "./CreateEditAnimeForm";
import HeaderDetails from "../../ui/HeaderDetails";
import TagsList from "../../ui/TagsList";
import Tag from "../../ui/Tag";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

// Props:
// - anime: Object - Containing information about the anime item
function AnimeDetailsHeader({ anime }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isDeleting, deleteAnime } = useDeleteAnime();

  const navigate = useNavigate();

  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[anime.status]}`}>{anime.status}</Tag>
          {anime.biggestNumberOfEpisodes && (
            <Tag color="yellow">Longest anime</Tag>
          )}
          {anime.smallestNumberOfEpisodes && (
            <Tag color="yellow">Shortest anime</Tag>
          )}
        </TagsList>
        <h1>{anime.title}</h1>
      </HeaderDetails>

      <ButtonsList $justify="start">
        <Button
          $variation="primary"
          $size="small"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit anime
        </Button>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditAnimeForm
              anime={anime}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <Button
          $variation="danger"
          $size="small"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete anime
        </Button>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="anime"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() =>
                deleteAnime(anime.id, {
                  onSuccess: () => navigate("/anime", { replace: true }),
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

export default AnimeDetailsHeader;

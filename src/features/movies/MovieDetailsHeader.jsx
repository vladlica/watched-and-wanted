import { useNavigate } from "react-router-dom";
import HeaderDetails from "../../ui/HeaderDetails";
import Tag from "../../ui/Tag";
import TagsList from "../../ui/TagsList";
import { statusToTagColor } from "../../utils/constants";
import { useDeleteMovie } from "./useDeleteMovie";
import { useState } from "react";
import ButtonsList from "../../ui/ButtonsList";
import Button from "../../ui/Button";
import CreateEditMoviesForm from "./CreateEditMoviesForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function MovieDetailsHeader({ movie }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isDeleting, deleteMovie } = useDeleteMovie();
  const navigate = useNavigate();
  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[movie.status]}`}>{movie.status}</Tag>
          {movie.hasBook && <Tag color="indigo">Book</Tag>}
          {movie.biggestDuration && <Tag color="yellow">Longest movie</Tag>}
          {movie.smallestDuration && <Tag color="yellow">Shortest movie</Tag>}
        </TagsList>
        <h1>{movie.title}</h1>
      </HeaderDetails>

      <ButtonsList $justify="start">
        <Button
          $variation="primary"
          $size="small"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit movie
        </Button>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditMoviesForm
              movie={movie}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <Button
          $variation="danger"
          $size="small"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete movie
        </Button>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="movie"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() =>
                deleteMovie(movie.id, {
                  onSettled: () => navigate("/movies", { replace: true }),
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

export default MovieDetailsHeader;

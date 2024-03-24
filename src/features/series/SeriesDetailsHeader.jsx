import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { statusToTagColor } from "../../utils/constants";
import { useDeleteSeries } from "./useDeleteSeries";
import CreateEditSeriesForm from "./CreateEditSeriesForm";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TagsList from "../../ui/TagsList";
import HeaderDetails from "../../ui/HeaderDetails";
import ButtonsList from "../../ui/ButtonsList";

// Props:
// - series: Object - Containing information about the series item
function SeriesDetailsHeader({ series }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isDeleting, deleteSeries } = useDeleteSeries();
  const navigate = useNavigate();

  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[series.status]}`}>
            {series.status}
          </Tag>
          {series.hasBook && <Tag color="indigo">Book</Tag>}
          {series.hasMovie && <Tag color="orange">Movie</Tag>}
          {series.hasNews && <Tag color="red">News</Tag>}
          {series.isFinished && <Tag color="blue">Finished</Tag>}
          {series.biggestNumberOfSeasons && (
            <Tag color="yellow">Longest series by seasons</Tag>
          )}
          {series.smallestNumberOfSeasons && (
            <Tag color="yellow">Shortest series by seasons</Tag>
          )}
          {series.biggestNumberOfEpisodes && (
            <Tag color="yellow">Longest series by episodes</Tag>
          )}
          {series.smallestNumberOfEpisodes && (
            <Tag color="yellow">Shortest series by episodes</Tag>
          )}
        </TagsList>
        <h1>{series.title}</h1>
      </HeaderDetails>

      <ButtonsList $justify="start">
        <Button
          $variation="primary"
          $size="small"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit series
        </Button>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditSeriesForm
              series={series}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
        <Button
          $variation="danger"
          $size="small"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete series
        </Button>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="series"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() =>
                deleteSeries(series.id, {
                  onSuccess: () => navigate("/series", { replace: true }),
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

export default SeriesDetailsHeader;

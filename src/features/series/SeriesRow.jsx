import {
  HiOutlineCheck,
  HiOutlineEye,
  HiOutlineMinusCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import ButtonIcon from "../../ui/ButtonIcon";
import styled from "styled-components";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateEditSeriesForm from "./CreateEditSeriesForm";
import { useToggleSeriesStatus } from "./useToggleSeriesStatus";
import { useDeleteSeries } from "./useDeleteSeries";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";

const SvgContainer = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }
`;

function SeriesRow({ series }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isDeleting, deleteSeries } = useDeleteSeries();
  const { isToggling, toggleStatus } = useToggleSeriesStatus();

  const statusToTagColor = {
    watched: "green",
    wanted: "silver",
  };

  const isWatched = series.status === "watched";

  return (
    <Table.Row>
      <div>{series.title}</div>
      <div>
        <Tag color={statusToTagColor[series.status]}>{series.status}</Tag>
      </div>
      <div>{series.numSeasons || "-"}</div>
      <SvgContainer>
        {series.hasBook ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </SvgContainer>
      <SvgContainer>
        {series.hasMovie ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </SvgContainer>
      <SvgContainer>
        {series.hasNews ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </SvgContainer>
      <SvgContainer>
        {series.isFinished ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </SvgContainer>
      <div>
        <ButtonIcon
          title={`Mark series as ${isWatched ? "wanted" : "watched"}`}
          $place="table"
          onClick={() =>
            toggleStatus({
              id: series.id,
              obj: { status: isWatched ? "wanted" : "watched" },
            })
          }
        >
          {isWatched ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </ButtonIcon>

        <ButtonIcon
          title="View details about the series"
          $place="table"
          disabled={isToggling || isDeleting}
          onClick={() => navigate(`/series/${series.id}`)}
        >
          <HiOutlineEye />
        </ButtonIcon>

        <ButtonIcon
          title="Edit series"
          $place="table"
          onClick={() => setIsEditModalOpen(true)}
          disabled={isToggling || isDeleting}
        >
          <HiOutlinePencil />
        </ButtonIcon>
        {isEditModalOpen && (
          <Modal onClose={() => setIsEditModalOpen(false)}>
            <CreateEditSeriesForm
              series={series}
              onClose={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}

        <ButtonIcon
          title="Delete series"
          $place="table"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isToggling || isDeleting}
        >
          <HiOutlineTrash />
        </ButtonIcon>
        {isDeleteModalOpen && (
          <Modal onClose={() => setIsDeleteModalOpen(false)}>
            <ConfirmDelete
              type="series"
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() => deleteSeries(series.id)}
              disabled={isDeleting}
            />
          </Modal>
        )}
      </div>
    </Table.Row>
  );
}

export default SeriesRow;

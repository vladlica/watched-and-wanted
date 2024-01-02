import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import styled from "styled-components";
import CreateEditSeriesForm from "./CreateEditSeriesForm";
import { useToggleSeriesStatus } from "./useToggleSeriesStatus";
import { useDeleteSeries } from "./useDeleteSeries";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TableActionsColumn from "../../ui/TableActionsColumn";
import { statusToTagColor } from "../../utils/constants";

const SvgContainer = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }
`;

function SeriesRow({ series }) {
  const { isDeleting, deleteSeries } = useDeleteSeries();
  const { isToggling, toggleStatus } = useToggleSeriesStatus();

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

      <TableActionsColumn
        type="series"
        isConsumed={isWatched}
        consumeType="watched"
        toggleOnClick={() =>
          toggleStatus({
            id: series.id,
            obj: { status: isWatched ? "wanted" : "watched" },
          })
        }
        viewPath={`/series/${series.id}`}
        contentEditModal={<CreateEditSeriesForm series={series} />}
        contentDeleteModal={
          <ConfirmDelete
            onConfirmDelete={() => deleteSeries(series.id)}
            disabled={isDeleting}
          />
        }
        disabled={isToggling || isDeleting}
      />
    </Table.Row>
  );
}

export default SeriesRow;

import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import CreateEditSeriesForm from "./CreateEditSeriesForm";
import { useToggleSeriesStatus } from "./useToggleSeriesStatus";
import { useDeleteSeries } from "./useDeleteSeries";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TableActionsColumn from "../../ui/TableActionsColumn";
import TableSvgContainer from "../../ui/TableSvgContainer";
import { statusToTagColor } from "../../utils/constants";

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
      <TableSvgContainer>
        {series.hasBook ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>
      <TableSvgContainer>
        {series.hasMovie ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>
      <TableSvgContainer>
        {series.hasNews ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>
      <TableSvgContainer>
        {series.isFinished ? <HiOutlineCheck /> : <HiOutlineXMark />}
      </TableSvgContainer>

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

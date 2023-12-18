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

const SvgContainer = styled.div`
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }
`;

function SeriesRow({ series }) {
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
      <div>{series.seasons || "-"}</div>
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
        >
          {isWatched ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </ButtonIcon>

        <ButtonIcon title="View details about the series" $place="table">
          <HiOutlineEye />
        </ButtonIcon>

        <ButtonIcon title="Edit series" $place="table">
          <HiOutlinePencil />
        </ButtonIcon>

        <ButtonIcon title="Delete series" $place="table">
          <HiOutlineTrash />
        </ButtonIcon>
      </div>
    </Table.Row>
  );
}

export default SeriesRow;

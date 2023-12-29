import styled from "styled-components";
import Tag from "../../ui/Tag";

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagsList = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ButtonsList = styled.div`
  display: flex;
  gap: 1rem;
`;

function SeriesDetailsHeader({ series }) {
  const statusToTagColor = {
    watched: "green",
    wanted: "silver",
  };

  return (
    <>
      <HeaderDetails>
        <TagsList>
          <Tag color={`${statusToTagColor[series.status]}`}>
            {series.status}
          </Tag>
          {series.hasBook && <Tag color="indigo">Book</Tag>}
          {series.hasMovie && <Tag color="orange">Movie</Tag>}
          {series.hasNews && <Tag color="blue">News</Tag>}
          {series.isFinished && <Tag color="yellow">Finished</Tag>}
        </TagsList>
        <h1>{series.title}</h1>
      </HeaderDetails>
    </>
  );
}

export default SeriesDetailsHeader;

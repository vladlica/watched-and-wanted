import styled from "styled-components";
import Tag from "../../ui/Tag";
import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { dashboardColors } from "../../utils/constants";
import { Link } from "react-router-dom";

const StatBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  padding: 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const IconBox = styled.div`
  border-radius: 50%;
  background-color: var(--color-${(props) => props.color}-600);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-${(props) => props.color}-50);
  }
`;

const Title = styled.span`
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ValuesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;

  & a:link,
  a:visited {
    color: var(--color-orange-700);
  }

  & a:hover,
  a:active {
    text-decoration: underline;
  }
`;

const Value = styled.span`
  font-weight: 600;
`;

function Stats({ mostReadAuthors, longestSeries }) {
  return (
    <>
      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books.color}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Most read author{mostReadAuthors.length > 1 ? "s" : ""}</Title>
        </StatHeader>
        <ValuesBox>
          {mostReadAuthors.map((author) => (
            <Value key={author[0]}>{author[0]}</Value>
          ))}

          <Tag color={dashboardColors.books.color}>
            {mostReadAuthors[0][1]} books
          </Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books.color}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Longest series</Title>
        </StatHeader>
        <ValuesBox>
          {longestSeries.map((series) => (
            <Value key={series[0]}>{series[0]}</Value>
          ))}
          <Tag color={dashboardColors.books.color}>
            {longestSeries[0][1]} books
          </Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books.color}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Fastest read</Title>
        </StatHeader>
        <ValuesBox>
          <Value>
            <Link to="/books/149">
              Arta Conversatiei sau Eleganta Ignorantei
            </Link>
          </Value>
          <Tag color={dashboardColors.books.color}>5 days</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books.color}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Slowest read</Title>
        </StatHeader>
        <ValuesBox>
          <Value>
            <Link to="/books/150">Capatul Mortii</Link>
          </Value>
          <Tag color={dashboardColors.books.color}>24 days</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.series.color}>
            <HiOutlineVideoCamera />
          </IconBox>
          <Title>Total number of seasons watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.series.color}>102 seasons</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.series.color}>
            <HiOutlineVideoCamera />
          </IconBox>
          <Title>Total number of episodes watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.series.color}>1000 episodes</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.movies.color}>
            <HiOutlineFilm />
          </IconBox>
          <Title>Total watch time</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.movies.color}>12 days 23 hours</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.anime.color}>
            <HiOutlineLanguage />
          </IconBox>
          <Title>Total number of episodes watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.anime.color}>4542 episodes</Tag>
        </ValuesBox>
      </StatBox>
    </>
  );
}

export default Stats;

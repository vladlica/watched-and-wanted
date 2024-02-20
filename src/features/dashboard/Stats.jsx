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

function Stats() {
  return (
    <>
      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Most read author</Title>
        </StatHeader>
        <ValuesBox>
          <Value>Radu Paraschivescu</Value>
          <Tag color={dashboardColors.books}>22 books</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Longest series</Title>
        </StatHeader>
        <ValuesBox>
          <Value>Amintiri din trecutul Terrei</Value>
          <Tag color={dashboardColors.books}>12 books</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books}>
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
          <Tag color={dashboardColors.books}>5 days</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.books}>
            <HiOutlineBookOpen />
          </IconBox>
          <Title>Slowest read</Title>
        </StatHeader>
        <ValuesBox>
          <Value>
            <Link to="/books/150">Capatul Mortii</Link>
          </Value>
          <Tag color={dashboardColors.books}>24 days</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.series}>
            <HiOutlineVideoCamera />
          </IconBox>
          <Title>Total number of seasons watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.series}>102 seasons</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.series}>
            <HiOutlineVideoCamera />
          </IconBox>
          <Title>Total number of episodes watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.series}>1000 episodes</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.movies}>
            <HiOutlineFilm />
          </IconBox>
          <Title>Total watch time</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.movies}>12 days 23 hours</Tag>
        </ValuesBox>
      </StatBox>

      <StatBox>
        <StatHeader>
          <IconBox color={dashboardColors.anime}>
            <HiOutlineLanguage />
          </IconBox>
          <Title>Total number of episodes watched</Title>
        </StatHeader>
        <ValuesBox>
          <Tag color={dashboardColors.anime}>4542 episodes</Tag>
        </ValuesBox>
      </StatBox>
    </>
  );
}

export default Stats;

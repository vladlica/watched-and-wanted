import styled from "styled-components";
import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { dashboardColors } from "../../utils/constants";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";

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

// Props:
// - color: String - Determines the background and icon color
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
  color: var(--color-grey-600);
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
    border-radius: 25px;
  }

  & a:hover,
  a:active {
    text-decoration: underline;
    border-radius: 25px;
  }

  & a:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: 3px;
  }
`;

const Value = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

// Props:
// - mostReadAuthors: Object - An array containing the most read authors and the number of books read by each
//   Each author is represented by an array having the following structure: [nameOfTheAuthor, numberOfBooksReadFromThatAuthor]
// - longestSeries: Object - An array containing the longest series and the number of books in each series
//   Each series is represented by an array having the following structure: [nameOfTheSeries, numberOfBooksForThatSeries]
// - fastestRead: Object - An array containing books representing the fastest reads and the number of days taken to read each book
// - slowestRead: Object - An array containing books representing the slowest reads and the number of days taken to read each book
// - totalSeasons: Number - The total number of seasons watched in TV series
// - totalEpisodesSeries: Number - The total number of episodes watched in TV series
// - totalEpisodesAnime: Number - The total number of episodes watched in anime
// - totalWatchTime: String - The total watch time for movies, formatted as a string (e.g., "10 hours", "3 days 2 hours").
function Stats({
  mostReadAuthors,
  longestSeries,
  fastestSlowestRead: { fastestRead, slowestRead },
  totalSeasons,
  totalEpisodesSeries,
  totalEpisodesAnime,
  totalWatchTime,
}) {
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
          {mostReadAuthors.length > 0 ? (
            <>
              {mostReadAuthors.map((author) => (
                <Value key={author[0]}>{author[0]}</Value>
              ))}

              <Tag color={dashboardColors.books.color}>
                {/* If there are multiple authors, all of them will have the same number of books, so we take the number of books from the first one */}
                {mostReadAuthors[0][1]} books
              </Tag>
            </>
          ) : (
            <Value>No data</Value>
          )}
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
          {longestSeries.length > 0 ? (
            <>
              {" "}
              {longestSeries.map((series) => (
                <Value key={series[0]}>{series[0]}</Value>
              ))}
              {/* If there are multiple series, all of them will have the same number of books, so we take the number of books from the first one */}
              <Tag color={dashboardColors.books.color}>
                {longestSeries[0][1]} books
              </Tag>
            </>
          ) : (
            <Value>No data</Value>
          )}
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
          {fastestRead.length > 0 ? (
            <>
              {fastestRead.map((book) => (
                <Value key={book.id}>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </Value>
              ))}
              <Tag color={dashboardColors.books.color}>
                {/* If there are multiple books considered the fastest read, all of them will have the same number of days, so we take the number of days from the first one */}
                {fastestRead[0].readIn} days
              </Tag>
            </>
          ) : (
            <Value>No data</Value>
          )}
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
          {slowestRead.length > 0 ? (
            <>
              {slowestRead.map((book) => (
                <Value key={book.id}>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>
                </Value>
              ))}
              {/* If there are multiple books considered the slowest read, all of them will have the same number of days, so we take the number of days from the first one */}
              <Tag color={dashboardColors.books.color}>
                {slowestRead[0].readIn} days
              </Tag>
            </>
          ) : (
            <Value>No data</Value>
          )}
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
          {totalSeasons ? (
            <Tag color={dashboardColors.series.color}>
              {totalSeasons} seasons
            </Tag>
          ) : (
            <Value>No data</Value>
          )}
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
          {totalEpisodesSeries ? (
            <Tag color={dashboardColors.series.color}>
              {totalEpisodesSeries} episodes
            </Tag>
          ) : (
            <Value>No data</Value>
          )}
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
          {totalWatchTime ? (
            <Tag color={dashboardColors.movies.color}>{totalWatchTime}</Tag>
          ) : (
            <Value>No data</Value>
          )}
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
          {totalEpisodesAnime ? (
            <Tag color={dashboardColors.anime.color}>
              {totalEpisodesAnime} episodes
            </Tag>
          ) : (
            <Value>No data</Value>
          )}
        </ValuesBox>
      </StatBox>
    </>
  );
}

export default Stats;

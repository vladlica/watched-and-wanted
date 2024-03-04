import styled from "styled-components";
import TotalCounts from "./TotalCounts";
import MediaConsumptionChart from "./MediaConsumptionChart";
import ContentDistributionChart from "./ContentDistributionChart";
import PagesChart from "./PagesChart";
import BooksChart from "./BooksChart";
import Stats from "./Stats";
import { useBooks } from "../books/useBooks";
import Spinner from "../../ui/Spinner";
import { useSeries } from "../series/useSeries";
import { useMovies } from "../movies/useMovies";
import { useAnime } from "../anime/useAnime";
import { useYoutubeChannels } from "../youtubeChannels/useYoutubeChannels";
import {
  computeBooksAndPagesReadOverTheYears,
  computeContentDistribution,
  computeFastestSlowestRead,
  computeLongestSeries,
  computeMediaConsumption,
  computeMostReadAuthor,
  computeTotalEpisodesAnime,
  computeTotalEpisodesSeries,
  computeTotalSeasons,
  computeTotalWatchTime,
} from "../../utils/helpers";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2.5rem;
`;

function DashboardLayout() {
  const {
    isLoading: isLoadingBooks,
    books,
    count: countBooks,
  } = useBooks(true);
  const {
    isLoading: isLoadingSeries,
    series,
    count: countSeries,
  } = useSeries(true);
  const {
    isLoading: isLoadingMovies,
    movies,
    count: countMovies,
  } = useMovies(true);
  const {
    isLoading: isLoadingAnime,
    anime,
    count: countAnime,
  } = useAnime(true);
  const {
    isLoading: isLoadingYoutubeChannels,
    youtubeChannels,
    count: countYoutubeChannels,
  } = useYoutubeChannels(true);

  if (
    isLoadingBooks ||
    isLoadingSeries ||
    isLoadingMovies ||
    isLoadingAnime ||
    isLoadingYoutubeChannels
  )
    return <Spinner />;

  if (
    !countBooks &&
    !countSeries &&
    !countMovies &&
    !countAnime &&
    !countYoutubeChannels
  )
    return (
      <p>
        It's a bit lonely here! Why not kickstart your dashboard by adding some
        of your favorite books, series, movies, anime or Youtube channels?
      </p>
    );

  const counts = {
    books: countBooks,
    series: countSeries,
    movies: countMovies,
    anime: countAnime,
    youtubeChannels: countYoutubeChannels,
  };

  const dataMediaConsumption = computeMediaConsumption(
    books,
    series,
    movies,
    anime,
    youtubeChannels
  );

  const dataContentDistribution = computeContentDistribution(counts);

  const dataBooksPagesCharts = computeBooksAndPagesReadOverTheYears(books);

  const mostReadAuthorsData = computeMostReadAuthor(books);
  const longestSeriesData = computeLongestSeries(books);
  const fastestSlowestReadData = computeFastestSlowestRead(books);

  const totalSeasonsData = computeTotalSeasons(series);
  const totalEpisodesSeriesData = computeTotalEpisodesSeries(series);

  const totalEpisodesAnimeData = computeTotalEpisodesAnime(anime);

  const totalWatchTimeData = computeTotalWatchTime(movies);

  return (
    <StyledDashboardLayout>
      <TotalCounts counts={counts} />
      <MediaConsumptionChart data={dataMediaConsumption} />
      <ContentDistributionChart data={dataContentDistribution} />
      <Stats
        mostReadAuthors={mostReadAuthorsData}
        longestSeries={longestSeriesData}
        fastestSlowestRead={fastestSlowestReadData}
        totalSeasons={totalSeasonsData}
        totalEpisodesSeries={totalEpisodesSeriesData}
        totalEpisodesAnime={totalEpisodesAnimeData}
        totalWatchTime={totalWatchTimeData}
      />
      <BooksChart data={dataBooksPagesCharts} />
      <PagesChart data={dataBooksPagesCharts} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

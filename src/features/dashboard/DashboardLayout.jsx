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
import { computeMediaConsumption } from "../../utils/helpers";

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

  console.log(
    computeMediaConsumption(books, series, movies, anime, youtubeChannels)
  );

  return (
    <StyledDashboardLayout>
      <TotalCounts counts={counts} />
      <MediaConsumptionChart data={dataMediaConsumption} />
      <ContentDistributionChart />
      <Stats />
      <BooksChart />
      <PagesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

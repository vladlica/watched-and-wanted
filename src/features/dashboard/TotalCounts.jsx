import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlinePlayCircle,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { dashboardColors } from "../../utils/constants";
import { Link } from "react-router-dom";
import DetailBox from "../../ui/DetailBox";

// Props:
// - counts: Object - An object containing properties for each item type count
function TotalCounts({ counts }) {
  return (
    <>
      <DetailBox
        icon={<HiOutlineBookOpen />}
        details={[
          { label: <Link to="/books">Books</Link>, value: counts.books },
        ]}
        color={dashboardColors.books.color}
      />
      <DetailBox
        icon={<HiOutlineVideoCamera />}
        details={[
          { label: <Link to="/series">Series</Link>, value: counts.series },
        ]}
        color={dashboardColors.series.color}
      />
      <DetailBox
        icon={<HiOutlineFilm />}
        details={[
          { label: <Link to="/movies">Movies</Link>, value: counts.movies },
        ]}
        color={dashboardColors.movies.color}
      />
      <DetailBox
        icon={<HiOutlineLanguage />}
        details={[
          { label: <Link to="/anime">Anime</Link>, value: counts.anime },
        ]}
        color={dashboardColors.anime.color}
      />
      <DetailBox
        icon={<HiOutlinePlayCircle />}
        details={[
          {
            label: <Link to="/channels">YT channels</Link>,
            value: counts.youtubeChannels,
          },
        ]}
        color={dashboardColors.youtubeChannels.color}
      />
    </>
  );
}

export default TotalCounts;

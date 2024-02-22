import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlinePlayCircle,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import DetailBox from "../../ui/DetailBox";
import { dashboardColors } from "../../utils/constants";

function TotalCounts({ counts }) {
  return (
    <>
      <DetailBox
        icon={<HiOutlineBookOpen />}
        details={[{ label: "Books", value: counts.books }]}
        color={dashboardColors.books.color}
      />
      <DetailBox
        icon={<HiOutlineVideoCamera />}
        details={[{ label: "Series", value: counts.series }]}
        color={dashboardColors.series.color}
      />
      <DetailBox
        icon={<HiOutlineFilm />}
        details={[{ label: "Movies", value: counts.movies }]}
        color={dashboardColors.movies.color}
      />
      <DetailBox
        icon={<HiOutlineLanguage />}
        details={[{ label: "Anime", value: counts.anime }]}
        color={dashboardColors.anime.color}
      />
      <DetailBox
        icon={<HiOutlinePlayCircle />}
        details={[{ label: "YT channels", value: counts.youtubeChannels }]}
        color={dashboardColors.youtubeChannels.color}
      />
    </>
  );
}

export default TotalCounts;

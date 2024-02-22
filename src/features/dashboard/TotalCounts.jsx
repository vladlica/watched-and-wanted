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
        color={dashboardColors.books}
      />
      <DetailBox
        icon={<HiOutlineVideoCamera />}
        details={[{ label: "Series", value: counts.series }]}
        color={dashboardColors.series}
      />
      <DetailBox
        icon={<HiOutlineFilm />}
        details={[{ label: "Movies", value: counts.movies }]}
        color={dashboardColors.movies}
      />
      <DetailBox
        icon={<HiOutlineLanguage />}
        details={[{ label: "Anime", value: counts.anime }]}
        color={dashboardColors.anime}
      />
      <DetailBox
        icon={<HiOutlinePlayCircle />}
        details={[{ label: "YT channels", value: counts.youtubeChannels }]}
        color={dashboardColors.youtubeChannels}
      />
    </>
  );
}

export default TotalCounts;

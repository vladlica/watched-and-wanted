import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlinePlayCircle,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import DetailBox from "../../ui/DetailBox";
import { dashboardColors } from "../../utils/constants";

function TotalCounts() {
  return (
    <>
      <DetailBox
        icon={<HiOutlineBookOpen />}
        details={[{ label: "Books", value: 102 }]}
        color={dashboardColors.books}
      />
      <DetailBox
        icon={<HiOutlineVideoCamera />}
        details={[{ label: "Series", value: 120 }]}
        color={dashboardColors.series}
      />
      <DetailBox
        icon={<HiOutlineFilm />}
        details={[{ label: "Movies", value: 15 }]}
        color={dashboardColors.movies}
      />
      <DetailBox
        icon={<HiOutlineLanguage />}
        details={[{ label: "Anime", value: 24 }]}
        color={dashboardColors.anime}
      />
      <DetailBox
        icon={<HiOutlinePlayCircle />}
        details={[{ label: "YT channels", value: 45 }]}
        color={dashboardColors.youtubeChannels}
      />
    </>
  );
}

export default TotalCounts;

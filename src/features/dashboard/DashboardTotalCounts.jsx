import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineLanguage,
  HiOutlinePlayCircle,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import DetailBox from "../../ui/DetailBox";

function DashboardTotalCounts() {
  return (
    <>
      <DetailBox
        icon={<HiOutlineBookOpen />}
        details={[{ label: "Books", value: 102 }]}
      />
      <DetailBox
        icon={<HiOutlineVideoCamera />}
        details={[{ label: "Series", value: 120 }]}
      />
      <DetailBox
        icon={<HiOutlineFilm />}
        details={[{ label: "Movies", value: 15 }]}
      />
      <DetailBox
        icon={<HiOutlineLanguage />}
        details={[{ label: "Anime", value: 24 }]}
      />
      <DetailBox
        icon={<HiOutlinePlayCircle />}
        details={[{ label: "YT channels", value: 45 }]}
      />
    </>
  );
}

export default DashboardTotalCounts;

import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineLink,
  HiOutlinePlayPause,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { baseUrl } from "../../utils/constants";
import { Link } from "react-router-dom";
import DetailsContainer from "../../ui/DetailsContainer";
import DetailBox from "../../ui/DetailBox";

function SeriesDetailsStats({ series }) {
  return (
    <DetailsContainer>
      <DetailBox
        icon={<HiOutlineSquare3Stack3D />}
        details={[{ label: "Seasons", value: series.numSeasons || "-" }]}
      />
      <DetailBox
        icon={<HiOutlinePlayPause />}
        details={[{ label: "Episodes", value: series.numEpisodes || "-" }]}
      />

      {series.extra_info.map((extraInfo) => (
        <DetailBox
          key={extraInfo.id}
          icon={
            extraInfo.link ? <HiOutlineLink /> : <HiOutlineChatBubbleOvalLeft />
          }
          details={[
            {
              label: extraInfo.link ? "Link" : "Comment",
              value: extraInfo.link ? (
                extraInfo.link.includes(baseUrl) ? (
                  <Link to={`${extraInfo.link}`}>
                    {extraInfo.text || extraInfo.link}
                  </Link>
                ) : (
                  <a
                    href={`${extraInfo.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {extraInfo.text || extraInfo.link}
                  </a>
                )
              ) : (
                extraInfo.text
              ),
            },
          ]}
        />
      ))}
    </DetailsContainer>
  );
}

export default SeriesDetailsStats;

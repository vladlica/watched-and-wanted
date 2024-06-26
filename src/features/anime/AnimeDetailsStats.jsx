import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineLink,
  HiOutlinePlayPause,
} from "react-icons/hi2";
import DetailBox from "../../ui/DetailBox";
import DetailsContainer from "../../ui/DetailsContainer";

// Props:
// - anime: Object - Containing information about the anime item
function AnimeDetailsStats({ anime }) {
  return (
    <DetailsContainer>
      <DetailBox
        icon={<HiOutlinePlayPause />}
        details={[{ label: "Episodes", value: anime.numEpisodes || "-" }]}
      />

      {anime.extra_info.map((extraInfo) => (
        <DetailBox
          key={extraInfo.id}
          icon={
            extraInfo.link ? <HiOutlineLink /> : <HiOutlineChatBubbleOvalLeft />
          }
          details={[
            {
              label: extraInfo.link ? "Link" : "Comment",
              value: extraInfo.link ? (
                // Determines if the provided link is internal or external
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

export default AnimeDetailsStats;

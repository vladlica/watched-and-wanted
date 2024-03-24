import { HiOutlineChatBubbleOvalLeft, HiOutlineLink } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import DetailBox from "../../ui/DetailBox";
import DetailsContainer from "../../ui/DetailsContainer";

// Props:
// - youtubeChannel: Object - Containing information about the youtube channel item
function YoutubeChannelDetailsStats({ youtubeChannel }) {
  return (
    <DetailsContainer>
      {youtubeChannel.extra_info.map((extraInfo) => (
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

export default YoutubeChannelDetailsStats;

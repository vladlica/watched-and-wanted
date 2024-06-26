import { Link } from "react-router-dom";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineClock,
  HiOutlineLink,
} from "react-icons/hi2";
import { baseUrl } from "../../utils/constants";
import DetailBox from "../../ui/DetailBox";
import DetailsContainer from "../../ui/DetailsContainer";

// Props:
// - movie: Object - Containing information about the movie item
function MovieDetailsStats({ movie }) {
  return (
    <DetailsContainer>
      <DetailBox
        icon={<HiOutlineClock />}
        details={[{ label: "Duration (min)", value: movie.duration || "-" }]}
      />

      {movie.extra_info.map((extraInfo) => (
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

export default MovieDetailsStats;

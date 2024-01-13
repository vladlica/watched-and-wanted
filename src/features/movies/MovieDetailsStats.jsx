import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineClock,
  HiOutlineLink,
} from "react-icons/hi2";
import DetailBox from "../../ui/DetailBox";
import DetailsContainer from "../../ui/DetailsContainer";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/constants";

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

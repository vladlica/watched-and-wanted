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
import DetailsListContainer from "../../ui/DetailsListContainer";
import DetailsList from "../../ui/DetailsList";

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

      {series.extra_info.length > 0 && (
        <DetailsListContainer>
          <h2>Comments and links</h2>
          <DetailsList $type="grid">
            {series.extra_info.map((extraInfo) => (
              <li key={extraInfo.id}>
                {extraInfo.link ? (
                  <>
                    <HiOutlineLink />
                    {extraInfo.link.includes(baseUrl) ? (
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
                    )}
                  </>
                ) : (
                  <>
                    <HiOutlineChatBubbleOvalLeft />
                    <span>{extraInfo.text}</span>
                  </>
                )}
              </li>
            ))}
          </DetailsList>
        </DetailsListContainer>
      )}
    </DetailsContainer>
  );
}

export default SeriesDetailsStats;

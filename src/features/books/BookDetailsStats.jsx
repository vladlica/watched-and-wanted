import { format } from "date-fns";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineDocumentDuplicate,
  HiOutlineLink,
  HiOutlineUser,
} from "react-icons/hi2";
import { baseUrl } from "../../utils/constants";
import DetailsContainer from "../../ui/DetailsContainer";

import DetailBox from "../../ui/DetailBox";
import DetailsListContainer from "../../ui/DetailsListContainer";
import DetailsList from "../../ui/DetailsList";

function BookDetailsStats({ book }) {
  const statusToTagColor = {
    read: "green",
    wanted: "silver",
  };

  return (
    <DetailsContainer>
      <DetailBox
        icon={<HiOutlineUser />}
        details={[{ label: "Author", value: book.author }]}
      />
      <DetailBox
        icon={<HiOutlineBookOpen />}
        details={[{ label: "Volumes", value: book.numVolumes || "-" }]}
      />
      <DetailBox
        icon={<HiOutlineDocumentDuplicate />}
        details={[{ label: "Pages", value: book.numPages || "-" }]}
      />
      <DetailBox
        icon={<HiOutlineCalendarDays />}
        details={[
          {
            label: "Started on",
            value: book.startDate
              ? format(new Date(book.startDate), "dd MMM yyyy")
              : "-",
          },
          {
            label: "Finished on",
            value: book.finishDate
              ? format(new Date(book.finishDate), "dd MMM yyyy")
              : "-",
          },
        ]}
        oneLine={true}
      />

      {book.extra_info.length > 0 && (
        <DetailsListContainer>
          <h2>Comments and links</h2>
          <DetailsList $type="grid">
            {book.extra_info.map((extraInfo) => (
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

      {book?.booksSameSeries && (
        <DetailsListContainer>
          <h2>Books from the same series</h2>
          <DetailsList $type="grid">
            {book.booksSameSeries.map((item) => (
              <li key={item.id}>
                <Tag color={`${statusToTagColor[item.status]}`}>
                  {item.status}
                </Tag>
                <Link to={`/books/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </DetailsList>
        </DetailsListContainer>
      )}

      {book?.booksSameAuthor && (
        <DetailsListContainer>
          <h2>Books from the same author</h2>
          <DetailsList $type="grid">
            {book.booksSameAuthor.map((item) => (
              <li key={item.id}>
                <Tag color={`${statusToTagColor[item.status]}`}>
                  {item.status}
                </Tag>
                <Link to={`/books/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </DetailsList>
        </DetailsListContainer>
      )}

      {book?.booksSameYear && (
        <DetailsListContainer>
          <h2>Books read in the same year</h2>
          <DetailsList $type="flex">
            {book.booksSameYear.map((item) => (
              <li key={item.id}>
                <Link to={`/books/${item.id}`}>{item.title}</Link>

                <Tag color="blue">by {item.author}</Tag>
              </li>
            ))}
          </DetailsList>
        </DetailsListContainer>
      )}
    </DetailsContainer>
  );
}

export default BookDetailsStats;

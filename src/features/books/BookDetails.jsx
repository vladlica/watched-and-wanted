import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineDocumentDuplicate,
  HiOutlineLink,
  HiOutlineUser,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";
import { useBook } from "./useBook";
import Spinner from "../../ui/Spinner";
import { format } from "date-fns";

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  align-items: start;
`;

const Detail = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  padding: 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 25px;
`;

const LeftBox = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-orange-600);
  padding: 1rem;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-orange-50);
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  word-break: break-all;
`;

const Value = styled.span`
  font-weight: 600;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  align-items: start;

  /* Scrollbar customization */
  & ::-webkit-scrollbar {
    width: 1rem;
  }

  & ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  & ::-webkit-scrollbar-thumb {
    background: var(--color-orange-600);
    border-radius: 10px;
  }
`;

const ListContainer = styled.div`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 25px;

  max-height: 46rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    border: 1px solid var(--color-grey-200);
    border-radius: 25px;
    padding: 1rem;

    white-space: pre-wrap;
    word-break: break-word;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }

  & a:link,
  a:visited {
    color: var(--color-orange-700);
  }

  & a:hover,
  a:active {
    text-decoration: underline;
  }
`;

const List1 = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;

    border: 1px solid var(--color-grey-200);
    border-radius: 25px;
    padding: 1rem;

    white-space: pre-wrap;
    word-break: break-word;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }

  & a:link,
  a:visited {
    color: var(--color-orange-700);
  }

  & a:hover,
  a:active {
    text-decoration: underline;
  }
`;

const TagsList = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function BookDetails() {
  const { isLoading, book, error, isError } = useBook();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.message}</p>;

  const statusToTagColor = {
    read: "green",
    wanted: "silver",
  };

  console.log(book);

  const baseUrl = window.location.origin;

  return (
    <>
      <HeaderContainer>
        <TagsList>
          <Tag color={`${statusToTagColor[book.status]}`}>{book.status}</Tag>
          <Tag color="blue">{book.author}</Tag>
          {book.series && <Tag color="orange">{book.series} Series</Tag>}
          {book.finishDate && (
            <Tag color="indigo">
              Finished in {format(new Date(book.finishDate), "yyyy")}
            </Tag>
          )}
          {/* <Tag color="red">Longest book of 2023</Tag> */}
        </TagsList>

        <h1>{book.title}</h1>
        {book.series && <p>{book.series} Series</p>}
      </HeaderContainer>

      <DetailsContainer>
        <Detail>
          <LeftBox>
            <HiOutlineUser />
          </LeftBox>
          <RightBox>
            <span>Author</span>
            <Value>{book.author}</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineBookOpen />
          </LeftBox>
          <RightBox>
            <span>Volumes</span>
            <Value>{book.numVolumes || "-"}</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineDocumentDuplicate />
          </LeftBox>
          <RightBox>
            <span>Pages</span>
            <Value>{book.numPages || "-"}</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineCalendarDays />
          </LeftBox>
          <RightBox>
            <span>
              Started on{" "}
              <Value>
                {book.startDate
                  ? format(new Date(book.startDate), "dd MMM yyyy")
                  : "-"}
              </Value>
            </span>
            <span>
              Finished on{" "}
              <Value>
                {book.finishDate
                  ? format(new Date(book.finishDate), "dd MMM yyyy")
                  : "-"}
              </Value>
            </span>
          </RightBox>
        </Detail>
      </DetailsContainer>

      <ListsContainer>
        <ListContainer>
          <h2>Comments and links</h2>
          {book.extra_info.length > 0 ? (
            <List>
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
            </List>
          ) : (
            <p>No data to show</p>
          )}
        </ListContainer>

        {book.series && (
          <ListContainer>
            <h2>Books from the same series</h2>

            {book?.booksSameSeries ? (
              <List>
                {book.booksSameSeries.map((item) => (
                  <li key={item.id}>
                    <Tag color={`${statusToTagColor[item.status]}`}>
                      {item.status}
                    </Tag>
                    <Link to={`/books/${item.id}`}>{item.title}</Link>
                  </li>
                ))}
              </List>
            ) : (
              <p>No data to show</p>
            )}
          </ListContainer>
        )}

        <ListContainer>
          <h2>Books from the same author</h2>
          {book?.booksSameAuthor ? (
            <List>
              {book.booksSameAuthor.map((item) => (
                <li key={item.id}>
                  <Tag color={`${statusToTagColor[item.status]}`}>
                    {item.status}
                  </Tag>
                  <Link to={`/books/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </List>
          ) : (
            <p>No data to show</p>
          )}
        </ListContainer>

        <ListContainer>
          <h2>Books read in the same year</h2>
          {book?.booksSameYear ? (
            <List1>
              {book.booksSameYear.map((item) => (
                <li key={item.id}>
                  <Link to={`/books/${item.id}`}>{item.title}</Link>

                  <Tag color="blue">by {item.author}</Tag>
                </li>
              ))}
            </List1>
          ) : (
            <p>No data to show</p>
          )}
        </ListContainer>
      </ListsContainer>
    </>
  );
}

export default BookDetails;

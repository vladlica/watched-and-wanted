import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineDocumentDuplicate,
  HiOutlineLink,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";
import ButtonIcon from "../../ui/ButtonIcon";

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
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
`;

const Value = styled.span`
  font-weight: 600;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

  max-height: 47rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    /* display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem; */

    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    border: 1px solid var(--color-grey-200);
    border-radius: 25px;
    padding: 1rem;

    word-break: break-all;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-orange-600);
  }

  & a:hover,
  a:active {
    text-decoration: underline;
    color: var(--color-orange-600);
  }
`;

function BookDetails() {
  const { bookId } = useParams();

  return (
    <>
      <HeaderContainer>
        <Tag color="green">Read</Tag>
        <h1>Conspiratia</h1>
        <p>Robert Langdon Series</p>
      </HeaderContainer>

      <DetailsContainer>
        <Detail>
          <LeftBox>
            <HiOutlineUser />
          </LeftBox>
          <RightBox>
            <span>Author</span>
            <Value>Dan Brown</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineBookOpen />
          </LeftBox>
          <RightBox>
            <span>Volumes</span>
            <Value>2</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineDocumentDuplicate />
          </LeftBox>
          <RightBox>
            <span>Pages</span>
            <Value>440</Value>
          </RightBox>
        </Detail>
        <Detail>
          <LeftBox>
            <HiOutlineCalendarDays />
          </LeftBox>
          <RightBox>
            <span>
              Started on <Value>11 Nov 2023</Value>
            </span>
            <span>
              Finished on <Value>11 Nov 2023</Value>
            </span>
          </RightBox>
        </Detail>
      </DetailsContainer>

      <ListsContainer>
        <ListContainer>
          <h2>Comments and links</h2>
          <List>
            <li>
              <HiOutlineChatBubbleOvalLeft />
              <span>There are 3 books</span>
            </li>
            <li>
              <HiOutlineLink />
              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sequel
              </a>
            </li>
            <li>
              <HiOutlineLink />
              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://redditssssssssdsadadsassssssss.com
              </a>
            </li>
          </List>
        </ListContainer>

        <ListContainer>
          <h2>Books from the same series</h2>
          <List>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Codul lui Da Vinci</span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
          </List>
        </ListContainer>

        <ListContainer>
          <h2>Books from the same author</h2>
          <List>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>
                Codul lui Da Vincisssssssssssssssssssssssssssssssssssssssssss
              </span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
          </List>
        </ListContainer>

        <ListContainer>
          <h2>Books read in the same year</h2>
          <List>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Codul lui Da Vinci</span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
            <li>
              <Tag color="silver">Wanted</Tag>
              <span>Ingeri si Demoni</span>
            </li>
            <li>
              <Tag color="green">Read</Tag>
              <span>Inferno</span>
            </li>
          </List>
        </ListContainer>
      </ListsContainer>
    </>
  );
}

export default BookDetails;

import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineDocumentDuplicate,
  HiOutlineUser,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";

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
    </>
  );
}

export default BookDetails;

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`;

const P = styled.p`
  font-size: 1.5rem;

  & span {
    font-weight: 600;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border-radius: 25px;
  padding: 0.5rem 1.2rem;
  font-size: 1.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-orange-600);
    color: var(--color-orange-50);
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }
`;

function Pagination({ count }) {
  console.log(`There are ${count} books `);
  return (
    <StyledPagination>
      <P>
        Showing <span>1</span> to <span>10</span> of <span>{count}</span>{" "}
        results
      </P>
      <ButtonsContainer>
        <Button>
          <HiChevronLeft /> <span>Previous</span>
        </Button>
        <Button>
          <span>Next</span>
          <HiChevronRight />
        </Button>
      </ButtonsContainer>
    </StyledPagination>
  );
}

export default Pagination;

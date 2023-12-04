import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

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

  &:hover:not(:disabled) {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handleNext() {
    if (currentPage === pageCount) return;

    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  function handlePrevious() {
    if (currentPage === 1) return;

    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <ButtonsContainer>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </Button>
        <Button onClick={handleNext} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </Button>
      </ButtonsContainer>
    </StyledPagination>
  );
}

export default Pagination;

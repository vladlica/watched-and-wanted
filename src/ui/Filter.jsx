import styled from "styled-components";
import { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 25px;
`;

const FilterButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.4rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-orange-600);
      color: var(--color-orange-50);
    `}

  &:hover {
    background-color: var(--color-orange-600);
    color: var(--color-orange-50);
  }
`;

function Filter() {
  return (
    <StyledFilter>
      <FilterButton $active={true}>All</FilterButton>
      <FilterButton>Read</FilterButton>
      <FilterButton>Wanted</FilterButton>
    </StyledFilter>
  );
}

export default Filter;

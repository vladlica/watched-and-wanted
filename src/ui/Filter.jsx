import styled from "styled-components";
import { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 25px;
  box-shadow: var(--shadow-md);
  font-size: 1.5rem;
`;

// Props:
// - $active - Boolean - Indicating whether the button corresponds to the currently applied filter.
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

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

// Props:
// - options: Object - Array of filter options containing label and value
// - filteredField: String - The field used for filtering. Should match the name of the column used in the database.
function Filter({ options, filteredField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filteredField) || options.at(0).value;

  function handleClick(value) {
    // When applying a new filter and the 'page' parameter is set to a value greater than 1,
    // it might cause an error because the new set of results could be smaller, potentially
    // resulting in insufficient matches to accommodate the specified page number
    if (searchParams.get("page")) searchParams.set("page", 1);
    searchParams.set(filteredField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options?.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

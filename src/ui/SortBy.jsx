import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSortBy = styled.select`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  padding: 0.6rem 1.5rem;
  border-radius: 15px;
  box-shadow: var(--shadow-md);
  font-size: 1.5rem;

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || options.at(0).value;

  function handleChange(e) {
    if (searchParams.get("page")) searchParams.set("page", 1);

    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSortBy onChange={handleChange} value={sortBy}>
      {options?.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSortBy>
  );
}

export default SortBy;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const SearchForm = styled.form`
  display: flex;
`;

const SearchBarContainer = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  padding: 0.3rem 3rem 0.3rem 1.2rem;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: var(--shadow-md);

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const CancelTextButton = styled.button`
  position: absolute;
  right: 0.4rem;
  top: 50%;
  transform: translate(0, -50%);
  border: none;
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 0.2rem;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:hover svg {
    color: var(--color-orange-600);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

const SearchButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }
`;

// Props:
// - placeholder: String - Placeholder text for the search input
function Search({ placeholder = "Search" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const searchBarRef = useRef();

  useEffect(function () {
    searchBarRef.current.focus();
  }, []);

  function handleCancelText() {
    setSearch("");
    // When removing the text from the search input, two cases are considered:
    // 1) If the user had typed text and then cleared it, it's not ideal to send them back to the first page if they were on a different page before.
    //    For example, if the user was on page 3, it's preferable to keep them on page 3 after clearing the input.
    // 2) If the user had typed text, performed a search, and ended up on a page beyond the first page of results, clearing the input should reset them to the first page.
    //    For instance, if the user was on page 4 of the search results, clearing the input should bring them back to the first page to view the updated results.
    if (searchParams.get("page") && searchParams.get("search"))
      searchParams.set("page", 1);

    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function onSubmit(e) {
    e.preventDefault();
    // When searching using a new value and the 'page' parameter is set to a value greater than 1,
    // it might cause an error because the new set of results could be smaller, potentially
    // resulting in insufficient matches to accommodate the specified page number
    if (searchParams.get("page")) searchParams.set("page", 1);

    if (search.trim()) searchParams.set("search", search.trim());
    else searchParams.delete("search");

    setSearchParams(searchParams);
  }

  return (
    <SearchForm onSubmit={onSubmit}>
      <SearchBarContainer>
        <SearchBar
          type="text"
          placeholder={placeholder}
          ref={searchBarRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.trim() && (
          <CancelTextButton
            type="button"
            onClick={handleCancelText}
            title="Remove the text"
          >
            <HiXMark />
          </CancelTextButton>
        )}
      </SearchBarContainer>

      <SearchButton title="Search">
        <HiOutlineMagnifyingGlass />
      </SearchButton>
    </SearchForm>
  );
}

export default Search;

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBarContainer = styled.form`
  display: flex;
`;
const SearchBar = styled.input`
  border: 1px solid var(--color-grey-400);
  padding: 0.3rem 1.2rem;
  /* border-radius: 15px; */
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  &:focus {
    outline: 2px solid var(--color-orange-600);
    outline-offset: -2px;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const SearchButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-400);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function BooksTableSearchBar() {
  const searchBarRef = useRef();

  useEffect(function () {
    searchBarRef.current.focus();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log("submit action");
  }

  return (
    <SearchBarContainer onSubmit={onSubmit}>
      <SearchBar
        type="text"
        placeholder="Search for a book"
        ref={searchBarRef}
      />
      <SearchButton>
        <HiOutlineMagnifyingGlass />
      </SearchButton>
    </SearchBarContainer>
  );
}

export default BooksTableSearchBar;

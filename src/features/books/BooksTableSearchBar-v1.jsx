import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const SearchBarContainer = styled.form`
  display: flex;
`;

const SearchBar = styled.input`
  border: 1px solid var(--color-grey-100);
  padding: 0.3rem 1.2rem;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: var(--shadow-md);

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
  border: 1px solid var(--color-grey-100);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function BooksTableSearchBar() {
  const [search, setSearch] = useState("");
  const searchBarRef = useRef();
  let timer = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(function () {
    searchBarRef.current.focus();
  }, []);

  function onChange(e) {
    if (timer.current) clearTimeout(timer.current);
    setSearch(e.target.value);

    timer.current = setTimeout(() => {
      if (searchParams.get("page")) searchParams.set("page", 1);

      if (e.target.value) searchParams.set("search", e.target.value.trim());
      else searchParams.delete("search");

      setSearchParams(searchParams);
    }, 500);
  }

  function onSubmit(e) {
    e.preventDefault();

    if (searchParams.get("page")) searchParams.set("page", 1);

    if (search) searchParams.set("search", search);
    else searchParams.delete("search");

    setSearchParams(searchParams);
  }

  return (
    <SearchBarContainer onSubmit={onSubmit}>
      <SearchBar
        type="text"
        placeholder="Search for a book"
        ref={searchBarRef}
        value={search}
        onChange={onChange}
      />

      <SearchButton>
        <HiOutlineMagnifyingGlass />
      </SearchButton>
    </SearchBarContainer>
  );
}

export default BooksTableSearchBar;

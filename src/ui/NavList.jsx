import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineHome,
  HiOutlineLanguage,
  HiOutlinePlayCircle,
  HiOutlineUser,
  HiOutlineVideoCamera,
} from "react-icons/hi2";

const SyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Line = styled.div`
  width: 100%;
  background-color: var(--color-grey-200);
  height: 0.15rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
    color: var(--color-grey-600);
    padding: 1.2rem 1.4rem;
    border-radius: 25px;
    transition: all 0.3s;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-orange-600);
  }
`;

function NavList() {
  return (
    <SyledNavList>
      <li>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          <span>Dashboard</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/account">
          <HiOutlineUser />
          <span>Account</span>
        </StyledNavLink>
      </li>
      <Line />
      <li>
        <StyledNavLink to="/books">
          <HiOutlineBookOpen />
          <span>Books</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/series">
          <HiOutlineVideoCamera />
          <span>Series</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/movies">
          <HiOutlineFilm />
          <span>Movies</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/anime">
          <HiOutlineLanguage />
          <span>Anime</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/channels">
          <HiOutlinePlayCircle />
          <span>Youtube Channels</span>
        </StyledNavLink>
      </li>
    </SyledNavList>
  );
}

export default NavList;

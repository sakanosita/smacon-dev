import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from './container';

const Header = () => {

  return (
    <StyledHeader>
      <HeaderWrapper>
        <Link to="/">
          <img src="/media/logo5.svg" height="53" alt="smacon.dev logo"></img>
        </Link>
        <Link to="/tags/">
          <SearchIcon src="/media/search.png"></SearchIcon>
        </Link>
      </HeaderWrapper>
      <HeaderNavWrapper>
        <HeaderNavList>
          <HeaderNavListItem>
            <Link to="/solidity/">Solidity</Link>
          </HeaderNavListItem>

          <HeaderNavListItem>
            <Link to="/rust/">Rust</Link>
          </HeaderNavListItem>

          <HeaderNavListItem>
            <Link to="/motoko/">Motoko</Link>
          </HeaderNavListItem>
        </HeaderNavList>
      </HeaderNavWrapper>
    </StyledHeader>
  );
};

export default Header;

const HeaderNavList = ({ children }) => {
  return (
    <StyledNav>
      <StyledNavList>{children}</StyledNavList>
    </StyledNav>
  );
};

const HeaderNavListItem = ({ children }) => {
  return <StyledNavListItem>{children}</StyledNavListItem>;
};

const StyledHeader = styled.header`
  background-color:  white;

`;

const HeaderWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;

  margin-top: 0.3rem;
  margin-bottom: 0.3rem;

  @media screen and (max-width: 700px) {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
`;
const SearchIcon = styled.img`
  opacity: 0.5;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  margin-right: 0.8rem;
  height: 1.4rem;
`;

const HeaderNavWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
`;

const StyledNav = styled.nav`
  position: static;
  padding: 0;
  background: transparent;
  backdrop-filter: unset;
`;

const StyledNavList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  list-style-type: none;
  
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  @media screen and (max-width: 700px) {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
`;

const StyledNavListItem = styled.li`
  font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",
    "Segoe UI","Hiragino Kaku Gothic ProN","Hiragino Sans",
    Arial,Meiryo,sans-serif;
  
  & a {
    color: inherit;
    font-size: var(--size-300);
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.1rem;
  }

  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (max-width: 700px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

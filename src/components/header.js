import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from './container';

const Header = () => {

  return (
    <StyledHeader>
      <HeaderWrapper>
        <Link to="/">
          <img src="/media/smacondev-logo3.png" height="45"></img>
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
  padding-top: 0.3rem;
  background-color:  rgba(255, 255, 255, 0.8);

`;

const HeaderWrapper = styled(Container)`
  display: flex;
  justify-content: space-between;

  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  @media screen and (max-width: 700px) {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
  }
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

  & a {
    color: inherit;
    font-weight: bold;
    text-transform: uppercase;
    font-size: var(--size-300);
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

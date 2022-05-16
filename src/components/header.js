import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from './container';
// import { useStaticQuery, graphql } from 'gatsby';

const Header = () => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `
  // );

  return (
    <StyledHeader>
      <HeaderWrapper>
        <HeaderTitle>
          <Link to="/">smacon.dev</Link>
        </HeaderTitle>

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

          {/* <HeaderNavListItem>
            <Link to="/about">About</Link>
          </HeaderNavListItem> */}

          {/* <HeaderNavListItem>
            <Link to="/contact">Contact</Link>
          </HeaderNavListItem> */}
        </HeaderNavList>
      </HeaderWrapper>
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
  padding-top: 0.1rem;
  background-color:  rgba(255, 255, 255, 0.9);
`;

const HeaderWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  & a {
    font-weight: bold;
    text-decoration: none;
    font-size: var(--size-400);
    margin-right: 20px;
    color: inherit;
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
  justify-content: space-around;
  padding: 0;
  list-style-type: none;
`;

const StyledNavListItem = styled.li`
  &:not(:first-of-type) {
    margin-left: 2rem;
  }
  & a {
    color: inherit;
    font-weight: bold;
    text-transform: uppercase;
    font-size: var(--size-300);
    text-decoration: none;
    letter-spacing: 0.1rem;
  }
  @media screen and (max-width: 700px) {
    &:not(:first-of-type) {
      margin-left: 0.5rem;
    }
    & a {
      font-size: var(--size-300);
    }
  }
`;

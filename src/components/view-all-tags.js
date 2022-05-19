import React from 'react';
import StyledLink from '../components/styled-link';
import styled from 'styled-components';

const ViewAllTags = () => {

  return (
    <StyledLink
        css={`
        margin-top: 1rem;
        margin-bottom: 3rem;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        font-weight: bold;
        width: fit-content;
        opacity: 0.5;
        `}
        to="/tags/"
    >
      キーワード
      <SearchIcon src="/media/search.png"></SearchIcon>
    </StyledLink>
  );
};

export default ViewAllTags;

const SearchIcon = styled.img`
  margin-left: 0.6rem;
  height: 1.4rem;
`;
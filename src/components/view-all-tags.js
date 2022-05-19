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
        opacity: 0.6;
        `}
        to="/tags/"
    >
      <SearchIcon src="/media/search.png"></SearchIcon>
      キーワード
    </StyledLink>
  );
};

export default ViewAllTags;

const SearchIcon = styled.img`
  margin-right: 0.4rem;
  height: 1.4rem;
`;
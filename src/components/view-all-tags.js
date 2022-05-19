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
        `}
        to="/tags/"
    >
        <SearchIcon src="/media/search.png"></SearchIcon>
        <StyledText>
          キーワード
        </StyledText>
    </StyledLink>
  );
};

export default ViewAllTags;

const StyledText = styled.span`
  opacity: 0.5;
`;

const SearchIcon = styled.img`
  opacity: 0.5;
  margin-right: 0.6rem;
  height: 1.4rem;
`;
import React from 'react';
import StyledLink from '../components/styled-link';

const ViewAllTags = () => {

  return (
    <StyledLink
        css={`
        margin-top: var(--size-400);
        margin-bottom: var(--size-400);
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        `}
        to="/tags/"
    >
    キーワードを見る
    </StyledLink>
  );
};

export default ViewAllTags;
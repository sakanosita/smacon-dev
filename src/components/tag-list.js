import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const TagList = ({ tags }) => {
  return (
    <StyledTagList>
      {tags &&
        tags.map((tag) => {
          return (
            <TagItem key={tag}>
              <Link to={`/tags/${tag}/`}>
                <StyledText>{tag}</StyledText>
              </Link>
            </TagItem>
          );
        })}
    </StyledTagList>
  );
};

export default TagList;

const StyledTagList = styled.div`
  margin-top: 2rem;
`

const StyledText = styled.span`
  opacity: 0.5;
  @media screen and (max-width: 700px) {
    opacity: 0.5;
  }
`;

const TagItem = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;
  // text-transform: uppercase;
  font-size: var(--size-300);
  white-space: nowrap;

  & a {
    position: relative;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    color: inherit;
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 4px;
  }

  & a:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  @media screen and (max-width: 700px) {
    font-size: 85%;
    font-weight: 600;
  }
`;

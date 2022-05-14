import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const RelatedList = ({ posts }) => {
  const RelatedList = posts.map(({ frontmatter, fields, excerpt, timeToRead }) => {
    const { title, tags, date, description } = frontmatter;
    const { slug } = fields;

    return (
      <PostListItem
        key={slug}
        tags={tags}
        title={title}
        date={date}
        slug={slug}
        timeToRead={timeToRead}
        description={description}
        excerpt={excerpt}
      />
    );
  });

  return <StyledPostList>{RelatedList}</StyledPostList>;
};

export default RelatedList;

const PostListItem = ({
  title,
  date,
  timeToRead,
  tags,
  excerpt,
  description,
  slug,
}) => {
  return (
    <StyledPostListItem>

      <PostListTitle>
        <Link to={slug}>{title}</Link>
      </PostListTitle>

    </StyledPostListItem>
  );
};

const StyledPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  & > * {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    margin: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const StyledPostListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 0rem;
  margin-bottom: 0rem;
  font-size: var(--size-400);
  font-weight: 600;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

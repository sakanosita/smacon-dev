import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import TagList from './tag-list';

const PostList = ({ posts }) => {
  const PostList = posts.map(({ frontmatter, fields, excerpt, timeToRead }) => {
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

  return <StyledPostList>{PostList}</StyledPostList>;
};

export default PostList;

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

      <PostListMeta>
        <span>{date}</span>
        <span>{timeToRead} mins</span>
      </PostListMeta>

      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />

      <TagList tags={tags} />
    </StyledPostListItem>
  );
};

const StyledPostList = styled.ul`
  padding: 0;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  list-style: none;
  display: grid;
  grid-gap: var(--size-400);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

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
  padding: 1.2rem;
  padding-bottom: 0.6rem;
  margin-bottom: 0.6rem;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 0rem;
  margin-bottom: 1rem;
  font-size: var(--size-700);
  font-weight: 700;

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

  @media screen and (max-width: 700px) {
    font-size: var(--size-500);
  }
`;

const PostListExcerpt = styled.p`
  margin-top: 1rem;
  font-size: var(--size-300);
`;

const PostListMeta = styled.div`
  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
`;

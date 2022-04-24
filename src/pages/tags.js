import React from 'react';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

const toKebabCase = (str) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');
};

const Tags = ({ data }) => {
  const tags = data.allMarkdownRemark.group;

  return (
    <Layout title="キーワード一覧 | smacon.dev">
      <TagsTemplateWrapper>
        <Title>キーワード一覧</Title>

        <TagsList>
          {tags.map((tag) => (
            <TagItem>
              <Link to={`/tags/${toKebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue}
              </Link>
            </TagItem>
          ))}
        </TagsList>
      </TagsTemplateWrapper>
    </Layout>
  );
};

export default Tags;

const TagsTemplateWrapper = styled.div`
  padding-top: var(--size-900);
`;

const Title = styled.h1`
  font-size: var(--size-700);
`;

// const TagItem = styled.div`
//   & a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

const TagsList = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
  margin-right: auto;
  margin-top: auto;
  max-width: 80ch;
  word-wrap: break-word;
`
const TagItem = styled.span`
  display: inline-block;
  margin-top: 0.6rem;
  margin-right: 0.6rem;
  margin-bottom: 0.6rem;
  font-size: var(--size-400);
  white-space: nowrap;

  & a {
    position: relative;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    color: inherit;
    padding: 0.2rem 0.6rem;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 4px;
  }

  & a:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

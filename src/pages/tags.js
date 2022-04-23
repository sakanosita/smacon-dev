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

        <ul>
          <TagItem>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${toKebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
          </TagItem>
        </ul>
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

const TagItem = styled.div`
  & a {
    color: inherit;
    text-decoration: none;
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

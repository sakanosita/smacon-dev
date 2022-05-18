import React from 'react';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Tags = ({ pageContext, data }) => {
  const tags = data.allMarkdownRemark.group;
  const {
    breadcrumb: { crumbs },
  } = pageContext

  return (

    <Layout title="キーワード一覧 | smacon.dev">
      <BreadcrumbStyled>
        <Breadcrumb
          crumbs={crumbs}
          crumbLabel='キーワード'
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>
      <TagsTemplateWrapper>
        <Title>キーワード一覧</Title>

        <TagsList>
          {tags.map((tag) => (
            <TagItem>
              <Link to={`/tags/${tag.fieldValue}/`}>
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

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
  .breadcrumb__link {
    color: gray;
  }
  .breadcrumb__link__active {
    color: gray;
  }
  .breadcrumb__list__item {
    font-size: var(--size-300);
  }
  .breadcrumb__separator {
    color: gray;
    font-size: var(--size-300);
  }
`

const TagsTemplateWrapper = styled.div`
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-size: var(--size-700);
  margin-left: 1rem;
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

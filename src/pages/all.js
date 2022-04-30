import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';
import ViewAllTags from '../components/view-all-tags';

const All = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const title = data.site.siteMetadata.title.default;

  return (
    <Layout title={title}>
      <HeaderWrapper>
        <h1>All Posts</h1>
      </HeaderWrapper>

      <PostList posts={posts} />

      <ViewAllTags/>
    </Layout>
  );
};

export default All;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--size-900);
  margin-bottom: var(--size-700);

  h1 {
    max-width: none;
  }
`;

export const homePageQuery = graphql`
  query {
    site {
      siteMetadata {
        title {
          default
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
        }
      }
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';
import ViewAllTags from '../components/view-all-tags';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const All = ({ pageContext, data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const title = data.site.siteMetadata.title;
  const description = data.markdownRemark.frontmatter.description;
  const {
    breadcrumb: { crumbs },
  } = pageContext
  
  return (
    <Layout
      title={title}
      description={description}>

      <BreadcrumbStyled>
        <Breadcrumb
          crumbs={crumbs}
          crumbLabel='すべての記事'
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>

      <HeaderWrapper>
        <h1>All Posts</h1>
      </HeaderWrapper>

      <PostList posts={posts} />

      <ViewAllTags/>
    </Layout>
  );
};

export default All;

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

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 2rem;
  margin-left: 1rem;

  h1 {
    max-width: none;
  }
`;

export const homePageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          unlisted: { ne: true }
        }
        fields: { contentType: { eq: "posts" } }
      }
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

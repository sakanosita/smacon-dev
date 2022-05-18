import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Rust = ({ pageContext, data }) => {
  const site = data.site;
  const popularPosts = data.popularPosts.nodes;
  const updatePosts = data.updatePosts.nodes;

  const title = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;
  const socialImage = data.markdownRemark.frontmatter.social_image ? `/og/${data.markdownRemark.frontmatter.social_image.relativePath}` : ''
  
  const {
    breadcrumb: { crumbs },
  } = pageContext

  return (
    <Layout title={title} description={description} socialImage={socialImage}>

      <BreadcrumbStyled>
        <Breadcrumb
          crumbs={crumbs}
          crumbLabel='Rust'
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>

      <Board>
        <h3>人気の記事</h3>
        <PostList posts={popularPosts} />
      </Board>
      <Board>
        <h3>最新の記事</h3>
        <PostList posts={updatePosts} />
      </Board>

      <ShareButtonList
        title={title}
        url={`${site.siteMetadata.siteUrl}/rust/`}
      />
    </Layout>
  );
};

export default Rust;

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
`

const Board = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 2rem;
  & h3 {
    font-size: var(--size-600);
    padding-left: 1rem;
    & a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    popularPosts: allMarkdownRemark(
      limit: 3
      sort: { order: ASC, fields: frontmatter___pinned }
      filter: {
        frontmatter: {
            pinned: { ne: null }
            tags: { in: [
                "Rust",
                "Solana"
            ] } 
        }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          title
        }
        timeToRead
        excerpt
      }
    }
    updatePosts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: { in: [
                "Rust",
                "Solana"
            ] } 
        }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          tags
          title
        }
        timeToRead
        excerpt
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        social_image {
          relativePath
        }
      }
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Motoko = ({ pageContext, data }) => {
  const site = data.site;
  const motokoPosts = data.motokoPosts.nodes;
  const dfinityPosts = data.dfinityPosts.nodes;

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
          crumbLabel='Motoko'
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>

      <Board>
        <h3>Motoko Language プログラミング学習</h3>
        <PostList posts={motokoPosts} />
      </Board>
      <Board>
        <h3>Internet Computer 入門</h3>
        <PostList posts={dfinityPosts} />
      </Board>

      <ShareButtonList
        title={title}
        url={`${site.siteMetadata.siteUrl}/motoko/`}
      />
    </Layout>
  );
};

export default Motoko;

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
`

const Board = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
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
    motokoPosts: allMarkdownRemark(
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: {
                in: [
                    "Motoko"
                ],
                ne: "Rust"
            } 
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
    dfinityPosts: allMarkdownRemark(
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: {
                in: [
                    "DFINITY",
                    "Internet Computer"
                ],
                ne: "Rust"
            } 
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

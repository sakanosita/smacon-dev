import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ViewAllTags from '../components/view-all-tags';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';

const Motoko = ({ data }) => {
  const site = data.site;
  const motokoPosts = data.motokoPosts.nodes;
  const dfinityPosts = data.dfinityPosts.nodes;

  const title = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;
  const socialImage = data.markdownRemark.frontmatter.social_image ? `/og/${data.markdownRemark.frontmatter.social_image.relativePath}` : ''
  
  return (
    <Layout title={title} description={description} socialImage={socialImage}>
        {/* <Intro>
            <h1>Motoko and Making Canisters on DFINITY</h1>
            <p>DFINITY の Internet Computer (ICP) を使ったキャニスター開発</p>
        </Intro> */}

        <Board>
          <h3>Motoko プログラミング学習</h3>
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

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 7rem;
  margin-bottom: 5rem;
  text-align: center;
  
  & h1 {
    font-size: var(--size-900);
  }

  & p {
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-800);
    }
  }
`;

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
            tags: {
                in: [
                    "Motoko",
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

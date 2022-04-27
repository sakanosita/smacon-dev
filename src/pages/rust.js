import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ViewAllTags from '../components/view-all-tags';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';

const Rust = ({ data }) => {
  const site = data.site;
  const popularPosts = data.popularPosts.nodes;
  const updatePosts = data.updatePosts.nodes;

  const title = "Rust ではじめるスマートコントラクト入門 | Web3 プログラミング教室"
  const description = "WASM のブロックチェーンを使った Dapps 開発, 初心者向けの Solana, NEAR, DFINITY 学習"

  return (
    <Layout title={title} description={description}>
        
        <Intro>
            <h1>Rust and Building Decendtalized WASM</h1>
            <p>WASM のブロックチェーンを使ったスマートコントラクト開発</p>
        </Intro>

        <Board>
          <h3>人気の記事</h3>
          <PostList posts={popularPosts} />
        </Board>
        <Board>
          <h3>最新の記事</h3>
          <PostList posts={updatePosts} />
        </Board>

        <ViewAllTags/>

        <ShareButtonList
          title={title}
          url={`${site.siteMetadata.siteUrl}/rust/`}
        />
    </Layout>
  );
};

export default Rust;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--size-800);
  margin-bottom: var(--size-900);
  text-align: center;

  & p {
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--size-900);
  margin-bottom: var(--size-600);
  & h3 {
    font-size: 120%;
    text-align: center;
    & a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

export const pageQuery = graphql`
  query {
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
  }
`;

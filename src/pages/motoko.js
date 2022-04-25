import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ViewAllTags from '../components/view-all-tags';
import styled from 'styled-components';

const Motoko = ({ data }) => {

  const motokoPosts = data.motokoPosts.nodes;
  const dfinityPosts = data.dfinityPosts.nodes;

  return (
    <Layout
      title="Motoko ではじめてのキャニスター開発 | Internet Computer プログラミング"
      description="Motoko プログラミング入門, Internet Computer (ICP)を使ったキャニスター開発">
        <Intro>
            <h1>Motoko and Making Canisters on DFINITY</h1>
            <p>Motokoプログラミング入門, Internet Computer(ICP)を使ったキャニスター開発</p>
        </Intro>

        <Board>
          <h3>Motokoプログラミング学習</h3>
          <PostList posts={motokoPosts} />
        </Board>
        <Board>
          <h3>Internet Computer入門</h3>
          <PostList posts={dfinityPosts} />
        </Board>

        <ViewAllTags/>
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
  margin-bottom: var(--size-900);
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
  }
`;

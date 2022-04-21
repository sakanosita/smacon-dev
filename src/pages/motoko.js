import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import StyledLink from '../components/styled-link';
import styled from 'styled-components';

const Motoko = ({ data }) => {

  const popularPosts = data.popularPosts.nodes;
  const updatePosts = data.updatePosts.nodes;

  return (
    <Layout title="Motoko and Making Canisters on DFINITY">
        <Intro>
            <h1>Motoko and Making Canisters on DFINITY</h1>
            <p>Motokoプログラミング入門, ICP(Internet Computer)を使ったキャニスター開発</p>
        </Intro>

        <Board>
          <h3>人気の記事</h3>
          <PostList posts={popularPosts} />
        </Board>
        <Board>
          <h3>最新の記事</h3>
          <PostList posts={updatePosts} />
        </Board>

        <StyledLink
            css={`
            margin-top: var(--size-400);
            display: inline-block;
            `}
            to="/tags"
        >
            View All tags
        </StyledLink>
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
    popularPosts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            pinned: { ne: null }
            tags: {
                in: [
                    "Motoko",
                    "DFINITY",
                    "ICP"
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
    updatePosts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            tags: {
                in: [
                    "Motoko",
                    "DFINITY",
                    "ICP"
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

import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';
import ViewAllTags from '../components/view-all-tags';
import ShareButtonList from '../components/sharing-button-list';

const HomePage = ({ data }) => {
  const site = data.site;
  const updatePosts = data.updatePosts.nodes;
  const popularPosts = data.popularPosts.nodes;
  const solidityPosts = data.solidityPosts.nodes;
  const rustPosts = data.rustPosts.nodes;
  const motokoPosts = data.motokoPosts.nodes;
  const intro = data.markdownRemark.html;
  const title = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;

  return (
    <Layout
      title={title}
      description={description}>
      <Intro
        dangerouslySetInnerHTML={{
          __html: intro,
        }}
      />

      <Board>
        <h3>人気の記事</h3>
        <PostList posts={popularPosts} />
      </Board>

      <Board>
        <h3>
          <Link to="/solidity/">Solidity プログラミング入門</Link>
        </h3>
        <PostList posts={solidityPosts} />
      </Board>
      <Board>
        <h3>
          <Link to="/rust/">Rust プログラミング入門</Link>
        </h3>
        <PostList posts={rustPosts} />
      </Board>
      <Board>
        <h3>
          <Link to="/motoko/">Motoko プログラミング入門</Link>
        </h3>
        <PostList posts={motokoPosts} />
      </Board>

      <Board>
        <h3>最新の記事</h3>
        <PostList posts={updatePosts} />
      </Board>

      <ViewAllTags/>

      <ShareButtonList
          title={title}
          url={`${site.siteMetadata.siteUrl}`}
        />
    </Layout>
  );
};

export default HomePage;

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
  query ($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    popularPosts: allMarkdownRemark(
      filter: {
        frontmatter: { pinned: { ne: null }},
        fields: { contentType: { eq: "posts" } } 
      }
      sort: { order: ASC, fields: frontmatter___pinned }
      limit: 3
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
    updatePosts: allMarkdownRemark(
      filter: {
        frontmatter: { unlisted: { ne: true }},
        fields: { contentType: { eq: "posts" } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 3
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
    solidityPosts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: { in: [
                "Solidity",
                "Chainlink",
                "Ethereum",
                "Hardhat"
            ] } 
        }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
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
    rustPosts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: { in: [
                "Rust"
            ] } 
        }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
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
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            unlisted: { ne: true }
            tags: { in: [
                "Motoko"
            ] } 
        }
        fields: { contentType: { eq: "posts" } }
      }
    ) {
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
      }
    }
  }
`;

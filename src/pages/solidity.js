import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import StyledLink from '../components/styled-link';
import styled from 'styled-components';

const Solidity = ({ data }) => {
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout title="How to Write Solidity">
        <Intro>
            <h1>How to Write Solidity</h1>
            <p>Build Web3 Dapps on blockchains: Ethereum, Avalanche, Polygon, Binance Smart Chain, Fantom, Aurora, Moonbeam</p>
        </Intro>
        <PostList posts={posts} />
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

export default Solidity;

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
    text-transform: capitalize;
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
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

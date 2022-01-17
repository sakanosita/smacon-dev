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
    <Layout title="Solidity">
      <SolidityWrapper>
        <Title>
          Solidity
        </Title>

        <p>How to develop smart contracts, build Web3 Dapps on Blockchains</p>

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
      </SolidityWrapper>
    </Layout>
  );
};

export default Solidity;

const SolidityWrapper = styled.div`
  padding-top: var(--size-900);
`;

const Title = styled.h1`
  font-size: var(--size-700);
`;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
            tags: { in: [
                "Solidity"
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

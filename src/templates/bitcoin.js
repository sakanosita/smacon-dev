import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostList from "../components/post-list";
import ShareButtonList from "../components/sharing-button-list";
import styled from "styled-components";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import "gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css";

const Bitcoin = ({ pageContext, data }) => {
  const site = data.site;
  const bitcoinPosts = data.bitcoinPosts.nodes;

  const title = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;

  const {
    breadcrumb: { crumbs },
  } = pageContext;

  return (
    <Layout title={title} description={description}>
      <BreadcrumbStyled>
        <Breadcrumb crumbs={crumbs} crumbLabel="Bitcoin" crumbSeparator=" > " />
      </BreadcrumbStyled>

      <Board>
        <h3>Bitcoin の記事</h3>
        <PostList posts={bitcoinPosts} />
      </Board>

      <ShareButtonList
        title={title}
        url={`${site.siteMetadata.siteUrl}/bitcoin/`}
      />
    </Layout>
  );
};

export default Bitcoin;

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
`;

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
    bitcoinPosts: allMarkdownRemark(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { unlisted: { ne: true }, tags: { in: ["Bitcoin"] } }
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
      }
    }
  }
`;

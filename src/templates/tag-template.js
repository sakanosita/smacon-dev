import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ViewAllTags from '../components/view-all-tags';
import styled from 'styled-components';
import ShareButtonList from '../components/sharing-button-list';

const TagsTemplate = ({ pageContext, data }) => {
  const site = data.site;
  const { tag } = pageContext;
  // const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const title = `はじめてのスマートコントラクト開発 – '${tag}' の検索結果`;

  return (
    <Layout title={title}>

      <TagsTemplateWrapper>
        <Title>
          '{tag}' の検索結果
        </Title>
        <PostList posts={posts} />
      </TagsTemplateWrapper>

      <ViewAllTags/>
      <ShareButtonList
          title={title}
          url={`${site.siteMetadata.siteUrl}/tags/${tag}`}
        />
    </Layout>
  );
};

export default TagsTemplate;

const TagsTemplateWrapper = styled.div`
  padding-top: var(--size-900);
  margin-top: var(--size-600);
  margin-bottom: var(--size-600);
`;

const Title = styled.h1`
  font-size: var(--size-700);
`;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
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

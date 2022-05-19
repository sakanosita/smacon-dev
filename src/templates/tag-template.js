import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ViewAllTags from '../components/view-all-tags';
import styled from 'styled-components';
import ShareButtonList from '../components/sharing-button-list';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const TagsTemplate = ({ path, pageContext, data }) => {
  const site = data.site;
  const { tag } = pageContext;
  // const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const title = `はじめてのスマートコントラクト開発 – '${tag}' の検索結果`;

  const crumbs = [
    {
      pathname: '/',
      crumbLabel: 'Home'
    },
    {
      pathname: '/tags/',
      crumbLabel: 'キーワード'
    },
    {
      pathname: path,
      crumbLabel: tag
    }
  ]

  return (
    <Layout title={title}>
      <BreadcrumbStyled>
        <Breadcrumb
          crumbs={crumbs}
          crumbLabel={tag}
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>
      <TagsTemplateWrapper>
        <Title>
          '{tag}' の検索結果
        </Title>
        <PostList posts={posts} />
      </TagsTemplateWrapper>

      <ShareButtonList
          title={title}
          url={`${site.siteMetadata.siteUrl}${path}`}
        />

      <ViewAllTags/>
    </Layout>
  );
};

export default TagsTemplate;

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
`

const TagsTemplateWrapper = styled.div`
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-size: var(--size-700);
  margin-left: 1rem;
`;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
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

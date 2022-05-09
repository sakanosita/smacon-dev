import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import RelatedList from '../components/related-list';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';
import Tags from '../components/tags';

const PostTemplate = ({ data }) => {
  const site = data.site;
  const { frontmatter, excerpt, html } = data.markdownRemark;
  const slug = data.markdownRemark.fields.slug;
  const relatedPosts = data.relatedPosts.nodes;

  return (
    <Layout
      title={frontmatter.title}
      description={frontmatter.description || excerpt}
      socialImage={frontmatter.social_image ? `/og/${frontmatter.social_image.relativePath}` : ''}
    >
      <PostWrapper>
        <article>
          <PostTitle>{frontmatter.title}</PostTitle>
          <PostDate>{frontmatter.date}</PostDate>

          <PostContent dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <ShareButtonList
          title={frontmatter.title}
          url={`${site.siteMetadata.siteUrl}${slug}`} />
        <Tags tags={frontmatter.tags} />

        <Board>
          <h4>こちらもおすすめ</h4>
          <RelatedList posts={relatedPosts} />
        </Board>
      </PostWrapper>

    </Layout>
  );
};

export default PostTemplate;

const PostWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
  margin-left: auto;
  margin-right: auto;
  max-width: 70ch;
  word-wrap: break-word;
`;

const PostTitle = styled.h1`
  font-size: var(--size-600);
`;

const PostDate = styled.span`
  font-size: var(--size-400);
  padding-top: 1rem;
  float: right;
  text-transform: uppercase;
`;

const PostContent = styled.section`
  padding-top: var(--size-800);
  margin-bottom: var(--size-900);

  & > * + * {
    margin-top: var(--size-300);
  }

  & > p + p {
    margin-top: var(--size-700);
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: var(--size-900);
  }

  h1 {
    font-size: var(--size-600);
  }

  h2 {
    font-size: var(--size-500);
  }

  h3 {
    font-size: var(--size-400);
  }

  b,
  strong {
    font-weight: 600;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 0.125rem;
  }

  blockquote {
    padding-left: var(--size-400);
    border-left: 5px solid;
    font-style: italic;
  }

  code {
    // font-family: 'Source Sans Pro', monospace;
    overflow-x: auto;
    white-space: pre-wrap;
  }

  pre {
    overflow-x: auto;
    white-space: pre-wrap;
    max-width: 100%;
  }
`;

const Board = styled.div`

  margin-top: var(--size-800);
  display: flex;
  flex-direction: column;
  margin-bottom: var(--size-600);
  & h4 {
    font-size: 100%;
    & a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

export const pageQuery = graphql`
  query PostBySlug($slug: String!, $blogTags: [String]) {
    site {
      siteMetadata {
        siteUrl
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        tags
        date(formatString: "MMM DD, YYYY")
        description
        social_image {
          relativePath
        }
      }
    }

    relatedPosts: allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }

      filter: {
        frontmatter: {
          unlisted: { ne: true }
          tags: { in: $blogTags }
        }
        fields: {
          slug: { ne: $slug }
          contentType: { eq: "posts" }
        }
      }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`;

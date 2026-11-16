import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import RelatedList from '../components/related-list';
import ShareButtonList from '../components/sharing-button-list';
import styled from 'styled-components';
import TagList from '../components/tag-list';

const UI_TEXT = {
  ja: { related: `こちらもおすすめ`, switchLang: `English version` },
  en: { related: `Related posts`, switchLang: `日本語版はこちら` },
};

const withTrailingSlash = (path) => (path.endsWith(`/`) ? path : `${path}/`);

const PostTemplate = ({ data, pageContext }) => {
  const site = data.site;
  const { frontmatter, excerpt, html } = data.markdownRemark;
  const slug = data.markdownRemark.fields.slug;
  const lang = pageContext.lang || `ja`;
  const text = UI_TEXT[lang];
  const translation = data.translation;
  var relatedPosts = data.relatedPosts.nodes.length ? data.relatedPosts.nodes : data.latestPosts.nodes;

  const siteUrl = site.siteMetadata.siteUrl;
  const alternates = translation
    ? [
        { hreflang: lang, href: `${siteUrl}${withTrailingSlash(slug)}` },
        {
          hreflang: lang === `ja` ? `en` : `ja`,
          href: `${siteUrl}${withTrailingSlash(translation.fields.slug)}`,
        },
        {
          hreflang: `x-default`,
          href: `${siteUrl}${withTrailingSlash(lang === `ja` ? slug : translation.fields.slug)}`,
        },
      ]
    : [];

  return (
    <Layout
      title={frontmatter.title}
      description={frontmatter.description || excerpt}
      socialImage={frontmatter.social_image ? `/og/${frontmatter.social_image.relativePath}` : ''}
      lang={lang}
      alternates={alternates}
    >
      <PostWrapper>
        <article>
          <PostTitle>{frontmatter.title}</PostTitle>
          <PostMeta>
            {translation ? (
              <LangSwitch
                to={translation.fields.slug}
                hrefLang={lang === `ja` ? `en` : `ja`}
              >
                {text.switchLang}
              </LangSwitch>
            ) : (
              <span />
            )}
            <PostDate>{frontmatter.date}</PostDate>
          </PostMeta>

          <PostContent dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <ShareButtonList
          title={frontmatter.title}
          url={`${siteUrl}${slug}`} />
        {lang === `ja` && <TagList tags={frontmatter.tags} />}

        <Related>
          <h4>{text.related}</h4>
          <RelatedList posts={relatedPosts} />
        </Related>
      </PostWrapper>

    </Layout>
  );
};

export default PostTemplate;

const PostWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 70ch;
  word-wrap: break-word;
`;

const PostTitle = styled.h1`

  font-size: var(--size-800);

  margin-top: 4rem;
  margin-bottom: 4rem;
  
  @media screen and (max-width: 700px) {
    font-size: var(--size-500);
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--size-400);

  margin-top: var(--size-600);
`;

const LangSwitch = styled(Link)`
  font-size: var(--size-400);
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 0.125rem;
`;

const PostDate = styled.span`
  font-size: var(--size-400);

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
    font-size: 85%;
    @media screen and (max-width: 700px) {
      font-size: 85%;
    }
  }

  pre {
    overflow-x: auto;
    white-space: pre-wrap;
    max-width: 100%;
  }
`;

const Related = styled.div`

  margin-top: var(--size-800);
  display: flex;
  flex-direction: column;
  margin-bottom: var(--size-600);
  & h4 {
    font-size: var(--size-500);
    & a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

export const pageQuery = graphql`
  query PostBySlug(
    $slug: String!
    $blogTags: [String]
    $permalink: String
    $contentType: String = "posts"
    $translationContentType: String = "posts-en"
  ) {
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
    translation: markdownRemark(
      frontmatter: { permalink: { eq: $permalink } }
      fields: { contentType: { eq: $translationContentType } }
    ) {
      fields {
        slug
      }
    }
    relatedPosts: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          unlisted: { ne: true }
          tags: { in: $blogTags }
        }
        fields: {
          slug: { ne: $slug }
          contentType: { eq: $contentType }
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
    latestPosts: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          unlisted: { ne: true }
        }
        fields: {
          slug: { ne: $slug }
          contentType: { eq: $contentType }
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

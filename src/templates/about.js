import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const AboutTemplate = ({ pageContext, data }) => {
  const { html, frontmatter } = data.markdownRemark;
  const profileImage = getImage(frontmatter.profile_image);
  const {
    breadcrumb: { crumbs },
  } = pageContext

  return (
    <Layout title={frontmatter.title}>
      <BreadcrumbStyled>
        <Breadcrumb
          crumbs={crumbs}
          crumbLabel='About us'
          crumbSeparator=' > '
        />
      </BreadcrumbStyled>
      <AboutWrapper>
        <AboutImageWrapper image={profileImage} alt="" />
        <AboutCopy dangerouslySetInnerHTML={{ __html: html }} />
      </AboutWrapper>
    </Layout>
  );
};

export default AboutTemplate;

const BreadcrumbStyled = styled.div`
  margin-top: 0.6rem;
  margin-left: 1.2rem;
`

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;

  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column;
    }

    & > * {
      margin-top: 2rem;
      width: 100%;
      text-align: center;
    }
  }
`;

const AboutImageWrapper = styled(GatsbyImage)`
  display: block;
  border-radius: 50%;
  height: 200px;
  width: 200px;
`;

const AboutCopy = styled.div`
  max-width: 60ch;
  h1 {
    font-size: var(--size-800);
  }
  & p {
    font-size: var(--size-400);
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        profile_image {
          childImageSharp {
            gatsbyImageData(
              height: 400
              placeholder: BLURRED
              formats: [PNG]
            )
          }
        }
      }
    }
  }
`;

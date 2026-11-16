import React, { Fragment } from 'react';
import Seo from './seo';
import Header from './header';
import Footer from './footer';
import Container from './container';
import GlobalStyle from './global-styles';
import styled from 'styled-components';

const Layout = ({ children, title, description, socialImage, lang, alternates }) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Seo
        title={title}
        description={description}
        socialImage={socialImage}
        lang={lang}
        alternates={alternates}
      />
      <LayoutWrapper>
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </LayoutWrapper>
    </Fragment>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & main {
    margin-top: 0;
    margin-bottom: auto;
  }

  & footer {
    margin-top: auto;
  }
`;

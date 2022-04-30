module.exports = {
  siteMetadata: {
    title: {
      header: `smacon.dev`,
      default: `はじめてのスマートコントラクト開発 | Web3 プログラミング教室`,
      solidity: ``,
      rust: ``,
      motoko ``
    },
    author: {
      name: `Moto Sakanosita`,
      summary: `A Programmer at Edtech`,
    },
    openGraphImage: {
      default: `/og/link-500-260.png`,
      twitter: `/og/link.png`
    },
    description: {
      default: `Solidity, Rust, Motoko を使ってイーサリアム (EVM) や WASM のブロックチェーンでスマートコントラクト開発。ゼロ知識証明やオラクル、マークルツリーのしくみや使い方。初心者向けの Web3 プログラミング学習。`,
      solidity: `Ethereum (EVM) を使ったスマートコントラクト開発。初心者向け Solidity プログラミング学習。ゼロ知識証明やオラクル、マークルツリーのしくみや使い方。`,
      rust: `WASM のブロックチェーン (Solana, NEAR, DFINITY...) でスマートコントラクト開発。初心者向けの Rust プログラミング学習。`,
      motoko: `DFINITY Internet Computer (ICP) を使ってキャニスター開発。初心者向け Motoko プログラミング学習。dfx や Candid UI の使い方。`
    },
    siteUrl: `https://www.smacon.dev`,
    social: {
      twitter: `smacondev`,
    },
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com/smacon-dev/',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/smacondev',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `media`,
        path: `${__dirname}/static/media`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `og`,
        path: `${__dirname}/static/og`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/netlify-cms/index.js`,
        enableIdentityWidget: true,
        publicPath: 'admin',
        htmlTitle: 'Content Manager',
        includeRobots: false,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source Sans Pro`, `Poppins\:400,400i,700`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SMACON DEV`,
        short_name: `smacon.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-4Z853P3PLM",
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/blog/',
          '/contact/'
        ],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMarkdownRemark {
            nodes {
              frontmatter {
                date
              },
              fields {
                slug
              }
            }
          }
        }`,
        resolveSiteUrl: (data) => {
          return data.site.siteMetadata.siteUrl
        },
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allPosts },
        }) => {
          const pathToDateMap = {};

          allPosts.map(post => {
            pathToDateMap [post.fields.slug] = { date: post.frontmatter.date };
          });
      
          const pages = allPages.map(page => {
            return { ...page, ...pathToDateMap [page.path] };
          });
      
          return pages;
        },
        serialize: ({ path, date }) => {
          let entry = {
            url: path,
            changefreq: 'daily',
            priority: 0.5,
          };
      
          if (date) {
            entry.priority
             = 0.7;
            entry.lastmod = date;
          }
      
          return entry;
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect' // make sure this is always the last one
  ]
};

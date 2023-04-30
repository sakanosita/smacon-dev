const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const toKebabCase = (str) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
          nodes {
            fields {
              contentType
              slug
            }
            frontmatter {
              template
              tags
            }
          }
        }
        tagsGroup: allMarkdownRemark(
          limit: 2000
          filter: { fields: { contentType: { eq: "posts" } } }
        ) {
          group(field: {frontmatter: {tags: SELECT}}) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const tags = result.data.tagsGroup.group;
  const allMarkdownNodes = result.data.allMarkdownRemark.nodes;

  const postMarkdownNodes = allMarkdownNodes.filter(
    (node) => node.fields.contentType === `posts`
  );

  const pageMarkdownNodes = allMarkdownNodes.filter(
    (node) => node.fields.contentType === `pages`
  );

  if (postMarkdownNodes.length > 0) {
    postMarkdownNodes.forEach((node, index) => {
      let prevSlug = null;
      let nextSlug = null;
      let blogTags = [];

      blogTags = postMarkdownNodes[index].frontmatter.tags;

      if (index > 0) {
        prevSlug = postMarkdownNodes[index - 1].fields.slug;
      }

      if (index < postMarkdownNodes.length - 1) {
        nextSlug = postMarkdownNodes[index + 1].fields.slug;
      }

      createPage({
        path: `${node.fields.slug}`,
        component: path.resolve(`./src/templates/post-template.js`),
        context: {
          slug: `${node.fields.slug}`,
          prevSlug: prevSlug,
          nextSlug: nextSlug,
          blogTags: blogTags,
        },
      });
    });
  }

  if (pageMarkdownNodes.length > 0) {
    pageMarkdownNodes.forEach((node) => {
      if (node.frontmatter.template) {
        const templateFile = `${String(node.frontmatter.template)}.js`;

        createPage({
          path: `${node.fields.slug}`,
          component: path.resolve(`src/templates/${templateFile}`),
          context: {
            slug: `${node.fields.slug}`,
          },
        });
      }
    });
  }

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: path.resolve(`./src/templates/tag-template.js`),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const relativeFilePath = createFilePath({
      node,
      getNode,
    });

    const fileNode = getNode(node.parent);

    createNodeField({
      node,
      name: `contentType`,
      value: fileNode.sourceInstanceName,
    });

    if (fileNode.sourceInstanceName === 'posts') {
      const slug = node.frontmatter.permalink
      createNodeField({
        name: `slug`,
        node,
        value: `/posts${slug}`,
      });
    }

    if (fileNode.sourceInstanceName === 'pages') {
      createNodeField({
        name: `slug`,
        node,
        value: relativeFilePath,
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      template: String
      level: String
      unlisted: Boolean
      tags: [String!]
    }

    type Fields {
      slug: String
      contentType: String
    }
  `);
};

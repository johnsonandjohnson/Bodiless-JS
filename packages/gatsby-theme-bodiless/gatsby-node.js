/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const pathUtil = require('path');
const slash = require('slash');
const fs = require('fs');

const { createFilePath } = require('gatsby-source-filesystem');
const Logger = require('./Logger');

const logger = new Logger('gatsby');

// exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
exports.onCreateBabelConfig = args => {
  const {
    actions: { setBabelPlugin },
  } = args;
  setBabelPlugin({
    name: '@babel/plugin-proposal-decorators',
    options: { legacy: true },
  });
  setBabelPlugin({
    name: '@babel/plugin-proposal-class-properties',
    options: { loose: true },
  });
};

const findFilesystemNode = ({ node, getNode }) => {
  // Find the filesystem node.
  const types = ['File', 'Directory'];
  let fsNode = node;
  let whileCount = 0;

  while (
    !types.includes(fsNode.internal.type)
    && fsNode.parent
    && getNode(fsNode.parent) !== undefined
    && whileCount < 101
  ) {
    fsNode = getNode(fsNode.parent);
    whileCount += 1;

    if (whileCount > 100) {
      logger.warn('Cannot find a directory node for ', fsNode);
    }
  }
  return fsNode;
};

// Adapted from create-file-path.
const createSlug = ({ node, getNode }) => {
  // Find the filesystem node
  const fsNode = findFilesystemNode({ node, getNode });
  if (!fsNode) return undefined;
  const relativePath = pathUtil.posix.relative(
    slash('pages'),
    slash(fsNode.relativePath),
  );
  const { dir, name } = pathUtil.parse(relativePath);
  const dirFragment = dir || '';
  const nameFragment = fsNode.internal.type === 'Directory' ? name : '';
  const slug = pathUtil.posix.join('/', dirFragment, nameFragment, '/');
  const finalSlug = relativePath.startsWith('..') ? `..${slug}` : slug;
  return finalSlug;
};

/**
 * Helper function to find page component.
 * @param  {...any} pathSegments Path to component directory.
 */
const findComponentPath = (...pathSegments) => {
  let componentPath;
  // Allowed component extentions are jsx, tsx and json.
  ['index.jsx', 'index.tsx', 'index.json'].some(item => {
    const path = pathUtil.resolve(...pathSegments, item);
    if (fs.existsSync(path)) {
      componentPath = path;
      return true;
    }
    return false;
  });
  return componentPath || null;
};

const cachedTemplates = [];

const readTemplateFile = indexPath => {
  if (cachedTemplates.includes(indexPath)) {
    return cachedTemplates[indexPath];
  }
  if (!fs.existsSync(indexPath)) {
    cachedTemplates[indexPath] = false;
    return cachedTemplates[indexPath];
  }
  const contents = fs.readFileSync(indexPath);
  try {
    const parsedContent = JSON.parse(contents);
    cachedTemplates[indexPath] = {
      template: parsedContent['#template'],
      subpage_template: parsedContent['#subpage_template'],
      path: parsedContent.path,
    };
  } catch (exception) {
    cachedTemplates[indexPath] = false;
  }
  return cachedTemplates[indexPath];
};

const findSubPageTemplateTemplate = (indexPath, basePath) => {
  const templates = readTemplateFile(indexPath);
  if (templates.subpage_template) {
    return templates.subpage_template;
  }
  const parentPath = pathUtil.dirname(pathUtil.dirname(indexPath));
  if (parentPath <= basePath) {
    return '_default';
  }
  return findSubPageTemplateTemplate(`${parentPath}/index.json`, basePath);
};

const findTemplate = (indexPath, basePath, isFirst = true) => {
  const templates = readTemplateFile(indexPath);
  if (isFirst && templates.template) {
    return templates.template;
  }
  if (!isFirst && templates.subpage_template) {
    return templates.subpage_template;
  }
  const parentPath = pathUtil.dirname(pathUtil.dirname(indexPath));
  if (parentPath <= basePath) {
    return '_default';
  }
  return findTemplate(`${parentPath}/index.json`, basePath, false);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'RawCode') {
    createNodeField({
      node,
      name: 'slug',
      value: createSlug({ node, getNode }),
    });
  }
};

const createPagesFromFS = async ({ actions, graphql, getNode }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allDirectory(filter: { relativePath: { regex: "/^pages/" } }) {
        edges {
          node {
            absolutePath
            relativePath
            relativeDirectory
            internal {
              type
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    logger.log(result.errors);
    return;
  }
  result.data.allDirectory.edges.forEach(({ node }) => {
    const templateBasePath = ['.', 'src', 'templates'];
    const dataBasePath = ['.', 'src', 'data'];
    const slug = createSlug({ node, getNode });
    const pageData = {
      path: slug,
      component: pathUtil.resolve(...templateBasePath, '_default.jsx'),
      context: {
        slug,
      },
    };
    try {
      const indexPath = findComponentPath(...dataBasePath, node.relativePath);
      if (indexPath === null) {
        logger.log('Skip folder ', slug, pageData.path, ' index file not found.');
        return;
      }

      const basePath = pathUtil.resolve(...dataBasePath);
      // Handle JSON.
      if (indexPath.endsWith('.json')) {
        const template = findTemplate(indexPath, basePath);
        pageData.component = pathUtil.resolve(
          ...templateBasePath,
          `${template}.jsx`,
        );
        pageData.context.template = template;
      } else {
        // Normal way.
        pageData.component = indexPath;
      }

      pageData.context.subPageTemplate = findSubPageTemplateTemplate(indexPath, basePath);

      logger.log('Creating page ', slug, pageData.path, pageData.component);
      createPage(pageData);
    } catch (exception) {
      logger.warn(`Error trying to create ${pageData.path}`, exception);
    }
  });
};

const createPreviewPagesForTemplates = async ({ actions, graphql, getNode }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "templates" } }) {
        edges {
          node {
            absolutePath
            relativePath
            relativeDirectory
            internal {
              type
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    logger.log(result.errors);
    return;
  }

  result.data.allFile.edges.forEach(({ node }) => {
    const templatesPrefix = '___templates';
    const templateBasePath = ['.', 'src', 'templates'];
    const pagePath = createFilePath({
      node,
      getNode,
      basePath: pathUtil.join(...templateBasePath),
    });
    const slug = `/${templatesPrefix}${pagePath}`;
    const pageData = {
      path: slug,
      component: pathUtil.resolve(...templateBasePath, node.relativePath),
      context: {
        slug,
      },
    };
    logger.log('Creating a preview template page ', slug, pageData.path, pageData.component);
    createPage(pageData);
  });
};

exports.createPages = async ({ actions, graphql, getNode }) => {
  await createPagesFromFS({ actions, graphql, getNode });
  if (process.env.NODE_ENV === 'development') {
    await createPreviewPagesForTemplates({ actions, graphql, getNode });
  }
};

// customize webpack config in order to exclude certain assets from static build
exports.onCreateWebpackConfig = (
  { stage, actions },
) => {
  if (stage === 'build-javascript') {
    // exclude css generated by @bodiless/ui from site static build
    const defaultAdminCSS = /.\/bodiless\.index\.css$/;
    const adminCssFiles = process.env.BODILESS_ADMIN_ONLY_CSS_FILES || defaultAdminCSS;
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: adminCssFiles,
            use: require.resolve('null-loader'),
          },
        ],
      },
    });
  }
};

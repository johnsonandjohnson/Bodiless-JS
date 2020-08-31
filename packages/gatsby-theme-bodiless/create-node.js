/**
 * Copyright © 2020 Johnson & Johnson
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

const pathUtil = require('path');
const slash = require('slash');
const crypto = require('crypto');
const { fluid } = require('gatsby-plugin-sharp');

const Logger = require('./Logger');

const logger = new Logger('gatsby');

const BODILESS_NODE_TYPE = 'Bodiless';

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

const addSlugField = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  createNodeField({
    node,
    name: 'slug',
    value: createSlug({ node, getNode }),
  });
};

const generateDigest = content => crypto
  .createHash('md5')
  .update(content)
  .digest('hex');

const generateImages = async ({ node, content, reporter }) => {
  const parsedContent = JSON.parse(content);
  // ToDo better check when we have image content
  if (parsedContent === undefined || parsedContent.src === undefined) {
    return undefined;
  }
  const imgSrc = parsedContent.src;
  const imageNode = {
    id: `${node.id} >>> ImageNode`,
    parent: node.id,
    children: [],
    name: node.name,
    extension: pathUtil.extname(imgSrc).substr(1),
    path: imgSrc,
    // this field is mandatory for grapqhql sharp queries
    absolutePath: pathUtil.join(process.cwd(), 'static', imgSrc),
    internal: {
      type: 'ImageNode',
      contentDigest: generateDigest(content),
    },
  };
  return fluid({
    file: imageNode,
    reporter,
  });
};

const createBodilessNode = async ({
  node,
  boundActionCreators,
  loadNodeContent,
  reporter,
}) => {
  const nodeContent = await loadNodeContent(node);
  const { createNode, createParentChildLink } = boundActionCreators;

  const gatsbyImgData = await generateImages({
    node,
    content: nodeContent,
    reporter,
  });

  const content = gatsbyImgData ? JSON.stringify({
    ...JSON.parse(nodeContent),
    gatsbyImg: gatsbyImgData,
  }) : nodeContent;

  const bodilessNode = {
    id: `${node.id} >>> ${BODILESS_NODE_TYPE}`,
    parent: node.id,
    children: [],
    name: node.name,
    extension: node.extension,
    instanceName: node.sourceInstanceName,
    content,
    internal: {
      contentDigest: generateDigest(nodeContent),
      type: BODILESS_NODE_TYPE,
    },
  };
  createNode(bodilessNode);
  createParentChildLink({ parent: node, child: bodilessNode });
  return nodeContent;
};

exports.onCreateNode = ({
  node,
  getNode,
  actions,
  boundActionCreators,
  loadNodeContent,
  reporter,
}) => {
  // Add slug field to Bodiless node
  if (node.internal.type === BODILESS_NODE_TYPE) {
    addSlugField({ node, getNode, actions });
    return;
  }
  // check if we should create a bodiless node
  const extensions = ['json'];
  // 'data' is gatsby-source-filesystem name configured in gatsby-config.js
  if (node.sourceInstanceName === 'data' && extensions.indexOf(node.extension) !== -1) {
    createBodilessNode({
      node,
      getNode,
      actions,
      boundActionCreators,
      loadNodeContent,
      reporter,
    });
  }
};

exports.createSlug = createSlug;

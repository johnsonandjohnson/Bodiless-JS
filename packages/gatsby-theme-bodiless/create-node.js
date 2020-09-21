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
const { fluid, fixed } = require('gatsby-plugin-sharp');
const GatsbyImagePresets = require('./dist/GatsbyImage/GatsbyImagePresets').default;

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

const supportedExtensions = {
  jpeg: true,
  jpg: true,
  png: true,
  webp: true,
  tif: true,
  tiff: true,
};

const srcSetBreakpoints = [
  360,
  834,
  1024,
];

const generateGatsbyImage = async ({ file, preset, reporter }) => {
  // skip image generation when unknown preset is passed
  if (!Object.values(GatsbyImagePresets).includes(preset)) {
    return undefined;
  }
  switch (preset) {
    case GatsbyImagePresets.Fixed:
      return {
        fixed: await fixed({
          file,
          args: {
            base64: true,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FixedNoBase64:
      return {
        fixed: await fixed({
          file,
          args: {
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FixedTracedSVG:
      return {
        fixed: await fixed({
          file,
          args: {
            generateTracedSVG: true,
            tracedSVG: true,
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FixedWithWebp:
      return {
        fixed: await fixed({
          file,
          args: {
            toFormat: 'webp',
            base64: true,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FixedWithWebpNoBase64:
      return {
        fixed: await fixed({
          file,
          args: {
            toFormat: 'webp',
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FixedWithWebpTracedSVG:
      return {
        fixed: await fixed({
          file,
          args: {
            toFormat: 'webp',
            generateTracedSVG: true,
            tracedSVG: true,
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.Fluid:
      return {
        fluid: await fluid({
          file,
          args: {
            base64: true,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FluidNoBase64:
      return {
        fluid: await fluid({
          file,
          args: {
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FluidTracedSVG:
      return {
        fluid: await fluid({
          file,
          args: {
            generateTracedSVG: true,
            tracedSVG: true,
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FluidWithWebp:
      return {
        fluid: await fluid({
          file,
          args: {
            toFormat: 'webp',
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FluidWithWebpNoBase64:
      return {
        fluid: await fluid({
          file,
          args: {
            toFormat: 'webp',
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    case GatsbyImagePresets.FluidWithWebpTracedSVG:
      return {
        fluid: await fluid({
          file,
          args: {
            toFormat: 'webp',
            generateTracedSVG: true,
            tracedSVG: true,
            base64: false,
            srcSetBreakpoints,
          },
          reporter,
        }),
      };
    default:
      return undefined;
  }
};

const generateImages = async ({ node, content, reporter }) => {
  const parsedContent = JSON.parse(content);
  if (parsedContent === undefined || parsedContent.src === undefined) {
    return undefined;
  }
  // skip image generation if preset is not set
  if (parsedContent.preset === undefined) {
    return undefined;
  }
  const imgSrc = parsedContent.src;
  const fileExtension = pathUtil.extname(imgSrc).substr(1);
  if (!supportedExtensions[fileExtension]) {
    return undefined;
  }
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
  return generateGatsbyImage({
    file: imageNode,
    preset: parsedContent.preset,
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
    ...(gatsbyImgData ? { gatsbyImg: gatsbyImgData } : {}),
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

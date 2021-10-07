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

/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */

const pathUtil = require('path');
const slash = require('slash');
const crypto = require('crypto');
const fs = require('fs-extra');
const md5File = require('md5-file');
const { fluid: sharpFluid, fixed: sharpFixed } = require('gatsby-plugin-sharp');
const GatsbyImagePresets = require('./dist/GatsbyImage/GatsbyImagePresets').default;

const Logger = require('./Logger');

const logger = new Logger('gatsby');

const BODILESS_NODE_TYPE = 'Bodiless';

const srcSetBreakpoints = [
  360,
  834,
  1024,
];

const getDefaultSharpArgs = () => ({
  quality: 90,
});

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
  if (
    node.instanceName !== undefined
    && node.instanceName.startsWith('bodiless-default-content')
  ) {
    return 'defaultContent';
  }
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

const generateStringDigest = content => crypto
  .createHash('md5')
  .update(content)
  .digest('hex');

const generateFileDigest = absolutePath => md5File.sync(absolutePath);

const supportedExtensions = {
  jpeg: true,
  jpg: true,
  png: true,
  webp: true,
  tif: true,
  tiff: true,
};

const fluid = async ({
  file,
  args = {},
  reporter,
}) => {
  let srcWebp;
  let srcSetWebp;
  const { toFormat, ...restArgs } = args;
  if (toFormat === 'webp') {
    ({ src: srcWebp, srcSet: srcSetWebp } = await sharpFluid({
      file,
      args: {
        ...getDefaultSharpArgs(),
        toFormat,
        ...restArgs,
      },
      reporter,
    }));
  }
  const result = await sharpFluid({
    file,
    args: {
      ...getDefaultSharpArgs(),
      ...restArgs,
    },
    reporter,
  });
  return {
    fluid: {
      ...result,
      ...(toFormat === 'webp' ? { srcWebp, srcSetWebp } : {}),
    },
  };
};

const fixed = async ({
  file,
  args = {},
  reporter,
}) => {
  let srcWebp; let
    srcSetWebp;
  const { toFormat, ...restArgs } = args;
  if (toFormat === 'webp') {
    ({ src: srcWebp, srcSet: srcSetWebp } = await sharpFixed({
      file,
      args: {
        ...getDefaultSharpArgs(),
        toFormat,
        ...restArgs,
      },
      reporter,
    }));
  }
  const result = await sharpFixed({
    file,
    args: {
      ...getDefaultSharpArgs(),
      ...restArgs,
    },
    reporter,
  });
  return {
    fixed: {
      ...result,
      ...(toFormat === 'webp' ? { srcWebp, srcSetWebp } : {}),
    },
  };
};

const generateGatsbyImage = async ({ file, preset, reporter }, options) => {
  // skip image generation when unknown preset is passed
  if (!Object.values(GatsbyImagePresets).includes(preset)) {
    return undefined;
  }
  const { sharpArgs } = options || {};
  switch (preset) {
    case GatsbyImagePresets.Fixed:
      return fixed({
        file,
        args: {
          base64: true,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FixedNoBase64:
      return fixed({
        file,
        args: {
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FixedTracedSVG:
      return fixed({
        file,
        args: {
          generateTracedSVG: true,
          tracedSVG: true,
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FixedWithWebp:
      return fixed({
        file,
        args: {
          toFormat: 'webp',
          base64: true,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FixedWithWebpNoBase64:
      return fixed({
        file,
        args: {
          toFormat: 'webp',
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FixedWithWebpTracedSVG:
      return fixed({
        file,
        args: {
          toFormat: 'webp',
          generateTracedSVG: true,
          tracedSVG: true,
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.Fluid:
      return fluid({
        file,
        args: {
          base64: true,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FluidNoBase64:
      return fluid({
        file,
        args: {
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FluidTracedSVG:
      return fluid({
        file,
        args: {
          generateTracedSVG: true,
          tracedSVG: true,
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FluidWithWebp:
      return fluid({
        file,
        args: {
          toFormat: 'webp',
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FluidWithWebpNoBase64:
      return fluid({
        file,
        args: {
          toFormat: 'webp',
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    case GatsbyImagePresets.FluidWithWebpTracedSVG:
      return fluid({
        file,
        args: {
          toFormat: 'webp',
          generateTracedSVG: true,
          tracedSVG: true,
          base64: false,
          srcSetBreakpoints,
          ...sharpArgs,
        },
        reporter,
      });
    default:
      return undefined;
  }
};

/**
 * Copy file to static directory and return public url to it
 *
 * leveraging logic from gatsby-source-filesystem
 * https://github.com/gatsbyjs/gatsby/blob/39baf4eb504dcbb4d231f4baf8b109d0dcabb1da/packages/gatsby-source-filesystem/src/extend-file-node.js
 */
const copyFileToStatic = (node, reporter) => {
  const fileAbsolutePath = node.absolutePath;
  const fileName = `${node.internal.contentDigest}/${pathUtil.basename(fileAbsolutePath)}`;

  const publicPath = pathUtil.join(
    process.cwd(),
    'public',
    'static',
    fileName,
  );

  if (!fs.existsSync(publicPath)) {
    fs.copySync(
      fileAbsolutePath,
      publicPath,
      { dereference: true },
      err => {
        if (err) {
          reporter.panic(
            {
              context: {
                sourceMessage: `error copying file from ${fileAbsolutePath} to ${publicPath}`,
              },
            },
            err,
          );
        }
      },
    );
  }

  return `/static/${fileName}`;
};

const createImageNode = ({ node, content }) => {
  const parsedContent = JSON.parse(content);
  if (parsedContent === undefined || parsedContent.src === undefined) {
    return undefined;
  }
  const imgSrc = parsedContent.src;
  const fileExtension = pathUtil.extname(imgSrc).substr(1);
  if (!supportedExtensions[fileExtension]) {
    return undefined;
  }
  const absolutePath = pathUtil.isAbsolute(imgSrc)
    ? pathUtil.join(process.cwd(), 'static', imgSrc)
    : pathUtil.join(node.dir, imgSrc);
  const contentDigest = fs.existsSync(absolutePath)
    ? generateFileDigest(absolutePath)
    : generateStringDigest(absolutePath);
  const imageNode = {
    id: `${node.id} >>> ImageNode`,
    parent: node.id,
    children: [],
    name: node.name,
    extension: pathUtil.extname(imgSrc).substr(1),
    path: imgSrc,
    // this field is mandatory for graphql sharp queries
    absolutePath,
    internal: {
      type: 'ImageNode',
      contentDigest,
    },
  };
  return imageNode;
};

const generateImages = async ({ imageNode, content, reporter }, options) => {
  const parsedContent = JSON.parse(content);
  return generateGatsbyImage({
    file: imageNode,
    preset: parsedContent.preset,
    reporter,
  }, options);
};

const createBodilessNode = async ({
  node,
  actions,
  loadNodeContent,
  reporter,
}, pluginOptions) => {
  const nodeContent = await loadNodeContent(node);
  const { createNode, createParentChildLink } = actions;

  const { gatsbyImage: gatsbyImageOptions } = pluginOptions;
  const imageNode = createImageNode({ node, content: nodeContent });
  let imageContent;
  if (imageNode !== undefined) {
    const publicUrl = pathUtil.isAbsolute(imageNode.path)
      ? imageNode.path
      : copyFileToStatic(imageNode, reporter);
    let gatsbyImgData;
    // skip gatsby img data generation when an image from json does not exist in filesystem
    if (fs.existsSync(imageNode.absolutePath)) {
      gatsbyImgData = await generateImages({
        imageNode,
        content: nodeContent,
        reporter,
      }, gatsbyImageOptions);
    }

    imageContent = {
      ...(gatsbyImgData ? { gatsbyImg: gatsbyImgData } : {}),
      ...(publicUrl ? { src: publicUrl } : {}),
    };
  }
  const content = imageContent ? JSON.stringify({
    ...JSON.parse(nodeContent),
    ...imageContent,
  }) : nodeContent;

  const parsedContent = JSON.parse(content);
  const bodilessNodeName = parsedContent._nodeKey !== undefined
    ? parsedContent._nodeKey
    : node.name;

  const bodilessNode = {
    id: `${node.id} >>> ${BODILESS_NODE_TYPE}`,
    parent: node.id,
    children: [],
    name: bodilessNodeName,
    extension: node.extension,
    instanceName: node.sourceInstanceName,
    content,
    internal: {
      contentDigest: generateStringDigest(nodeContent),
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
  loadNodeContent,
  reporter,
}, pluginOptions) => {
  // Add slug field to Bodiless node
  if (node.internal.type === BODILESS_NODE_TYPE) {
    addSlugField({ node, getNode, actions });
    return;
  }
  // check if we should create a bodiless node
  const extensions = ['json'];
  const isBodilessSource = node.sourceInstanceName === 'data'
    || (node.sourceInstanceName !== undefined && node.sourceInstanceName.startsWith('bodiless-default-content'));
  // 'data' is gatsby-source-filesystem name configured in gatsby-config.js
  if (isBodilessSource && extensions.indexOf(node.extension) !== -1) {
    createBodilessNode({
      node,
      getNode,
      actions,
      loadNodeContent,
      reporter,
    }, pluginOptions);
  }
};

exports.createSlug = createSlug;

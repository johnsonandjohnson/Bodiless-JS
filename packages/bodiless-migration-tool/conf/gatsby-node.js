/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const pathUtil = require('path');

// exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
exports.onCreateBabelConfig = args => {
  const {
    actions: { setBabelPlugin },
  } = args;
  setBabelPlugin({
    name: 'babel-plugin-tailwind-components',
    options: {
      config: './tailwind.config.js',
      format: 'auto',
    },
  });
};

// Fix sourcemap issue
// See: https://github.com/gatsbyjs/gatsby/issues/6278#issuecomment-402540404
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
      resolve: {
        alias: {
          // There should be only one instance of react in the project,
          // otherwise react hooks will not work.
          react: pathUtil.resolve('../../node_modules', 'react'),
          // @INFO: slate and slate-react added here to fix multiple versions of
          // the same package with BodilessJS-slate-editor. Otherwise Editor manipulations
          // will break
          // @TODO: unwrap slate and slate-react aliases from here when BodilessJS is no longer depends
          // on them
          'slate-react': pathUtil.resolve('node_modules', 'slate-react'),
          slate: pathUtil.resolve('node_modules', 'slate'),
        },
      },
    });
  }

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
            },
          },
        },
      ],
    },
  });
};

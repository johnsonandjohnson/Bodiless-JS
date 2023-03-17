const { join } = require('path');
const { configureKnapsack } = require('@knapsack/app');
const { KnapsackBodilessRenderer } = require('@bodiless/knapsack-renderer');
const postcssOptions = require('./postcss.config');
const { version } = require('../../lerna.json');
const { demoWrapperPath } = require('./common-config');
const webpackConfig = require('./webpack.config');

module.exports = configureKnapsack({
  dist: join(__dirname, 'lib'),
  public: join(__dirname, 'ks-public/'),
  data: './data',
  version,
  templateRenderers: [
    new KnapsackBodilessRenderer({
      demoWrapperPath,
      webpackConfig,
    }),
  ],
  plugins: [],
  cloud: {
    siteId: 'jnj-canvasx',
    repoName: 'Bodiless-JS',
    repoOwner: 'johnsonandjohnson',
    baseBranch: 'main',
  },
});

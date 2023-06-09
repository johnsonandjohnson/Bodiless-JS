const { join } = require('path');
const { configureKnapsack } = require('@knapsack/app');
const { KnapsackBodilessRenderer } = require('@bodiless/knapsack-renderer');
const { version } = require('../../lerna.json');
const { demoWrapperPath } = require('./common-config');
const webpackConfig = require('./webpack.config');

module.exports = configureKnapsack({
  dist: join(__dirname, 'lib'),
  public: join(__dirname, 'ks-public/'),
  data: './data',
  version,
  designTokens: {
    createCodeSnippet: (token) => `$${token.name}`,
    /**
     * @TODO:
     *
     * The automatic token generation is currently disabled due to the Property Reference Errors.
     *
     * `Reference doesn't exist: semantic/colors.color.background.page.value tries
     * to reference neutral.100, which is not defined`
     *
     * Note: I have edited the `design-tokens.json` manually to temp resolve the above issue.
     * The original token files is `design-tokens.original.json`.
     */
    srcFilePath: './assets/design-tokens.json',
    distDir: '../../packages/vital-elements/assets',
    targets: {
      js: {
        enabled: true,
      },
    },
  },
  templateRenderers: [
    new KnapsackBodilessRenderer({
      demoWrapperPath,
      webpackConfig,
    }),
  ],
  plugins: [],
  cloud: {
    siteId: 'vital-ds',
    repoName: 'Bodiless-JS',
    repoRoot: join(__dirname, '../../'),
    repoOwner: 'johnsonandjohnson',
    baseBranch: 'master',
  },
});

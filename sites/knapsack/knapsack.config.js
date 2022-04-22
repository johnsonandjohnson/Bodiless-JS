const { join } = require('path');
const { configureKnapsack } = require('@knapsack/app');
const { KnapsackBodilessRenderer } = require('@bodiless/knapsack-renderer');
const webpack = require('webpack');
const postcssOptions = require('./postcss.config');
const babelConfig = require('../../babel.config');
const { version } = require('../../lerna.json');

const webpackMajorVersion = parseInt(webpack.version.split('.')[0], 10);
if (webpackMajorVersion < 5) {
  throw new Error(`
    Webpack 5 is required, using "${webpackMajorVersion}".
  `);
}

const demoWrapperPath = join(__dirname, './demo-wrapper.jsx');

module.exports = configureKnapsack({
  dist: join(__dirname, 'lib'),
  public: join(__dirname, 'ks-public/'),
  data: './data',
  version,
  templateRenderers: [
    new KnapsackBodilessRenderer({
      demoWrapperPath,
      webpackConfig: {
        devtool: 'source-map',
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            // stream is required for crypto
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            fs: false,
            os: false,
          },
          extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json'],
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              sideEffects: true,
              use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'postcss-loader' },
              ],
            },
            {
              loader: 'babel-loader',
              include: [demoWrapperPath],
              options: babelConfig,
            },
            {
              test: (file) =>
                file.endsWith('js') && file.includes('gatsby/cache-dir'),
              loader: 'babel-loader',
              options: babelConfig,
            },
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              loader: 'babel-loader',
              options: babelConfig,
              exclude: [
                (file) => {
                  if (file.includes('gatsby-browser-entry')) {
                    return false;
                  }
                  if (
                    file.includes(
                      '@bodiless/gatsby-theme-bodiless/src/dist/tailwindcss/resolveConfig',
                    )
                  ) {
                    return false;
                  }
                  if (file.includes('@canvasx/elements/lib/index')) {
                    return false;
                  }
                  return file.includes('node_modules');
                },
              ],
            },
            {
              test: [/\.jpeg?$/, /\.jpg?$/, /\.svg?$/, /\.png?$/],
              loader: require.resolve('url-loader'),
            },
          ],
        },
        plugins: [
          new webpack.DefinePlugin({
            // @todo serializing the whole env is not a good idea -- it's likely to contain credentials.
            'process.env': JSON.stringify(process.env),
          }),
        ],
        optimization: {
          splitChunks: false,
        },
      },
    }),
  ],
  plugins: [],
  cloud: {
    siteId: 'jnj-canvasx',
    repoName: 'jnj-canvasx',
    repoOwner: 'knapsack-cloud',
    baseBranch: 'master',
  },
});

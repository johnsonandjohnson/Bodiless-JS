const {join} = require('path');
const webpack = require('webpack');
const babelConfig = require('./.babelrc.json');
const { demoWrapperPath } = require('./common-config');

const webpackMajorVersion = parseInt(webpack.version.split('.')[0], 10);
if (webpackMajorVersion < 5) {
  throw new Error(`
    Webpack 5 is required, using "${webpackMajorVersion}".
  `);
}

const webpackConfig = {
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
        include: [demoWrapperPath, join(__dirname, '../../packages/knapsack-renderer/lib/KsEditProvider.js')],
        options: babelConfig,
      },
      {
        test: (file) => file.endsWith('js') && file.includes('gatsby/cache-dir'),
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
            // if (file.includes('@canvasx/elements/lib/index')) {
            //   return false;
            // }
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
      BL_IS_EDIT: JSON.stringify(process.env.NODE_ENV !== 'production')
    }),
  ],
  optimization: {
    splitChunks: false,
  },
};

module.exports = webpackConfig;

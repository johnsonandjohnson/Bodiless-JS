/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // actions.setWebpackConfig(
  //   addTokenShadowPlugin({}, { resolvers: [shadow] })
  // );
  if (stage === 'develop') {
    // When running test-site with local packages (via npm pack) we seem to get
    // multiple react instances, which causes this invalid hook call warning
    // (https://reactjs.org/warnings/invalid-hook-call-warning.html)
    // so we ensure we always resolve to the same instance when present
    // in node_modules.  When running from sites, react is hoisted and
    // won't be present in the test site's node_modules.
    // const reactPath = path.resolve('./node_modules', 'react');
    // const reactAlias = fs.existsSync(reactPath) ? { react: reactPath } : {};
    actions.setWebpackConfig({
      // Set devtool to `false` below to disable sourcemap on performance improvement.
      // or set devtool as 'cheap-module-source-map' to re-enable sourcemap.
      // See https://webpack.js.org/configuration/devtool/
      // devtool: 'cheap-module-source-map'
      devtool: false,
      resolve: {
        plugins: [new TsconfigPathsPlugin()],
        // alias: reactAlias,
      },
      // On development, we want changes on Bodiless packages to trigger
      // new builds. Webpack won't watch packages inside node_modules by
      // default, so we remove the @bodiless folder from its default list.
      //
      // See: https://webpack.js.org/configuration/other-options/#snapshot
      // snapshot: {
      //   managedPaths: glob.sync(
      //     './node_modules/!(@bodiless)*',
      //     { absolute: true },
      //   ),
      // }
    });
  }
};

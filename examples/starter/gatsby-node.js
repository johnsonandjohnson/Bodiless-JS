/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const glob = require('glob');

/*
* extend/mutate the webpack configuration.
*/
exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // Turn off source maps for Building static HTML
  // due to high memory consumption (AESQ-1434).
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }

  if (stage === 'develop') {
    actions.setWebpackConfig({
      // On development, we want changes on Bodiless packages to trigger
      // new builds. Webpack won't watch packages inside node_modules by
      // default, so we remove the @bodiless folder from its default list.
      //
      // See: https://webpack.js.org/configuration/other-options/#snapshot
      snapshot: {
        managedPaths: glob.sync(
          './node_modules/!(@bodiless)*', 
          { absolute: true },
        ),
      },
    });
  }
};

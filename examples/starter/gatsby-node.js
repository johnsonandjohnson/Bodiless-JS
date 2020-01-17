/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */

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
};

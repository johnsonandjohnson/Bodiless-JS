const { addNoGatsbyWebpackConfig } = require('@bodiless/webpack');

module.exports = async ({ config }) => {
  const newCOnfig = addNoGatsbyWebpackConfig(config);
  return newCOnfig;
};

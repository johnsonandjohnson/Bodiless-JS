const { getPackageTailwindConfig } = require(
  '@bodiless/cli'
);

const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

module.exports = getTailwindConfig();

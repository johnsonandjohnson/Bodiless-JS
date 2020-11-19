const path = require('path');

const whitelistedModules = [
  '@bodiless/layouts',
  '@bodiless/organisms',
];

const purgePackageRule = '/**/!(*.d).{ts,js,jsx,tsx}';

const purge = whitelistedModules
  .map(module => {
    try {
      return require.resolve(module);
    } catch (e) {
      return null;
    }
  })
  .filter(Boolean)
  .map(indexFilePath => path.dirname(path.join(indexFilePath)))
  .map(moduleRootPath => moduleRootPath.concat(purgePackageRule));

module.exports = {
  purge,
  theme: {
    aspectRatio: { // defaults to {}
      none: 0,
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },
  },
  plugins: [
    // eslint-disable-next-line
    require('tailwindcss-aspect-ratio'),
  ],
};

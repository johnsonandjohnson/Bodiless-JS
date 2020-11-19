const path = require('path');

const whitelistedModules = [
  '@bodiless/layouts',
  '@bodiless/organisms',
];

const purgePackageRule = '/lib/**/!(*.d).{ts,js,jsx,tsx}';

const purge = whitelistedModules
  .map(module => require.resolve(`${module}/package.json`))
  .map(packageJSONPath => path.dirname(path.join(packageJSONPath)))
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

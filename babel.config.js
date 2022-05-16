module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  env: {
    test: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};

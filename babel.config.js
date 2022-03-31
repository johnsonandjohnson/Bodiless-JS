module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  env: {
    test: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};

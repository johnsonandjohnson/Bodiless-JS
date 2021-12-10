module.exports = {
  'plugins': [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
  ],
  'env': {
    'test': {
      'plugins': [
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};
module.exports = (config) => (
  {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          use: [
            {
              loader: require.resolve('./island-hydrator-loader'),
            },
          ],
        },
      ]
    },
  }
);

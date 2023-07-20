export const islandsLoader = (config: any) => (
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
              loader: require.resolve('./WebpackIslandLoader')
            },
          ],
        },
      ]
    },
  }
);

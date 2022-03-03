module.exports = {
  configure: async (defaultConfig) => ({
    ...defaultConfig,
    BODILESS_CARD_TEST_ENV_CONFIG: '0',
  })
};

module.exports = {
  "stories": [
    "../src/stories/**/*.stories.mdx",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ],
  "core": {
    "builder": "webpack5"
  }
}
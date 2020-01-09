/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const enabled = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';
if (enabled) {
  // Disabling global-require and no-unresolved for next line
  // because index.css is created during build.
  // eslint-disable-next-line
  require('./src/components/index.css');
}

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const enabled = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';
if (enabled) {
  // This try/catch hack prevents failure in building the static site even if index.css
  // doesn't exist (tailwind disabled), since we don't seem to have access to the env vars
  // when gatsby-config is loaded.
  // TODO: Use standard tailwind setup: https://github.com/johnsonandjohnson/Bodiless-JS/issues/42
  try {
    // Disabling global-require and no-unresolved for next line
    // because index.css is created during build.
    // eslint-disable-next-line
    require('./src/components/index.css');
  } catch (e) {
    // Ignore error.
  }
}

// Override Gatsby default scroll behavior. Only scroll if hashed element exists. See
// https://github.com/gatsbyjs/gatsby/blob/v2.15.0-rc.4/packages/gatsby/cache-dir/navigation.js#L142-L144
export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  const target = location.hash ? location.hash.slice(1) : '';
  const targetElement = document.getElementById(target) || document.getElementsByName(target)[0];
  return !!targetElement;
};

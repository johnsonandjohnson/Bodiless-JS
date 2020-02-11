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

export const shouldUpdateScroll = ({ prevRouterProps, routerProps: { location } }) => {
  if (prevRouterProps) {
    const {
      location: { pathname: oldPathname },
    } = prevRouterProps;
    if (oldPathname === location.pathname) {
      const hash = location.hash ? location.hash.slice(1) : '';
      if (!hash) {
        return false;
      }
      const HashMatchException = {};
      try {
        // eslint-disable-next-line
        const { selectors } = require('./no-scroll-settings.json');
        selectors.map(item => {
          document.querySelectorAll(item).forEach(element => {
            if (element.attributes.href.value === '#' + hash) {
              throw HashMatchException;
            }
          });
        });
      } catch (e) {
        if (HashMatchException === e) {
          return false;
        }
      }

      // Override Gatsby default scroll behavior. Only scroll if hashed element exists.
      const targetElement = document.getElementById(hash) || document.getElementsByName(hash)[0];
      return targetElement ? hash : true;
    }
  }
  return true;
};

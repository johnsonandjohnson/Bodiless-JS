/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable import/prefer-default-export */
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
        return true;
      }
      const targetElement = document.getElementById(hash) || document.getElementsByName(hash)[0];
      const HashMatchException = {};

      try {
        // eslint-disable-next-line
        const { parentSelectors, elementSelectors, excludeHashes } = require('./no-scroll-settings.json');

        if (excludeHashes.indexOf(hash) < 0) {
          // Skip scrolling for selected element.
          elementSelectors.forEach(item => {
            document.querySelectorAll(item).forEach(element => {
              if (element.attributes.href && (element.attributes.href.value === `#${hash}`)) {
                throw HashMatchException;
              }
            });
          });
          // Skip scrolling for hashes inside selected container element.
          const parentStr = parentSelectors.join();
          document.querySelectorAll(parentStr).forEach(element => {
            if (element.isSameNode(targetElement.closest(parentStr))) {
              throw HashMatchException;
            }
          });
        }
      } catch (e) {
        if (HashMatchException === e) {
          return false;
        }
      }

      // Override Gatsby default scroll behavior. Only scroll if hashed element exists.
      return targetElement ? hash : true;
    }
  }
  return true;
};

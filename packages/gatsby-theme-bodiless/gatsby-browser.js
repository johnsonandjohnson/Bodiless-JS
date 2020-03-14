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

// Override Gatsby default scroll behavior. Only scroll if hashed element exists. See
// https://github.com/gatsbyjs/gatsby/blob/v2.15.0-rc.4/packages/gatsby/cache-dir/navigation.js#L142-L144
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
        const { parentSelectors, elementSelectors, excludeHashes } = require('./src/no-scroll-settings.json');

        if (!excludeHashes || excludeHashes.indexOf(hash) < 0) {
          // Skip scrolling for selected element.
          if (!!elementSelectors && elementSelectors.length) {
            const elementStr = elementSelectors.join();
            document.querySelectorAll(elementStr).forEach(element => {
              if (element.attributes.href && (element.attributes.href.value === `#${hash}`)) {
                throw HashMatchException;
              }
            });
          }
          if (!!parentSelectors && parentSelectors.length) {
            // Skip scrolling for hashes inside selected container element.
            const parentStr = parentSelectors.join();
            document.querySelectorAll(parentStr).forEach(element => {
              if (element.isSameNode(targetElement.closest(parentStr))) {
                throw HashMatchException;
              }
            });
          }
        }
      } catch (e) {
        if (HashMatchException === e) {
          return false;
        }
        throw e;
      }

      return targetElement ? hash : true;
    }
  }
  return true;
};

/**
 * Copyright © 2022 Johnson & Johnson
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

import { asBodilessLink } from '@bodiless/components-ui';
import type { AsBodilessLink } from '@bodiless/components';

/**
 * Produces a HOC which creates an editable link.
 *
 * @see asBodilessLink.
 */
const asEditableLink: AsBodilessLink = asBodilessLink;

/**
* hook that determines if the link is an external link
* the hook validates the data in the current node
*
* @returns true when link href starts with http:// | https:// | //
*/
const useExternalLinkToggle = (props: any) => {
  const { externalLinkFilter, href } = props;
  // Use custom filter if appropriate prop was provided.
  if (href && externalLinkFilter) {
    return externalLinkFilter(href);
  }
  const regexp = /^https:\/\/|^http:\/\/|^\/\//;
  return !!(href && regexp.test(href));
};

const useIsDownloadLink = (...types: string[]) => ({ href }: any) => {
  const types$ = types.length > 0 ? types : ['doc', 'docx', 'pdf'];
  const regexp = new RegExp(`\\.(${types$.join('|')})$`);
  return regexp.test(href || '');
};

const anchorTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  element?.focus();
  requestAnimationFrame(() => {
    // eslint-disable-next-line no-restricted-globals
    const newHref = location.href.replace(`#${elementId}`, '');
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(history.state, '', newHref);
  });
};

export {
  useExternalLinkToggle, useIsDownloadLink, asEditableLink, anchorTo,
};

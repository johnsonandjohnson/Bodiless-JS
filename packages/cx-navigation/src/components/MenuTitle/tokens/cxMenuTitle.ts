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

import { withNodeKey, withSidecarNodes } from '@bodiless/core';
import {
  Div,
  as,
  replaceWith,
  startWith,
} from '@bodiless/fclasses';
import { withBodilessLinkToggle, withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { cxEditorPlain } from '@bodiless/cx-editors';
import { cxLink } from '@bodiless/cx-link';
import { asMenuTitleToken } from '../MenuTitleClean';

/**
 * @private
 */
const asMenuLink = (asEditableLink: typeof asBodilessLink) => withSidecarNodes(
  asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
);

/**
 * Default MenuTitleToken that applies default Editors to the Menu Titles.
 */
const Default = asMenuTitleToken({
  Theme: {
    Link: as(cxLink.WithDownloadStyles, cxLink.WithExternalStyles),
  },
  Editors: {
    Title: cxEditorPlain.Default,
  },
  Schema: {
    Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(Div), true)),
    Title: withNodeKey('text'),
  },
  Content: {
    Title: withPlaceholder('Menu Item'),
  },
});

/**
 * WithTitleLinkDisabled replaces default menu title link with empty div.
 */
const WithTitleLinkDisabled = asMenuTitleToken({
  ...Default,
  Schema: {
    ...Default.Schema,
    Link: replaceWith(Div),
  },
});

export default {
  Default,
  WithTitleLinkDisabled,
};

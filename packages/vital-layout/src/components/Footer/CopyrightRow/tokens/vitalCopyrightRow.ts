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

import { withNodeKey } from '@bodiless/core';
import omit from 'lodash/omit';
import { vitalRichText } from '@bodiless/vital-editors';
import {
  asVitalTokenSpec, vitalColor, vitalFontSize, vitalTextDecoration
} from '@bodiless/vital-elements';
import { addProps, as, replaceWith } from '@bodiless/fclasses';
import { vitalLink } from '@bodiless/vital-link';
import { asCopyrightRowToken } from '../CopyrightRowClean';
import type { CopyrightRowToken } from '../CopyrightRowClean';
import { vitalSocialLinks } from '../../SocialLinks';

const Copyright = asVitalTokenSpec()({
  ...vitalRichText.Basic,
  Theme: {
    paragraph: as(
      vitalColor.TextPrimaryFooterCopy,
      vitalFontSize.XS,
      vitalTextDecoration.Normal,
    ),
    Link: as(
      omit(vitalLink.Default, 'Theme'),
      vitalTextDecoration.Bold,
      vitalTextDecoration.Underline,
    ),
  },
  Content: {
    _: addProps({ placeholder: 'Insert Copyright' }),
  },
});

const Default = asCopyrightRowToken({
  Components: {
    SocialLinks: vitalSocialLinks.Default,
  },
  Layout: {
    CopyrightWrapper: 'w-full xl:w-3/4',
    SocialLinksWrapper: 'w-full xl:w-1/4',
  },
  Spacing: {
    Copyright: 'py-6 2xl:py-0 md:mb-4 2xl:mb-0', // Vertical
    SocialLinksWrapper: 'py-6 2xl:py-0', // Vertical
  },
  Theme: {
    Copyright: as(
      vitalColor.BorderSecondarySeparator,
      'border-t border-b md:border-0',
    ),
  },
  Editors: {
    Copyright,
  },
  Schema: {
    Copyright: withNodeKey({ nodeKey: 'copyright', nodeCollection: 'site' }),
  },
});

const CopyrightNoSocialLinks = asCopyrightRowToken({
  ...Default,
  Components: {
    ...Default.Components,
    SocialLinksWrapper: replaceWith(() => null),
    SocialLinks: replaceWith(() => null),
  },
  Layout: {
    CopyrightWrapper: 'w-full',
    SocialLinksWrapper: 'w-full',
  },
});

/**
 * Tokens for the vital Copyright Row which consists of copyright & social links.
 *
 * @category Token Collection
 * @see [[CopyrightRowClean]]
 */
export interface VitalCopyrightRow {
  /**
   * Defines the Default Copyright row with copyright & social tokens
   */
  Default: CopyrightRowToken,
  /**
   * Copyright only
   */
  CopyrightNoSocialLinks: CopyrightRowToken,
}

/**
 * Tokens for Vital Copyright Row
 *
 * @category Token Collection
 * @see [[VitalCopyrightRow]]
 * @see [[CopyrightRowClean]]
 */
const vitalCopyrightRow: VitalCopyrightRow = {

  Default,
  CopyrightNoSocialLinks,
};

export default vitalCopyrightRow;

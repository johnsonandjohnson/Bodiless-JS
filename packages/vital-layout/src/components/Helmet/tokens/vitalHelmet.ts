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
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { vitalMetaHelmet } from '@bodiless/vital-meta';
import { as, replaceWith } from '@bodiless/fclasses';
import { DefaultPageGA4DataLayerHelmet } from '@bodiless/ga4';
import { asHelmetToken } from '../HelmetClean';
import type { HelmetToken } from '../HelmetClean';
// eslint-disable-next-line import/order

const Base = asHelmetToken({
  Components: {
    SeoHelmet: vitalMetaHelmet.SEO,
    SocialShareHelmet: vitalMetaHelmet.Share,
    // LanguageHelmet: TBD,
    GA4Helmet: replaceWith(DefaultPageGA4DataLayerHelmet),
  },
  Theme: {
    HTMLHelmet: as(
      'font-DMSans',
      vitalColor.TextPrimaryBodyCopy,
      vitalTextDecoration.Normal,
    ),
  }
});

const Default = asHelmetToken({
  ...Base,
});

const WithDesktopStatickBody = asHelmetToken({
  Layout: {
    BodyHelmet: 'lg:static',
  },
});

const WithFixedBody = asHelmetToken({
  Layout: {
    BodyHelmet: 'fixed',
  },
});

/**
 * Tokens for the vital helmet
 *
 * @category Token Collection
 * @see [[HelmetClean]]
 */
export interface VitalHelmet {
  /**
   * Base applies the SEO, Share, GA4 helmets
   */
  Base: HelmetToken,
  /**
   * Inherits from Base
   */
  Default: HelmetToken,
  /**
   * WithDesktopStatickBody token applies static position on body.
   */
  WithDesktopStatickBody: HelmetToken,
  /**
   * WithFixedBody token applies fixed position on body to prevent scrolling.
   */
  WithFixedBody: HelmetToken,
}

/**
 * Tokens for Vital Helmet
 *
 * @category Token Collection
 * @see [[VitalHelmet]]
 * @see [[HelmetClean]]
 */
const vitalHelmet: VitalHelmet = {
  Base,
  Default,
  WithDesktopStatickBody,
  WithFixedBody,
};

export default vitalHelmet;

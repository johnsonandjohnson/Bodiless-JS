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
import { as } from '@bodiless/fclasses';
import { asHelmetToken } from '../HelmetClean';

const Default = asHelmetToken({
  Components: {
    SeoHelmet: vitalMetaHelmet.SEO,
    SocialShareHelmet: vitalMetaHelmet.Share,
    // LanguageHelmet: TBD,
    // GtmHelmet: TBD,
  },
  Theme: {
    HTMLHelmet: as(
      'font-DMSans',
      vitalColor.TextPrimaryBodyCopy,
      vitalTextDecoration.Normal,
    ),
  }
});

/**
 * WithDesktopStatickBody token applies static position on body.
 */
const WithDesktopStatickBody = asHelmetToken({
  Layout: {
    BodyHelmet: 'lg:static',
  },
});

/**
 * WithFixedBody token applies fixed position on body to prevent scrolling.
 */
const WithFixedBody = asHelmetToken({
  Layout: {
    BodyHelmet: 'fixed',
  },
});

export default {
  Default,
  WithDesktopStatickBody,
  WithFixedBody,
};

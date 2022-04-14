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

import { withNode, withNodeKey } from '@bodiless/core';
import { vitalRichText } from '@bodiless/vital-editors';
import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import { vitalMenu } from '@bodiless/vital-navigation';
import { as } from '@bodiless/fclasses';
import { vitalRewards } from '../Rewards';
import { vitalSocialLinks } from '../SocialLinks';
import { asFooterToken } from '../FooterClean';

const Base = asFooterToken({
  Components: {
    Rewards: vitalRewards.Default,
    FooterMenu: vitalMenu.Footer,
    SocialLinks: vitalSocialLinks.Default,
  },
  Layout: {
    Wrapper: 'w-full',
    Container: 'lg:flex',
    Column: 'w-full lg:first:w-1/4 lg:w-3/4',
    RewardsWrapper: as(
      // This makes RewardsWrapper full screen on mobile. This is necessary
      // because we have to flow specific white background inside a container
      // with margin.
      'max-w-screen w-screen relative inset-x-1/2 mx-negative-half-screen px-site-percent py-9',
      // Reset RewardsWrapper to follow container from tablet on.
      'md:w-full md:static md:inset-x-0 md:mx-0 md:p-0',
    ),
    Row: 'w-full lg:flex lg:space-between',
    FooterMenuWrapper: 'w-full',
    CopyrightWrapper: 'w-full lg:w-3/4',
    SocialLinksWrapper: 'w-full lg:w-1/4',
  },
  Spacing: {
    Wrapper: 'mt-10',
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'lg:pt-16 lg:pb-10',
    ),
    Column: 'md:py-9 lg:py-0 lg:pl-28 lg:first:pl-0 lg:first:pr-20',
    Row: 'md:mb-8 md:last:mb-0 lg:mb-9',
    RewardsWrapper: 'md:mb-0',
    FooterMenuWrapper: 'py-9 md:p-0',
    Copyright: 'py-6 md:mb-4 md:py-6 lg:py-0 lg:mb-0',
    SocialLinksWrapper: 'py-5 md:p-0',
  },
  Theme: {
    RewardsWrapper: 'bg-vital-primary-card-bg md:bg-vital-secondary-footer-bg',
    Copyright: 'border-white-400 border-t border-b md:border-0',
    Wrapper: vitalColor.BgSecondaryFooter,
  },
  Editors: {
    Copyright: vitalRichText.Copyright,
  },
  Schema: {
    FooterMenu: withNodeKey({ nodeKey: 'footer', nodeCollection: 'site' }),
    Copyright: withNodeKey({ nodeKey: 'copyright', nodeCollection: 'site' }),
    _: withNode,
  },
});

const Default = asFooterToken({
  ...Base,
});

export default {
  Base,
  Default,
};

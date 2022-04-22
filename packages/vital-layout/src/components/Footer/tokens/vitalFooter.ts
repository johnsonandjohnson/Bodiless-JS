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
    Container: '2xl:flex',
    Column: 'w-full 2xl:first:w-1/4 2xl:w-3/4',
    RewardsWrapper: as(
      // This makes RewardsWrapper full screen on mobile. This is necessary
      // because we have to flow specific white background inside a container
      // with margin.
      'max-w-screen w-screen relative inset-x-1/2 mx-negative-half-screen px-site-percent py-9',
      // Reset RewardsWrapper to follow container from 2xl device and on.
      '2xl:w-full 2xl:static 2xl:inset-x-0 2xl:mx-0 2xl:p-0',
    ),
    Row: 'w-full xl:flex xl:space-between',
    FooterMenuWrapper: 'w-full',
    CopyrightWrapper: 'w-full 2xl:w-3/4',
    SocialLinksWrapper: 'w-full 2xl:w-1/4',
  },
  Spacing: {
    Wrapper: 'mt-10', // Vertical
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      '2xl:pt-16 2xl:pb-10', // Vertical
    ),
    Column: as(
      'md:last:py-9 2xl:py-9 2xl:first:pr-20',
    ),
    Row: 'md:mb-8 md:last:mb-0 2xl:mb-9', // Vertical
    RewardsWrapper: as(
      'md:mb-0', // Vertical
    ),
    FooterMenuWrapper: 'py-9 md:p-0', // Vertical
    Copyright: 'py-6 md:mb-4 md:py-6 2xl:py-0 2xl:mb-0', // Vertical
    SocialLinksWrapper: 'py-5 md:p-0',
  },
  Theme: {
    RewardsWrapper: 'bg-vital-primary-card-bg 2xl:bg-vital-secondary-footer-bg',
    Copyright: as(
      vitalColor.BorderSecondarySeparator,
      'border-t border-b md:border-0',
    ),
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

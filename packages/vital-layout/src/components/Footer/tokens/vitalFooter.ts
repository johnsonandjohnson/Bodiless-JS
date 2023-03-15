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
import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import { vitalMenu } from '@bodiless/vital-navigation';
import {
  as, Div, on, replaceWith
} from '@bodiless/fclasses';
import { vitalRewards, RewardsClean } from '../Rewards';
import { vitalCopyrightRow } from '../CopyrightRow';
import { asFooterToken, FooterToken } from '../FooterClean';

const Default = asFooterToken({
  Components: {
    FooterMenu: vitalMenu.Footer,
    CopyrightRow: vitalCopyrightRow.Default,
  },
  Layout: {
    Wrapper: 'w-full',
    Container: '2xl:flex',
    MenuRow: 'w-full xl:flex xl:space-between',
    CopyrightRow: 'w-full xl:flex xl:space-between',
    FooterMenuWrapper: 'w-full',
  },
  Spacing: {
    Wrapper: 'mt-10',
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      '2xl:pt-16 2xl:pb-10',
    ),
    MenuRow: 'md:mb-8 2xl:mb-9',
    CopyrightRow: 'md:mb-0',
    Column2Wrapper: 'md:py-9',
    FooterMenuWrapper: 'py-9 md:p-0',
  },
  Theme: {
    Wrapper: vitalColor.BgSecondaryFooter,
  },
  Schema: {
    FooterMenu: withNodeKey({ nodeKey: 'footer-menu', nodeCollection: 'site' }),
    _: withNode,
  },
});

const WithRewardsExpanding2XL = asFooterToken({
  Components: {
    Column1Wrapper: replaceWith(Div),
    RewardsWrapper: replaceWith(Div),
    Rewards: on(RewardsClean)(vitalRewards.Default),
  },
  Layout: {
    Column1Wrapper: 'w-full 2xl:w-1/4',
    Column2Wrapper: 'w-full 2xl:w-3/4',
    RewardsWrapper: as(
      // This makes RewardsWrapper full screen on mobile. This is necessary
      // because we have to flow specific white background inside a container
      // with margin.
      'max-w-screen w-screen relative inset-x-1/2 mx-negative-half-screen px-site-percent py-9',
      // Reset RewardsWrapper to follow container from 2xl device and on.
      '2xl:w-full 2xl:static 2xl:inset-x-0 2xl:mx-0 2xl:p-0',
    ),
  },
  Spacing: {
    Column1Wrapper: '2xl:py-9 2xl:pr-20',
    Column2Wrapper: '2xl:py-9',
    RewardsWrapper: 'md:mb-0',
  },
  Theme: {
    RewardsWrapper: 'bg-vital-primary-card-bg 2xl:bg-vital-secondary-footer-bg',
  },
});

/**
 * Tokens for the vital footer
 *
 * @category Token Collection
 * @see [[FooterClean]]
 */
export interface VitalFooter {
  /**
   * Inherits from Base
   * @example Will remove Menu components
   * ```js
   * import { vitalFooterBase, asFooterToken, } from '@bodiless/vital-layout';
   * import { replaceWith } from '@bodiless/fclasses';
   *
   * const Default = asFooterToken({
   *   ...vitalFooterBase.Default,
   *   Components: {
   *     ...vitalFooterBase.Default.Components,
   *     FooterMenuWrapper: replaceWith(() => null),
   *     FooterMenu: replaceWith(() => null),
   *     MenuRow: replaceWith(() => null),
   *   },
   * }),
   *
   * export default {
   *   ...vitalFooterBase,
   *   Default,
   * };
   * ```
   *
   */
  Default: FooterToken,
  /**
   * An extendable token to move rewards above footer on 2xl responsive viewports
   */
  WithRewardsExpanding2XL: FooterToken,
}

/**
 * Tokens for Vital Footer
 *
 * @category Token Collection
 * @see [[VitalFooter]]
 * @see [[FooterClean]]
 */
const vitalFooter: VitalFooter = {
  Default,
  WithRewardsExpanding2XL,
};

export default vitalFooter;

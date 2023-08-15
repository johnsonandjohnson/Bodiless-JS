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

import { withNodeKey } from '@bodiless/data';
import { useIsBurgerMenuHidden, withBurgerMenuProvider, withBreadcrumbStore } from '@bodiless/vital-navigation';
import {
  addProps,
  as,
  flowIf,
  not,
} from '@bodiless/fclasses';
import { WithStructuredDataProvider } from '@bodiless/schema-org';
import { asLayoutToken } from '../LayoutClean';
import type { LayoutToken } from '../LayoutClean';
import { vitalFooter } from '../../Footer';
import { vitalHeader } from '../../Header';
import { vitalHelmet } from '../../Helmet';
import { LayoutIds } from './constants';
import { StyleGuide } from './StyleGuide';

const Default = asLayoutToken({
  Core: {
    _: as(withBurgerMenuProvider, withBreadcrumbStore),
  },
  Components: {
    Helmet: vitalHelmet.Default,
    Header: vitalHeader.Default,
    Footer: vitalFooter.Default,
  },
  Analytics: {
    Container: addProps({ 'data-layer-region': 'body' }),
  },
  SEO: {
    _: WithStructuredDataProvider,
  },
  Behavior: {
    Container: addProps({ id: LayoutIds.Content }),
    SkipToMainContent: as(
      addProps({
        href: `#${LayoutIds.Content}`,
        children: 'Skip To Main Content',
      }),
      'sr-only focus:not-sr-only',
    ),
  },
  Layout: {
    OuterContainer: 'flex flex-col',
    ContainerWrapper: 'flex-grow',
    Helmet: flowIf(
      not(useIsBurgerMenuHidden),
    )(as(vitalHelmet.WithFixedBody, vitalHelmet.WithDesktopStaticBody)),
  },
  Theme: {
    OuterContainer: 'h-screen',
  },
  Content: {
    Header: addProps({ id: LayoutIds.HeaderContent }),
  },
  Schema: {
    Header: withNodeKey({ nodeKey: 'header', nodeCollection: 'site' }),
    Footer: withNodeKey({ nodeKey: 'footer', nodeCollection: 'site' }),
  }
});

/**
 * Tokens for the vital layout
 *
 * @category Token Collection
 * @see [[LayoutClean]]
 */
export interface VitalLayout {
  /**
   * Inherits from Base & assigns the components vitalHeader.Default & vitalFooter.FootWithRewards
   *
   * @example Override default to use custom Footer.
   * ```js
   * import { asLayoutToken, vitalHeader, vitalLayoutBase } from '@bodiless/vital-layout';
   * import asMyFooter from '../../../components/Footer';
   *
   * const Default = asLayoutToken(vitalLayoutBase.Default, {
   *   Components: {
   *     Header: vitalHeader.Default,
   *     Footer: asMyFooter,
   *   },
   * });
   *
   * export default {
   *   ...vitalLayoutBase,
   *   Default,
   * };
   * ```
   *
   * @example override the Skip To Main content with language specific
   * ```js
   * import { vitalLayoutBase, asLayoutToken } from '@bodiless/vital-layout';
   * import { addProps, as } from '@bodiless/fclasses';
   *
   * const Default = asLayoutToken(vitalLayoutBase.Default, {
   *   Behavior: {
   *     SkipToMainContent: as(
   *       addProps({
   *         children: 'Passer au contenu principal',
   *       }),
   *     ),
   *   },
   * });
   *
   * export default {
   *   ...vitalLayoutBase,
   *   Default,
   * };
   * ```
   *
   */
  Default: LayoutToken,
  /**
   * Special layout to demonstrate components.  Only used for testing purposing.
   */
  StyleGuide: LayoutToken,
}

/**
 * Tokens for Vital Layout
 *
 * @category Token Collection
 * @see [[VitalLayout]]
 * @see [[LayoutClean]]
 */
const vitalLayout: VitalLayout = {
  Default,
  StyleGuide,
};

export default vitalLayout;

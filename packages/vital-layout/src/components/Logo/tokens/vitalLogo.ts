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

import {
  vitalImage
} from '@bodiless/vital-image';
import {
  withNode,
  withNodeKey,
  withSidecarNodes,
} from '@bodiless/data';
import { asBodilessLink } from '@bodiless/components-ui';
import { asLogoToken } from '../LogoClean';
import type { LogoToken } from '../LogoClean';

const Base = asLogoToken({
  Components: {
    Image: vitalImage.Default,
  },
  Behavior: {
    Image: vitalImage.WithEager,
  },
  Schema: {
    Image: withNodeKey({ nodeKey: 'SiteLogo', nodeCollection: 'site' }),
    // @todo should this be a vital-link?
    // @todo can we separate sidecar nodekeys from editors?
    Link: withSidecarNodes(
      asBodilessLink({ nodeKey: 'SiteLink', nodeCollection: 'site' }, { href: '/' }),
    ),
    _: withNode,
  },
});

const Default = asLogoToken(Base, {
  Layout: {
    Wrapper: 'w-full max-w-20 md:max-w-28 lg:min-w-28',
    Image: 'max-h-full',
  },
  Spacing: {
    Wrapper: 'mx-4 lg:ml-0 lg:mr-8',
  },
});

/**
 * Tokens for the vital logo
 *
 * @category Token Collection
 * @see [[HeaderClean]]
 */
export interface VitalLogo {
  /**
   * Default adds vital specific design reqirements.
   * @example Will override the layout domain of logo and apply diffent styling.
   * ```js
   * import { vitalLogoBase, asLogoToken } from '@bodiless/vital-layout';
   *
   * const Default = asLogoToken({
   *   ...vitalLogoBase.Default,
   *   Layout: {
   *      Image: 'h-16 max-w-15',
   *   },
   * }),
   *
   * export default {
   *   ...vitalLogoBase,
   *   Default,
   * };
   * ```
   *
   */
  Default: LogoToken,
}

/**
 * Tokens for Vital Logo
 *
 * @category Token Collection
 * @see [[VitalLogo]]
 * @see [[LogoClean]]
 */
const vitalLogo: VitalLogo = {
  Default,
};

export default vitalLogo;

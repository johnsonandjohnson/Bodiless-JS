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
  Div,
  startWith,
} from '@bodiless/fclasses';
import { asSocialLinksToken } from '../SocialLinksClean';
import type { SocialLinksToken } from '../SocialLinksClean';

const Base = asSocialLinksToken({
  Components: {
    Wrapper: startWith(Div),
  },
  // @TODO: After Social Links implementations, readjust layout.
  Layout: {
    Wrapper: 'w-full flex',
    InnerWrapper: 'w-full inline-flex justify-between mx-4 md:mx-0 xl:w-20 xl:mx-10 xl:mr-16',
  }
});

const Default = asSocialLinksToken({
  ...Base,
});

/**
 * Tokens for the vital Social Links
 *
 * @category Token Collection
 * @see [[SocialLinksClean]]
 */
export interface VitalSocialLinks {
  /**
   * Base applies styling to have social links in a row at specific size
   */
  Base: SocialLinksToken,
  /**
   * Inherits Base
   */
  Default: SocialLinksToken,
}

/**
 * Tokens for Vital Social Links
 *
 * @category Token Collection
 * @see [[VitalSocialLinks]]
 * @see [[SocialLinksClean]]
 */
const vitalSocialLinks: VitalSocialLinks = {
  Base,
  Default,
};

export default vitalSocialLinks;

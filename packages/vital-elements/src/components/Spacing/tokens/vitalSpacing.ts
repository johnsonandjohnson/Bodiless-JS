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

import { asTokenGroup } from '../../../util';
import { SpacingMeta } from '../meta';

/*
 * Tailwind's container is specifically not used due to its feature it set's max-width
 * to min-width of breakpoint. So, instead, rely on ContainerWrapper to margin percent
 * to contain content (WithSiteMargin) until we get to xl and then constrain by
 * max-width (WithSiteXLConstraint).
 */
export default asTokenGroup(SpacingMeta)({
  WithSiteMargin: 'mx-site-percent md:mx-md-site-percent 2xl:px-40',
  WithSiteXLConstraint: '2xl:container 2xl:mx-auto',
  Gutter: 'p-1 md:p-2 lg:p-3',
  GutterOffset: '-mx-1 md:-mx-2 lg:-mx-3',
  GutterTop: 'mt-4',
  GutterBottom: 'mb-4',
  GuttonLeft: 'ml-4',
  GuttonRight: 'mr-4',

  /**
   * Vital 2.0 Spacing below coming from Figma Tokens.
   */

  PaddingXSmall: 'p-8px md:p-16px',
  PaddingSmall: 'p-16px md:p-20px',
  PaddingMedium: 'p-20px md:p-24px',
  PaddingLarge: 'p-24px md:p-36px',
  PaddingXLarge: 'p-36px md:p-48px',
  // @TODO Add Padding Top when needed
  PaddingYXSmall: 'py-8px md:py-16px',
  PaddingBottomXSmall: 'pb-8px md:pb-16px',
  PaddingTopSmall: 'pt-16px md:pt-20px',
  PaddingTopMedium: 'pt-20px md:pt-24px',
  PaddingBottomSmall: 'pb-16px md:pb-20px',
  PaddingBottomMedium: 'pb-20px md:pb-24px',
  PaddingBottomLarge: 'pb-24px md:pb-36px',
  PaddingBottomXLarge: 'pb-36px md:pb-48px',
  MarginXSmall: 'm-8px md:m-16px',
  MarginYXSmall: 'my-8px md:my-16px',
  MarginSmall: 'm-16px md:m-20px',
  MarginMedium: 'm-20px md:m-24px',
  MarginLarge: 'm-24px md:m-36px',
  MarginXLarge: 'm-36px md:m-48px',
  MarginTopXSmall: 'mt-8px md:mt-16px',
  MarginTopSmall: 'mt-16px md:mt-20px',
  MarginTopMedium: 'mt-20px md:mt-24px',
  MarginTopLarge: 'mt-24px md:mt-36px',
  MarginTopXLarge: 'mt-36px md:mt-48px',
  MarginBottomXSmall: 'mb-8px md:mb-16px',
  MarginBottomSmall: 'mb-16px md:mb-20px',
  MarginBottomMedium: 'mb-20px md:mb-24px',
  MarginBottomLarge: 'mb-24px md:mb-36px',
  MarginBottomXLarge: 'mb-36px md:mb-48px',
  MarginLeftXSmall: 'ml-8px md:ml-16px',
  MarginLeftSmall: 'ml-16px md:ml-20px',
  MarginLeftMedium: 'ml-20px md:ml-24px',
  MarginLeftLarge: 'ml-24px md:ml-36px',
  MarginLeftXLarge: 'ml-36px md:ml-48px',
  MarginRightXSmall: 'mr-8px md:mr-16px',
  MarginRightSmall: 'mr-16px md:mr-20px',
  MarginRightMedium: 'mr-20px md:mr-24px',
  MarginRightLarge: 'mr-24px md:mr-36px',
  MarginRightXLarge: 'mr-36px md:mr-48px',
});
